import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data
        .sort((a, b) => b.price - a.price) // Sort products by price from high to low
        .slice(0, 8); // Then limit to the first 8 products
    });
  }
  getImageUrl(imagePath: string): string {
    return `http://localhost:5234/Products/Images/${encodeURIComponent(
      imagePath
    )}`;
  }
}
