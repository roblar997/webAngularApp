import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BillettPerson } from "../../Models-typescript/BillettPerson";

@Component({
  selector: "app-skjemaer-billettperson",
  templateUrl: "billettperson.component.html"
})
export class BillettpersonComponent {

  Skjema: FormGroup;
  public billettpersoner: Array<BillettPerson>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
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

    });
  }
  endreBillettPerson() {

    const billettperson = new BillettPerson();
    billettperson.billettId = this.Skjema.value.billettId;
    billettperson.personId = this.Skjema.value.personId;


    this._http.post("admin/endrebillettperson", billettperson).subscribe((res) => {

    });
  }

  visEndre(index: number) {


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

