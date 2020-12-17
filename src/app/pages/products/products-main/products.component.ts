import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../models/product';
import { Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Price'];
  data: Product[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getProducts()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  logout() {
    localStorage.removeItem("loggedUser");
    this.router.navigate(['/login']);
  }

}
