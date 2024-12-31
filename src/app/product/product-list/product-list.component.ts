import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortBy: string = ''
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    this.productService.getProducts().subscribe(products => {
      this.products = products,
        this.filteredProducts = products;
    })
  }


  addToCard(product: Product): void {
    this.cartService.addCart(product).subscribe();
    this.openSnackBar(`${product.name} added to cart!`, 'Close');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  applyFilter(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;

    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
    this.sortProducts(this.sortBy)
  }

  sortProducts(sortValue: string): void {
    let sortBy = sortValue

    if (sortBy === 'name') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'priceHighLow') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceLowHigh') {
      this.filteredProducts.sort((a, b) => b.price - a.price);

    }
  }


}