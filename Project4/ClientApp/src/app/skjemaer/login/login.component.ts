import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Betaling } from "../../Models-typescript/Betaling";

@Component({
  selector: "app-skjemaer-login",
  templateUrl: "login.component.html"
})
export class LoginComponent {

  Skjema: FormGroup;


  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      brukernavn: ["", Validators.required],
      passord: ["", Validators.required],


    });
  }
 
}
