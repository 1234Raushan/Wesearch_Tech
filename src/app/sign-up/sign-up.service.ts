import { Deserialize, Serialize } from 'cerialize';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {  Injectable } from '@angular/core';
import { User } from '../model/User';
import { UtilsService } from '../services/utiles.service';
import { StorageListnerService } from '../services/storage-listner.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class SignUpService{
  signUpForm!: FormGroup;
  userObject !:User;
  Email !: undefined;
  specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  regexForMobile : RegExp = new RegExp(/^[0-9]{0,10}$/g);

  ValidationNumbers(event:any) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !==-1) {
      return;
    }
    let current: string = event.target.value;
    const position = current.length > 1 ? current.length - 1 : 0;

    const next: string = [
      current.slice(0, position),
      event.key,
      current.slice(position)
    ].join('');


    if (next && !String(next).match(this.regexForMobile)) {
      event.preventDefault();
    }
  }

  constructor(public utilsService: UtilsService, public formBuilder: FormBuilder,public datePipe: DatePipe,public storageService: StorageListnerService) {
    this.userObject = new User();
  }

  applyValidation(): void {
    this.signUpForm = this.formBuilder.group({
      EmailID: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      UserName:[null, [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      MobileNo:['', [Validators.required, Validators.compose([Validators.pattern(this.utilsService.validationService.PATTERN_FOR_PHONE_NO)])]],
      ProfileName: [null, [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
    });
  }

  SignUpAPI() {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    this.userObject.CreationDate = currentDate;
    this.userObject.ModificationDate = currentDate;
    this.userObject.ModifyByID= 1;
    this.userObject.CreatedByID=1;
    if(!this.utilsService.isNullUndefinedOrBlank(this.userObject.UserName)){
      this.userObject.UserName = this.userObject.UserName.trim();
    }
    if(!this.utilsService.isNullUndefinedOrBlank(this.userObject.ProfileName)){
      this.userObject.ProfileName = this.userObject.ProfileName.trim();
    }
    if(!this.utilsService.isNullUndefinedOrBlank(this.userObject.EmailID)){
      this.userObject.EmailID = this.userObject.EmailID.trim();
    }
    if (this.signUpForm.valid) {

      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.PostSignUpAPI, Serialize(this.userObject,User), (response, isResponseOnPage) => {
        this.signUpForm.reset();
        if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
           this.utilsService.redirectTo('/login');
        }
      this.userObject = new User();
      });

      this.signUpForm.reset();
    }
  }
}
