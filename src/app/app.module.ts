import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { TeamsDataService } from './teams/teams.data.service';
import { InvitationComponent } from './invitation/invitation.component';
import { HomeComponent } from './home/home.component';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

// angular material cdk
import { ClipboardModule } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, HomeComponent, InvitationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    DividerModule,
    SkeletonModule,
    MessagesModule,
    ToastModule,
    DialogModule,
    ClipboardModule,
    environment.production
      ? []
      : HttpClientInMemoryWebApiModule.forRoot(TeamsDataService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
