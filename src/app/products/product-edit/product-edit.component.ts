// product-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service'; // Adjust the path as per your directory structure
import { Product } from '../../models/product'; // Adjust the path as per your directory structure

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  editForm!: FormGroup;
  selectedFile: File | null = null;
  productId!: number; // To store the product's ID

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute // To read the route parameters
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id']; // Assuming your route is something like '/products/edit/:id'

    this.editForm = this.fb.group({
      Name: ['', Validators.required],
      Category: ['', Validators.required],
      ProductCode: ['', [Validators.required]],
      Price: [null, [Validators.required, Validators.min(0)]],
      MinimumQuantity: [1, [Validators.required, Validators.min(1)]],
      DiscountRate: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    this.populateForm(this.productId);
  }
  populateForm(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.editForm.patchValue({
          Name: product.name,
          Category: product.category,
          ProductCode: product.productCode,
          Price: product.price,
          MinimumQuantity: product.minimumQuantity,
          DiscountRate: product.discountRate,
          // Populate other form controls as necessary
        });
        // Handle the image or other file inputs as needed
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.item(0) || null;
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('Product.Id', this.productId.toString());
      formData.append('Product.Name', this.editForm.value.Name);
      formData.append('Product.Category', this.editForm.value.Category);
      formData.append('Product.ProductCode', this.editForm.value.ProductCode);
      formData.append('Product.Price', this.editForm.value.Price);
      formData.append(
        'Product.MinimumQuantity',
        this.editForm.value.MinimumQuantity
      );
      formData.append('Product.DiscountRate', this.editForm.value.DiscountRate);

      if (this.selectedFile) {
        formData.append('Image', this.selectedFile, this.selectedFile.name);
      }

      // Since it's an edit, we use the updateProductWithImage method (to be implemented in your service)
      this.productService
        .updateProductWithImage(this.productId, formData)
        .subscribe({
          next: () => this.router.navigate(['/products']),
          error: (err) => console.error('Failed to update product:', err),
        });
    } else {
      console.error('Form is not valid', this.editForm.errors);
      // Optionally trigger UI feedback for validation errors
    }
  }
}
