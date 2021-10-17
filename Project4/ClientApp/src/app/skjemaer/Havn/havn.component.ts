import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Havn } from "../../Models-typescript/Havn";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-havn",
  templateUrl: "havn.component.html"
})
export class HavnComponent {

  Skjema: FormGroup;
  public havner: Array<Havn>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      havnId: [""],
      navn: ["", Validators.required]


    });
  }

  multipleSubmit(state: string, toSend) {

    if (state.localeCompare("endre") == 0) {
      if (this.Skjema.valid) {
        this.visModal("Ja", "Nei", "endre", "Vil du endre?", null);
      }
    }
    else if (state.localeCompare("lagre") == 0) {
      if (this.Skjema.valid) {
        this.visModal("Ja", "Nei", "lagre", "Vil du lagre?", null);
      }
    }
    else if (state.localeCompare("slett") == 0) {
      this.visModal("Ja", "Nei", "slett", "Vil du slette?", toSend);
    }


  }
  lagreHavn() {

    const havn = new Havn();
    havn.havnId = 1;
    havn.navn = this.Skjema.value.navn;


    this._http.post("admin/lagreHavn", havn).subscribe((res) => {
      this.hentAlleHavner();
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
          this._http.post("admin/slettHavn", this.havner[toSend].havnId).subscribe((res) => {
            this.hentAlleHavner();
          });
        }
        else if (infoTitle == "lagre") {
          this.lagreHavn();
        }
        else if (infoTitle == "endre") {
          this.endreHavn();
        }
      }
      else {

      }
    });
  }

  reset() {

    this.Skjema.reset();
  }
  endreHavn() {

    const havn = new Havn();
    havn.havnId = this.Skjema.value.havnId;
    havn.navn = this.Skjema.value.navn;


    this._http.post("admin/endreHavn", havn).subscribe((res) => {
      this.hentAlleHavner();
    });
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      havnId: this.havner[index].havnId,
      navn: this.havner[index].navn,

    });


  }

  slett(index) {
    this.visModal("Ja", "Nei", "slett", "Vil du slette?",index);

  }

  ngOnInit() {
    this.hentAlleHavner();
  }
  hentAlleHavner() {
    this.laster = "Laster inn...";
    this._http.get<Havn[]>("admin/hentHavner").subscribe((res) => {
      this.havner = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}
