import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BillettPerson } from "../../Models-typescript/BillettPerson";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../modal/modal";
@Component({
  selector: "app-skjemaer-billettperson",
  templateUrl: "billettperson.component.html"
})
export class BillettpersonComponent {

  Skjema: FormGroup;
  public billettpersoner: Array<BillettPerson>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      billettId: ["", Validators.required],
      personId: ["", Validators.required]
    });
  }

  lagreBillettPerson() {

    const billettperson = new BillettPerson();
    billettperson.billettId = this.Skjema.value.billettId;
    billettperson.personId = this.Skjema.value.personId;


    this._http.post("admin/lagrebillettperson", billettperson).subscribe((res) => {
      this.hentAlleBillettpersoner();
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
  endreBillettPerson() {

    const billettperson = new BillettPerson();
    billettperson.billettId = this.Skjema.value.billettId;
    billettperson.personId = this.Skjema.value.personId;


    this._http.post("admin/endrebillettperson", billettperson).subscribe((res) => {
      this.hentAlleBillettpersoner();
    });
  }

  visEndre(index: number) {
    this.Skjema.setValue({
      billettId: this.billettpersoner[index].billettId,
      personId: this.billettpersoner[index].personId,

    });

  }
  slett(index) {

    const billettperson = new BillettPerson();
    billettperson.billettId = this.billettpersoner[index].billettId;
    billettperson.personId = this.billettpersoner[index].personId;

    this._http.post("admin/slettBillettperson", billettperson).subscribe((res) => {
      this.hentAlleBillettpersoner();
    });
  }

  multipleSubmit(state: string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreBillettPerson();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreBillettPerson();
      }
    }

  }
  ngOnInit() {
    this.hentAlleBillettpersoner();
  }
  hentAlleBillettpersoner() {
    this.laster = "Laster inn...";
    this._http.get<BillettPerson[]>("admin/hentBillettpersoner").subscribe((res) => {
      this.billettpersoner = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

