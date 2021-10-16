import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Betaling } from "../../Models-typescript/Betaling";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-betaling",
  templateUrl: "betaling.component.html"
})
export class BetalingComponent {

  Skjema: FormGroup;
  public betalinger: Array<Betaling>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      betalingsId: ["", Validators.required],
      kortnummer: ["", Validators.required],
      utloper: ["", Validators.required],
      postnr: ["", Validators.required],
      poststed: ["", Validators.required],
      telefon: ["", Validators.required],
      adresse: ["", Validators.required],
      email: ["", Validators.required],
      csv: ["", Validators.required],
      pris: ["", Validators.required]

    });
  }
  visModal() {
    const modalRef = this.modalService.open(Modal, {
      backdrop: 'static',


      keyboard: false

    });


    modalRef.componentInstance.knapp1 = "";
    modalRef.componentInstance.knapp2 = "";
    modalRef.componentInstance.infoTitle = "";
    modalRef.componentInstance.infoBody = "";

    modalRef.result.then(retur => {

    });
  }
  multipleSubmit(state: string) {
    this.visModal();
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreBetaling();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreBetaling();
      }
    }

  }
  visEndre(index: number) {
    this.Skjema.setValue({
      betalingsId: this.betalinger[index].betalingsId,
      kortnummer: this.betalinger[index].kortnummer,
      utloper: this.betalinger[index].utloper,
      postnr: this.betalinger[index].postnr,
      poststed: this.betalinger[index].poststed,
      telefon: this.betalinger[index].telefon,
      adresse: this.betalinger[index].adresse,
      email: this.betalinger[index].email,
      csv: this.betalinger[index].csv,
      pris: this.betalinger[index].pris,

    });

  }
  ngOnInit() {
    this.hentAlleBetalinger();
  }
  lagreBetaling() {
    const betaling = new Betaling();
    betaling.betalingsId = this.Skjema.value.betalingsId;
    betaling.kortnummer = this.Skjema.value.kortnummer;
    betaling.utloper = this.Skjema.value.utloper;
    betaling.postnr = this.Skjema.value.postnr;
    betaling.poststed = this.Skjema.value.poststed;
    betaling.telefon = this.Skjema.value.telefon;
    betaling.adresse = this.Skjema.value.adresse;
    betaling.email = this.Skjema.value.email;
    betaling.csv = this.Skjema.value.csv;
    betaling.pris = this.Skjema.value.pris;

    this._http.post("admin/lagreBetaling", betaling).subscribe((res) => {
      this.hentAlleBetalinger();
    });

  }

  slett(index) {
    this._http.post("admin/slettBetaling", this.betalinger[index].betalingsId).subscribe((res) => {
      this.hentAlleBetalinger();
    });
  }

  endreBetaling() {
    const betaling = new Betaling();
    betaling.betalingsId = this.Skjema.value.betalingsId;
    betaling.kortnummer = this.Skjema.value.kortnummer;
    betaling.utloper = this.Skjema.value.utloper;
    betaling.postnr = this.Skjema.value.postnr;
    betaling.poststed = this.Skjema.value.poststed;
    betaling.telefon = this.Skjema.value.telefon;
    betaling.adresse = this.Skjema.value.adresse;
    betaling.email = this.Skjema.value.email;
    betaling.csv = this.Skjema.value.csv;
    betaling.pris = this.Skjema.value.pris;

    this._http.post("admin/endreBetaling", betaling).subscribe((res) => {
      this.hentAlleBetalinger();
    });

  }
  hentAlleBetalinger() {
    this.laster = "Laster inn...";
    this._http.get<Betaling[]>("admin/hentBetalinger").subscribe((res) => {
      this.betalinger = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}
