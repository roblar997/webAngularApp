import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Havn } from "../../Models-typescript/Havn";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../modal/modal";
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
      havnId: ["", Validators.required],
      navn: ["", Validators.required]


    });
  }
  multipleSubmit(state: string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreHavn();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreHavn();
      }
    }

  }

  lagreHavn() {

    const havn = new Havn();
    havn.havnId = this.Skjema.value.havnId;
    havn.navn = this.Skjema.value.navn;


    this._http.post("admin/lagreHavn", havn).subscribe((res) => {
      this.hentAlleHavner();
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
    this._http.post("admin/slettHavn", this.havner[index].havnId).subscribe((res) => {
      this.hentAlleHavner();
    });
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
