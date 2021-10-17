

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Lugar } from "../../Models-typescript/Lugar";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-lugar",
  templateUrl: "lugar.component.html"
})
export class LugarComponent {

  Skjema: FormGroup;

  public lugarer: Array<Lugar>;
  public laster: string;

  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      lugarId: [""],
      bildeURL: ["", Validators.required],
      beskrivelse: ["", Validators.required],
      antall: ["", Validators.required],
      lugarType: ["", Validators.required],
      tittel: ["", Validators.required],
      romNr: ["", Validators.required],
      pris: ["", Validators.required],
      harWc: ["", Validators.required],
      harDysj: ["", Validators.required],
      harWifi: ["", Validators.required]
    });
  }

  lagreLugar() {

    const lugar = new Lugar();
    lugar.bildeURL = this.Skjema.value.bildeURL;
    lugar.beskrivelse = this.Skjema.value.beskrivelse;
    lugar.antall = this.Skjema.value.antall;
    lugar.lugarType = this.Skjema.value.lugarType;
    lugar.tittel = this.Skjema.value.tittel;
    lugar.romNr = this.Skjema.value.romNr;
    lugar.pris = this.Skjema.value.pris;
    lugar.harWc = this.Skjema.value.harWc;
    lugar.harDysj = this.Skjema.value.harDysj;
    lugar.harWifi = this.Skjema.value.harWifi;

    this._http.post("admin/lagreLugar", lugar).subscribe((res) => {
      this.hentAlleLugarer();
    });
  }

  endreLugar() {

    const lugar = new Lugar();
    lugar.lugarId = this.Skjema.value.lugarId;
    lugar.bildeURL = this.Skjema.value.bildeURL;
    lugar.beskrivelse = this.Skjema.value.beskrivelse;
    lugar.antall = this.Skjema.value.antall;
    lugar.lugarType = this.Skjema.value.lugarType;
    lugar.tittel = this.Skjema.value.tittel;
    lugar.romNr = this.Skjema.value.romNr;
    lugar.pris = this.Skjema.value.pris;
    lugar.harWc = this.Skjema.value.harWc;
    lugar.harDysj = this.Skjema.value.harDysj;
    lugar.harWifi = this.Skjema.value.harWifi;

    this._http.post("admin/endreLugar", lugar).subscribe((res) => {
      this.hentAlleLugarer();
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
          this._http.post("admin/slettLugar", this.lugarer[toSend].lugarId).subscribe((res) => {
            this.hentAlleLugarer();
          });
        }
        else if (infoTitle == "lagre") {
          this.lagreLugar();
        }
        else if (infoTitle == "endre") {
          this.endreLugar();
        }
      }
      else {

      }
    });
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      lugarId: this.lugarer[index].lugarId,
      bildeURL: this.lugarer[index].bildeURL,
      beskrivelse: this.lugarer[index].beskrivelse,
      antall: this.lugarer[index].antall,
      lugarType: this.lugarer[index].lugarType,
      tittel: this.lugarer[index].tittel,
      romNr: this.lugarer[index].romNr,
      pris: this.lugarer[index].pris,
      harWc: this.lugarer[index].harWc,
      harDysj: this.lugarer[index].harDysj,
      harWifi: this.lugarer[index].harWifi
    });

  }
  ngOnInit() {
    this.hentAlleLugarer();
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

  hentAlleLugarer() {
    this.laster = "Laster inn...";
    this._http.get<Lugar[]>("admin/hentLugarer").subscribe((res) => {
      this.lugarer = res;
      this.laster = "";
    }, err => { }, () => { });
  }


  
}

