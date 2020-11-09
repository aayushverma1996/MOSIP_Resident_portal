import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  @Input("text") resultText: string;
  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.resultText)
  }

  
  toHome() {
     this.router.navigate(["/"])
  }

}
