import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StorageListnerService } from '../services/storage-listner.service';
import { UtilsService } from '../services/utiles.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends LoginService implements OnInit {
  constructor(public utilsService: UtilsService, public storageService: StorageListnerService, public _formBuilder: FormBuilder){
    super(utilsService,storageService,_formBuilder);
  }

  ngOnInit(): void {
    this.applyValidation();
  }

}
