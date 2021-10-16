import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Billett } from "../../Models-typescript/Billett";

@Component({
  selector: "app-skjemaer-billett",
  templateUrl: "billett.component.html"
})
export class BillettComponent {

  Skjema: FormGroup;
  public billetter: Array<Billett>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({

      billettId: ["", Validators.required],
      pris: ["", Validators.required],
      fra: ["", Validators.required],
      til: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required],
      antVoksen: ["", Validators.required],
      antBarn: ["", Validators.required]

    });
  }

  lagreBillett() {
    const billett = new Billett();
    billett.billettId = this.Skjema.value.billettId;
    billett.pris = this.Skjema.value.pris;
    billett.fra = this.Skjema.value.fra;
    billett.til = this.Skjema.value.til;
    billett.avgangsDato = this.Skjema.value.avgangsDato;
    billett.avgangsTid = this.Skjema.value.avgangsTid;
    billett.antVoksen = this.Skjema.value.antVoksen;
    billett.antBarn = this.Skjema.value.antBarn;

    this._http.post("admin/lagreBillett", billett).subscribe((res) => {

    });
  }


    endreBillett() {
      const billett = new Billett();
      billett.billettId = this.Skjema.value.billettId;
      billett.pris = this.Skjema.value.pris;
      billett.fra = this.Skjema.value.fra;
      billett.til = this.Skjema.value.til;
      billett.avgangsDato = this.Skjema.value.avgangsDato;
      billett.avgangsTid = this.Skjema.value.avgangsTid;
      billett.antVoksen = this.Skjema.value.antVoksen;
      billett.antBarn = this.Skjema.value.antBarn;

       this._http.post("admin/endreBillett", billett).subscribe((res) => {

      });
  }

  slett(index) {
    this._http.post("admin/slettBillett", this.billetter[index].billettId).subscribe((res) => {
      this.hentAlleBilletter();
    });
  }

  multipleSubmit(state: string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreBillett();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreBillett();
      }
    }

  }
  visEndre(index: number) {
    this.Skjema.setValue({
      billettId: this.billetter[index].billettId,
      pris: this.billetter[index].pris,
      fra: this.billetter[index].fra,
      til: this.billetter[index].til,
      avgangsDato: this.billetter[index].avgangsDato,
      avgangsTid: this.billetter[index].avgangsTid,
      antVoksen: this.billetter[index].antVoksen,
      antBarn: this.billetter[index].antBarn
    });

  }
  ngOnInit() {
    this.hentAlleBilletter();
  }
  hentAlleBilletter() {
    this.laster = "Laster inn...";
    this._http.get<Billett[]>("admin/hentBilletter").subscribe((res) => {
      this.billetter = res;
      this.laster = "";
    }, err => { }, () => { });
  }

}
