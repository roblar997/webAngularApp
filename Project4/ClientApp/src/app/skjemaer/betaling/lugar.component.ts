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

        lugarId: ["", Validators.required],
      bildeUrl: ["", Validators.required],
      beskrivelse: ["", Validators.required],
      antall: ["", Validators.required],
      lugarType: ["", Validators.required],
      tittel: ["", Validators.required],
      romNr: ["", Validators.required],
      pris: ["", Validators.required],
      harWc: ["", Validators.required],
      harDysj: ["", Validators.required],
      hawrWifi: ["", Validators.required]
    });
  }

  onSubmit() {

  }
}
