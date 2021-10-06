import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-lugar",
  templateUrl: "lugar.component.html"
})
export class LugarComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Skjema = fb.group({
      fornavn: ["", Validators.required],
      etternavn: ["", Validators.required],
      telefon: ["", Validators.required]
    });
  }

  onSubmit() {

  }
}

