import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-betaling",
  templateUrl: "betaling.component.html"
})
export class BetalingComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSubmit() {

  }
}
