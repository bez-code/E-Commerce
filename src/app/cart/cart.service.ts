import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getCart(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}` + "/cart")
  }

  addCart(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}` + "/cart", product)
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}` + "/cart")
  }
  checkout(product: Product[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/checkout`, product)
  }
}