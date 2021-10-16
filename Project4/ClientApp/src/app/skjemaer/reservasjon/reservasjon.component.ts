import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Reservasjon } from "../../Models-typescript/Reservasjon";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-reservasjon",
  templateUrl: "reservasjon.component.html"
})
export class ReservasjonComponent {

  Skjema: FormGroup;
  public reservasjoner: Array<Reservasjon>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      billettId: ["", Validators.required],
      lugarId: ["", Validators.required],
      ruteId: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required]
    });
  }

  lagreReservasjon() {

    const reservasjon = new Reservasjon();
    reservasjon.billettId = this.Skjema.value.billettId;
    reservasjon.lugarId = this.Skjema.value.lugarId;
    reservasjon.ruteId = this.Skjema.value.ruteId;
    reservasjon.avgangsDato = this.Skjema.value.avgangsDato;
    reservasjon.avgangsTid = this.Skjema.value.avgangsTid;


    this._http.post("admin/lagreReservasjon", reservasjon).subscribe((res) => {
      this.hentAlleReservasjoner();
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

  endreReservasjon() {

    const reservasjon = new Reservasjon();
    reservasjon.billettId = this.Skjema.value.billettId;
    reservasjon.lugarId = this.Skjema.value.lugarId;
    reservasjon.ruteId = this.Skjema.value.ruteId;
    reservasjon.avgangsDato = this.Skjema.value.avgangsDato;
    reservasjon.avgangsTid = this.Skjema.value.avgangsTid;


    this._http.post("admin/endreReservasjon", reservasjon).subscribe((res) => {
      this.hentAlleReservasjoner();
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
          const reservasjon = new Reservasjon();
          reservasjon.billettId = this.reservasjoner[toSend].billettId,
            reservasjon.lugarId = this.reservasjoner[toSend].lugarId,
            reservasjon.ruteId = this.reservasjoner[toSend].ruteId,
            reservasjon.avgangsDato = this.reservasjoner[toSend].avgangsDato,
            reservasjon.avgangsTid = this.reservasjoner[toSend].avgangsTid,


            this._http.post("admin/slettReservasjon", reservasjon).subscribe((res) => {
              this.hentAlleReservasjoner();
            });
        }
        else if (infoTitle == "lagre") {
          this.lagreReservasjon();
        }
        else if (infoTitle == "endre") {
          this.endreReservasjon();
        }
      }
      else {

      }
    });
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      billettId: this.reservasjoner[index].billettId,
      lugarId:   this.reservasjoner[index].lugarId,
      ruteId: this.reservasjoner[index].ruteId,
      avgangsDato: this.reservasjoner[index].avgangsDato,
      avgangsTid: this.reservasjoner[index].avgangsTid,
    });
  }
  ngOnInit() {
    this.hentAlleReservasjoner();
  }
  hentAlleReservasjoner() {
    this.laster = "Laster inn...";
    this._http.get<Reservasjon[]>("admin/hentReservasjoner").subscribe((res) => {
      this.reservasjoner = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

