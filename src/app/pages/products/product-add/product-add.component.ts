import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  name: string = '';
  price: number = null;
  image: string = '';
  isLoadingResults = false;
  showError: boolean = false;
  imageSrc: string = '';
  imageFile: FormControl;
  public files;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { 
    this.imageFile = new FormControl(this.files);
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'price' : [null, Validators.required],
      'image' : [null]
    });

    this.imageFile.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        console.log("um");
        this.files = [files];
        const reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = () => {
          console.log('file b642' + reader.result);
          this.productForm.controls.image.setValue(reader.result);
        }
      } else {
        console.log("dois...");
        this.files = files;
      }
    })
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addProduct(form)
      .subscribe(res => {
        this.isLoadingResults = false;
        console.log("Res : " + JSON.stringify(res));
        if (res) {
          console.log('Res : ' + JSON.stringify(res));
          let id = res['id'];
          this.router.navigate(['/product-details', id]);
        } else {
          this.showError = true;
          console.log("An error occurred, please retry...");
        }
      }, (err) => {
        console.log('error: ' + err);
        this.isLoadingResults = false;
      });
  }

}
