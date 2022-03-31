import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if ($(window).width() < 767) {
      $('body').addClass('mini-sidebar');
      $(".collapse li a").click(function(){
          $('body').addClass('mini-sidebar');
      });
      }
  }

}
