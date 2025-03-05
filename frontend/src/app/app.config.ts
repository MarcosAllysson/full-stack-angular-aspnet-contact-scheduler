import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { MegaMenuModule } from 'primeng/megamenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ProductService } from './demo/service/product.service';
import { routerConfig, routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideRouter(routes, withRouterConfig(routerConfig)),
        importProvidersFrom(
            BrowserModule,
            MegaMenuModule,
            ProgressSpinnerModule,
            BrowserAnimationsModule,
            NgxIndexedDBModule.forRoot()),
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
    ]
};