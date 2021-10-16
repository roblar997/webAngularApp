import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Bruker } from "../../Models-typescript/Bruker";
import { Rute } from "../../Models-typescript/Rute";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-bruker",
  templateUrl: "bruker.component.html"
})
export class BrukerComponent {

  Skjema: FormGroup;
  public brukere: Array<Bruker>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
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
          this._http.post("admin/slettBruker", this.brukere[toSend].brukernavn).subscribe((res) => {
            this.hentAlleBrukere();
          });
        }
        else if (infoTitle == "lagre") {
          this.lagreBruker();
        }
        else if (infoTitle == "endre") {
          this.endreBruker();
        }
      }
      else {

      }
    });
  }
  lagreBruker() {

    const bruker = new Bruker();
    bruker.brukernavn = this.Skjema.value.brukernavn;
    bruker.passord = this.Skjema.value.passord;


    this._http.post("admin/lagreBruker", bruker).subscribe((res) => {
      this.hentAlleBrukere();
    });
  }

  endreBruker() {

    const bruker = new Bruker();
    bruker.brukernavn = this.Skjema.value.brukernavn;
    bruker.passord = this.Skjema.value.passord;


    this._http.post("admin/endreBruker", bruker).subscribe((res) => {
      this.hentAlleBrukere();
    });
  }
  slett(index) {
    this.visModal("Ja", "Nei", "slett", "Vil du slette?",index);
 
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      brukernavn: this.brukere[index].brukernavn,
      passord: this.brukere[index].passord,

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

  ngOnInit() {
    this.hentAlleBrukere();
  }
  hentAlleBrukere() {
    this.laster = "Laster inn...";
    this._http.get<Bruker[]>("admin/hentBrukere").subscribe((res) => {
      this.brukere = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

