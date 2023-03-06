import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { TokenDistributionFormComponent } from './token-distribution-form/token-distribution-form.component';
import { Buffer } from 'buffer';

@NgModule({
  declarations: [
    AppComponent,
    TokenDistributionFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: Buffer, useValue: Buffer }], //{ provide: Buffer, useValue: Buffer }
  bootstrap: [AppComponent]
})
export class AppModule { }
