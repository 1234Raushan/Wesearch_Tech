import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StorageListnerService } from '../services/storage-listner.service';
import { UtilsService } from '../services/utiles.service';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-login',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends SignUpService implements OnInit{
  constructor(public utilsService: UtilsService,
    public formBuilder: FormBuilder,
    public datepipe:DatePipe,
    public storageService: StorageListnerService
     ){
    super(utilsService,formBuilder,datepipe,storageService);
  }

  ngOnInit(): void {
    this.applyValidation();
  }
}
