import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadProducts(); // Refactor the initial data load into its method

    // Subscribe to deletion events
    this.productService.productDeletion$.subscribe({
      next: (productId) => {
        if (productId !== null) {
          this.loadProducts(); // Reload the products list if a product has been deleted
        }
      },
      error: (err) => console.error(err),
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error(err),
    });
  }

  getImageUrl(imagePath: string): string {
    return `http://localhost:5234/Products/Images/${encodeURIComponent(
      imagePath
    )}`;
  }
  hasToken(): boolean {
    return this.authService.hasToken();
  }
}
