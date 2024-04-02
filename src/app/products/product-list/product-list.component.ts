import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error(err),
    });
  }

  getImageUrl(imagePath: string): string {
    // Assuming the backend serves images from a route like '/Products/Images/'
    console.log(encodeURIComponent(imagePath));
    return `http://localhost:5234/Products/Images/${encodeURIComponent(imagePath)}`;
  }
}
