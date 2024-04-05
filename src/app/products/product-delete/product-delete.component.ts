import { Component, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent {
  @Input() productId!: number;
  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  constructor(private productService: ProductService, private router: Router) {}

  deleteProduct(): void {
    console.log('Deleting product:', this.productId);
    this.productService.deleteProduct(this.productId).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.productService.notifyProductDeletion(this.productId); // Notify of deletion
        this.router.navigate(['/products/']); // Navigate back to list
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      },
    });
  }
  onModalConfirm(confirmation: boolean): void {
    console.log('Confirmation:', confirmation);
    if (confirmation) {
      this.deleteProduct();
    }
  }
}
