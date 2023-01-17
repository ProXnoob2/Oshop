import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CategoryService } from 'src/app/Services/category/category.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categories$!: any;
  product: any = {};
  id!: string | number | null | any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
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
    if (!confirm('Are you sure you want to delete this product?')) return;
    else {
      this.productService.remove(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
