import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../../services/utiles.service';
import { NewStageService } from './new-stage.service';

@Component({
  selector: 'app-new-stage',
  templateUrl: './new-stage.component.html',
  styleUrls: ['./new-stage.component.css']
})
export class NewStageComponent extends NewStageService implements OnInit {

  constructor(public utilsService:UtilsService,public fb:FormBuilder,public datePipe:DatePipe) { super(utilsService,fb,datePipe)}
  ngOnInit(): void {
  }

}
