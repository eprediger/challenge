import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { AppRoutingModule } from './app-routing.module';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

// LocaleData
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import localeEsAr from "@angular/common/locales/es-AR";

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
// Botón
import { MatButtonModule } from '@angular/material/button';
// Select
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
// Tabla
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';

// My components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { AverageAgeComponent } from './components/average-age/average-age.component';
import { CommonNamesComponent } from './components/common-names/common-names.component';
import { TeamSummaryComponent } from './components/team-summary/team-summary.component';

const MATERIAL: any[] = [MatProgressSpinnerModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule];

registerLocaleData(localeEs);
registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    MembersListComponent,
    NavbarComponent,
    SpinnerComponent,
    AverageAgeComponent,
    CommonNamesComponent,
    TeamSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...MATERIAL
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
