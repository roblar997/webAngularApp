import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Betaling } from "../../Models-typescript/Betaling";
import { Bruker } from "../../Models-typescript/Bruker";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
import { Router } from "@angular/router";
@Component({
  selector: "app-skjemaer-login",
  templateUrl: "login.component.html"
})
export class LoginComponent {

  Skjema: FormGroup;


  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal, private router: Router) {
    this.Skjema = fb.group({
      brukernavn: ["", Validators.required],
      passord: ["", Validators.required],


    });
  }
  visModal(knapp1Tekst: string, knapp2Tekst: string, infoTitle: string, infoBody: string, toSend) {
    const modalRef = this.modalService.open(Modal, {
      backdrop: 'static',
      keyboard: false

    });


    modalRef.componentInstance.knapp1 = knapp1Tekst;
    modalRef.componentInstance.knapp2 = knapp2Tekst
    modalRef.componentInstance.infoTitle = infoTitle;
    modalRef.componentInstance.infoBody = infoBody;

    modalRef.result.then(retur => {
      if (retur == 'ja') {
        if (infoTitle == "slett") {

        }
        else if (infoTitle == "lagre") {

        }
        else if (infoTitle == "endre") {

        }
      }
      else {

      }
    });
  }
  reset() {

    this.Skjema.reset();
  }

  login() {

    const bruker = new Bruker();
    bruker.brukernavn = this.Skjema.value.brukernavn;
    bruker.passord = this.Skjema.value.passord;


    this._http.post("admin/loggInn", bruker).subscribe((res) => {
      if (res == true) {
        window.location.reload();

      }
    });
  }
 
}
