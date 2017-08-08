import { Component } from '@angular/core';
import { FormsModule }  from '@angular/forms'; // <-- NgModel lives here

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataExchange } from '../../services/dataExchange.service';
import { Http } from "@angular/http";

@Component({
  selector: 'app-modal',
  templateUrl: 'app/components/main/modal/modal.html',
  styleUrls: ['./modal.css'],
  providers: [DataExchange]
})
export class NgbdModalBasic {

  disableSubmit = true;
  formdata = {
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    errand: ''
  };
  title = 'Kontakta oss';
  body = 'Vill du komma i kontakt med någon av våra mäklare, eller har du en annan fråga? Fyll i ditt ärende i kontaktformuläret så hör vi av oss till dig. Du kan även ringa oss på 08-55551300 mellan kl 8-20 alla dagar i veckan.';
  send = 'Skicka';
  cancel = 'Avbryt';
  closeResult: string;
  globalMem: any;
  content: any;
  sent: any;

  constructor(
    private modalService: NgbModal,
    private memService: DataExchange,
    private http: Http
  ) {
    this.globalMem = this.memService.global();
    this.globalMem.openModal = ()=>{
      this.open();
    }
  }

  open() {
    console.log("clicked");
    this.resetFormData();
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    },()=>{});
  }

  registerContent(content: any){
    this.content = content;
  }

  sendContactInfo(){

      // Send
      let _observable = this.http.post("/register-contact-info", this.formdata);
      _observable.subscribe();

  }

  resetFormData(){
    for(let key in this.formdata){
      this.formdata[key] = '';
    }
  }

  checkFields(){
    let everyThingFilledIn = true;
    for(let key in this.formdata){
      if(key == "phonenumber"){continue;}
      everyThingFilledIn = everyThingFilledIn && this.formdata[key] !== '';
    }
    this.disableSubmit = !everyThingFilledIn;
  }

}
