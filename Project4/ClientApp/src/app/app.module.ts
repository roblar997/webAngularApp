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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LugarComponent,
    PersonComponent,
    BillettComponent,
    RuteforekomstdatoComponent
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
      { path: 'ruteforekomstdato', component: RuteforekomstdatoComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
