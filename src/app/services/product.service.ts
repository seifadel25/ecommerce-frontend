// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5234/Products'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // createProductWithImage(product: Product, image: File): Observable<Product> {
  //   const formData: FormData = new FormData();
  //   formData.append(
  //     'product',
  //     new Blob([JSON.stringify(product)], {
  //       type: 'application/json',
  //     })
  //   );
  //   formData.append('image', image, image.name);
  //   return this.http.post<Product>('/api/products/with-image', formData);
  //   {
  //   }
  // }

  createProductWithImage(formData: FormData): Observable<any> {
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    return this.http.post(this.apiUrl, formData);
  }
  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
