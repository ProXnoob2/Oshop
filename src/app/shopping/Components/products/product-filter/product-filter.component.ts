import { Component, Input } from '@angular/core';
import { CategoryService } from 'shared/Services/category/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  categories$!: any;

  @Input('category') category!: any;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }
}
