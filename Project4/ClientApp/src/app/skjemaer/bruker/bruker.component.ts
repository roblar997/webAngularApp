import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Bruker } from "../../Models-typescript/Bruker";
import { Rute } from "../../Models-typescript/Rute";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../modal/modal";
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
  visModal() {
    const modalRef = this.modalService.open(Modal, {
      backdrop: 'static',


      keyboard: false

    });

    modalRef.componentInstance.navn = "";

    modalRef.result.then(retur => {

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
    this._http.post("admin/slettBruker", this.brukere[index].brukernavn).subscribe((res) => {
      this.hentAlleBrukere();
    });
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      brukernavn: this.brukere[index].brukernavn,
      passord: this.brukere[index].passord,

    });

  }

  multipleSubmit(state: string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreBruker();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreBruker();
      }
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

