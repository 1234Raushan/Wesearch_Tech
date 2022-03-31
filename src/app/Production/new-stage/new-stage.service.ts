import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../../services/utiles.service';

@Injectable({
  providedIn: 'root'
})
export class NewStageService {

  constructor(public utilsService: UtilsService,public fb: FormBuilder,public datePipe: DatePipe) { }

  addNewStage(){

  }









}
