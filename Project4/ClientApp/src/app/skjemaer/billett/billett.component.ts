import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-billett",
  templateUrl: "billett.component.html"
})
export class BillettComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Skjema = fb.group({
      pris: ["", Validators.required],
      fra: ["", Validators.required],
      til: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required],
      antVoksen: ["", Validators.required],
      antBarn: ["", Validators.required]

    });
  }

  onSubmit() {

  }
}

