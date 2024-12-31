import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  cartItem: Product[] = [];
  totalPrice: number = 0

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.getCart().subscribe((products: Product[]) => {
      this.cartItem = products;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItem.reduce((sum, product) => sum + (product.price || 0), 0);
    console.log(this.totalPrice);

  }

  clearCart(): void {
    this.cartService.clearCart().subscribe()
  }

  checkoutCart():void {
    this.cartService.checkout(this.cartItem).subscribe(),
    console.log("worked");
    
  }
}
