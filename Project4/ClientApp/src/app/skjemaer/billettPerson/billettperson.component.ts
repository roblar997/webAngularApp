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
}

