import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-ruteforekomstdatotid",
  templateUrl: "ruteforekomstdatotid.component.html"
})
export class RuteforekomstdatotidComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Skjema = fb.group({
      ruteId: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required],
      ankomstDato: ["", Validators.required],
      ankomstTid: ["", Validators.required],
      forekomstDatoId: ["", Validators.required],
      erUtsolgt: ["", Validators.required]
    });
  }

  onSubmit() {

  }
}

