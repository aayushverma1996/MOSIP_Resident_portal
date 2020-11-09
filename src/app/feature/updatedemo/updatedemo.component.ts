import { Component, OnInit } from '@angular/core';
import { copyStyles } from '@angular/animations/browser/src/util';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import LanguageFactory from 'src/assets/i18n';
import { DialougComponent } from 'src/app/shared/dialoug/dialoug.component';

@Component({
  selector: 'app-updatedemo',
  templateUrl: './updatedemo.component.html',
  styleUrls: ['./updatedemo.component.css']
})
export class UpdatedemoComponent implements OnInit {

  house='';
  street='';
  area='';
  landmark='';
  pincode='';
  village='';
  postOffice='';
  district='';
  state='';
  upload:File;
  fileToUpload:File=null;
  fileByteArray:any;
  dialog: any;
  constructor(private dataService:DataStorageService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.getBase64(files[0]).then(data => {
      this.fileByteArray = data;
    });
}
  submit()
  {
    console.log(this.fileByteArray);
    console.log(this.fileToUpload);
    // console.log(this.house);
    // console.log(this.street);
    // console.log(this.area);
    // console.log(this.landmark);
    // console.log(this.pincode);
    // console.log(this.village);
    // console.log(this.postOffice);
    // console.log(this.district);
    // console.log(this.state);

    this.dataService.updateDemographic(this.fileByteArray,this.fileToUpload).subscribe(response=>{
      
      console.log("inUpdateDemo" + !response['errors'])
      //if (response['errors'] == NULL_EXPR) {
        //console.log("in if")
        this.showResponseMessageDialog(response['response']['registrationId']);
        //this.router.navigate([".."]);
      //} else {
        //this.showSendOTP = true;
        //this.showResend = false;
        //this.showOTP = false;
        //this.showVerify = false;
        //this.showUinDetail = true;
        //this.inputUinDetails = "";
        // document.getElementById('timer').style.visibility = 'hidden';
        // document.getElementById('minutesSpan').innerText = this.minutes;
        //clearInterval(this.timer);
        //this.showErrorMessage();
        //this.router.navigate([".."]);
     // } 
    })
;
  }
  showResponseMessageDialog(registrationId:string) {
    let factory = new LanguageFactory(localStorage.getItem('langCode'));
    let response = factory.getCurrentlanguage();
    //let successMessage = response["generateVid"][ "generate-vid_message"];
     const message = {
      case: 'MESSAGE',
      message: "VID is "+registrationId
    };
    this.dialog.open(DialougComponent, {
      width: '350px',
      data: message
    });
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
