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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LugarComponent,
    PersonComponent
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
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
