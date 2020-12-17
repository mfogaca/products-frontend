import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Login } from '../models/login';
import { LoginResult } from '../models/loginResult';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://localhost:44315/api/Products";
const loginUrl = "https://dev.sitemercado.com.br/api/login";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  login (loginInfo): Observable<LoginResult> {
    var b64Authentication = btoa(loginInfo.username + ":" + loginInfo.password);
    console.log("b64auth : " + b64Authentication);
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'Basic ' + b64Authentication);
    return this.http.post<LoginResult>(loginUrl, '', httpOptions).pipe(
      tap(loginRet => console.log('login called')),
      catchError(this.handleError<LoginResult>('addProduct'))
    );
  }

  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  
  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }
  
  addProduct (product): Observable<Product> {
    console.log("Writing : " + JSON.stringify(product));
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  
  updateProduct (id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  deleteProduct (id): Observable<Product> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {      
      
      console.error('Error on submit request : ' + JSON.stringify(error));
  
      return of(result as T);
    };
  }  
}
