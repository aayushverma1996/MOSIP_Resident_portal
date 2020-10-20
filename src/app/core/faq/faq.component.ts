import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import LanguageFactory from 'src/assets/i18n';
import { Router } from "@angular/router";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  langCode = '';
  data = [];
  answerTranslation = '';
  showSpinner= true;

  constructor(private dataStorageService: DataStorageService, private router:Router) {}

  ngOnInit() {
    this.langCode = localStorage.getItem('langCode');
    let factory = new LanguageFactory(this.langCode);
    let response = factory.getCurrentlanguage();
    this.data = response['faq']['questions'];
    this.answerTranslation = response['faq']['answer'];
    this.showSpinner=false;
    
  }
}
