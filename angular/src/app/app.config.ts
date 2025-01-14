import { ApplicationConfig, InjectionToken, provideExperimentalZonelessChangeDetection } from '@angular/core'
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { ConfigService } from './services/config.service';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const TAB_ID = new InjectionToken<number>('CHROME_TAB_ID')

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig = (tabId: number): ApplicationConfig => {
  return {
    providers: [
      { provide: TAB_ID, useValue: tabId },
      provideExperimentalZonelessChangeDetection(),
      provideTranslateService({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'gb',
      }),
      provideHttpClient(),
      {
        provide: APOLLO_OPTIONS,
        useFactory: (
          httpLink: HttpLink,
          //configService: ConfigService
        ): ApolloClientOptions<unknown> => ({
          link: ApolloLink.from([
            httpLink.create({ uri: 'https://api.github.com/graphql' }),
          ]),
          cache: new InMemoryCache(),
        }),
        deps: [HttpLink, /*ConfigService*/],
      },
      Apollo, provideAnimationsAsync(),
    ]
  }
}
