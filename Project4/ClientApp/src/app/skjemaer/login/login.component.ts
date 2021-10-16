import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Betaling } from "../../Models-typescript/Betaling";
import { Bruker } from "../../Models-typescript/Bruker";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-login",
  templateUrl: "login.component.html"
})
export class LoginComponent {

  Skjema: FormGroup;


  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      brukernavn: ["", Validators.required],
      passord: ["", Validators.required],


    });
  }
  visModal() {
    const modalRef = this.modalService.open(Modal, {
      backdrop: 'static',


      keyboard: false

    });

    modalRef.componentInstance.navn = "";

    modalRef.result.then(retur => {

    });
  }
  login() {

    const bruker = new Bruker();
    bruker.brukernavn = this.Skjema.value.brukernavn;
    bruker.passord = this.Skjema.value.passord;


    this._http.post("admin/loggInn", bruker).subscribe((res) => {

    });
  }
 
}
