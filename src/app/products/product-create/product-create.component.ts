// product-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service'; // Adjust the path as per your directory structure

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  createForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
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
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.item(0) || null;
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = new FormData();
      // const Product = {
      //   Name: this.createForm.get('Name')?.value,
      //   Category: this.createForm.get('Category')?.value,
      //   ProductCode: this.createForm.get('ProductCode')?.value,
      //   Price: this.createForm.get('Price')?.value,
      //   MinimumQuantity: this.createForm.get('MinimumQuantity')?.value,
      //   DiscountRate: this.createForm.get('DiscountRate')?.value,
      // };
      formData.append('Product.Id', ''); // Send empty value for Product.Id
      formData.append('Product.ImagePath', ''); // Send empty value for Product.ImagePath

      formData.append('Product.Name', this.createForm.get('Name')?.value);
      formData.append(
        'Product.Category',
        this.createForm.get('Category')?.value
      );
      formData.append(
        'Product.ProductCode',
        this.createForm.get('ProductCode')?.value
      );
      formData.append('Product.Price', this.createForm.get('Price')?.value);
      formData.append(
        'Product.MinimumQuantity',
        this.createForm.get('MinimumQuantity')?.value
      );
      formData.append(
        'Product.DiscountRate',
        this.createForm.get('DiscountRate')?.value
      );
      //formData.append('Product', JSON.stringify(Product));

      if (this.selectedFile) {
        formData.append('Image', this.selectedFile, this.selectedFile.name);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      this.productService.createProductWithImage(formData).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Failed to create product:', err),
      });
    } else {
      console.error('Form is not valid');
      // Optionally trigger UI feedback for validation errors
    }
  }
}
