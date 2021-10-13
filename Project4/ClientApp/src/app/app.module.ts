import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { LugarComponent } from './skjemaer/lugar/lugar.component';
import { PersonComponent } from './skjemaer/person/person.component';
import { BillettComponent } from './skjemaer/billett/billett.component';
import { RuteforekomstdatoComponent } from './skjemaer/ruteforekomstDato/ruteforekomstdato.component';
import { BetalingComponent } from './skjemaer/betaling/betaling.component';
import { RuteforekomstdatotidComponent } from './skjemaer/ruteForekomstDatoTid/ruteforekomstdatotid.component';
import { HavnComponent } from './skjemaer/Havn/havn.component';
import { Rute } from './Models-typescript/Rute';
import { RuteComponent } from './skjemaer/rute/rute.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LugarComponent,
    PersonComponent,
    BillettComponent,
    RuteforekomstdatoComponent,
    RuteforekomstdatotidComponent,
    BetalingComponent,
    HavnComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LugarComponent, pathMatch: 'full' },
      { path: 'lugar', component: LugarComponent, pathMatch: 'full' },
      { path: 'person', component: PersonComponent, pathMatch: 'full' },
      { path: 'billett', component: BillettComponent, pathMatch: 'full' },
      { path: 'havn', component: HavnComponent, pathMatch: 'full' },
      { path: 'rute', component: RuteComponent, pathMatch: 'full' },
      { path: 'ruteforekomstdato', component: RuteforekomstdatoComponent, pathMatch: 'full' },
      { path: 'ruteforekomstdatotid', component: RuteforekomstdatotidComponent, pathMatch: 'full' },
      { path: 'betaling', component: BetalingComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
