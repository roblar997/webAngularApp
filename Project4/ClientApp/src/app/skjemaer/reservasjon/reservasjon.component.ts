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

  slett(index) {

      const reservasjon = new Reservasjon();
    reservasjon.billettId = this.reservasjoner[index].billettId,
      reservasjon.lugarId = this.reservasjoner[index].lugarId,
      reservasjon.ruteId = this.reservasjoner[index].ruteId,
      reservasjon.avgangsDato = this.reservasjoner[index].avgangsDato,
      reservasjon.avgangsTid = this.reservasjoner[index].avgangsTid,
  

        this._http.post("admin/slettReservasjon", reservasjon).subscribe((res) => {
          this.hentAlleReservasjoner();
      });
  }
  multipleSubmit(state: string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreReservasjon();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreReservasjon();
      }
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
  visModal() {
    const modalRef = this.modalService.open(Modal, {
      backdrop: 'static',


      keyboard: false

    });

    modalRef.componentInstance.navn = "";

    modalRef.result.then(retur => {

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

