import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Person } from "../../Models-typescript/Person";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html"
})
export class PersonComponent {

  Skjema: FormGroup;

  public fornavn: string;
  public etternavn: string;
  public telefon: string;
  public personer: Array<Person>;

  public laster: string;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      fornavn: ["", Validators.required],
      etternavn: ["", Validators.required],
      telefon: ["", Validators.required]
    });
  }

  onSubmit() {
    console.log("Modellbasert skjema submitted:");
    console.log(this.Skjema);
    console.log(this.Skjema.value.brukernavn);
    console.log(this.Skjema.touched);
  }


  hentAllePersoner() {
    this.laster = "Laster inn...";
    this._http.get<Person[]>("admin/hentPersoner").subscribe((res) => {
      this.personer = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

