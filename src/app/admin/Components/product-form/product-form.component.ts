import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ConfirmationDialogComponent } from 'shared/Components/confirmation-dialog/confirmation-dialog.component';
import { CategoryService } from 'shared/Services/category/category.service';
import { ProductService } from 'shared/Services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnDestroy{
  categories$!: any;
  product: any = {};
  id!: string | number | null | any;
  private dialog$: Subscription = new Subscription;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe({
          next: (p) => {
            this.product = p;
          },
        });
  }

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  remove() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        action: "Remove This Product"
      },
    });

    this.dialog$ = dialogRef.afterClosed().subscribe((res: boolean) => {
      if(res){
        this.productService.remove(this.id).then(() => {
          this.router.navigate(['/admin/products']);
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dialog$.unsubscribe();
  }
}
