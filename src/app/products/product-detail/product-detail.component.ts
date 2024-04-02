import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    let productId: number | null = null; // Declare productId here
    // Get the product ID from the route parameters
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      productId = +idParam;
    } else {
      console.error('Product ID is missing from the route');
    }
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (product) => (this.product = product),
        error: (err) => console.error(err),
      });
    }
  }
}
