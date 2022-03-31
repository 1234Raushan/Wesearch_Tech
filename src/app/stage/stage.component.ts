import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../services/utiles.service';
import { StageService } from './stage.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent extends StageService implements OnInit {

  constructor(public utilsService:UtilsService,public fb:FormBuilder,public datePipe:DatePipe) { super(utilsService,fb,datePipe)}
/*
The constructor of the StageComponent class initializes its own members as well as the parent class's properties(StageService)
 by using a special keyword 'super.' The super keyword is used to call the parent constructor and its values.
*/
  ngOnInit(): void {
  }

}
