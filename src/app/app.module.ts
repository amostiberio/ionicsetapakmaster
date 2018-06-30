import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { Transfer } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
//page
import { MybookingPage } from '../pages/mybooking/mybooking';
import { NotificationPage } from '../pages/notification/notification';
import { HomePage } from '../pages/home/home';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { TabsPage } from '../pages/tabs/tabs';

import { TestPage } from '../pages/test/test';
import { MyApp } from './app.component';

//provider
import { UserData } from '../providers/user-data';
import { AlertService } from '../providers/util/alert.service';

import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

//component module
// import { ComponentsModule } from './../components/components.module';

//set the auth http for API
export function getAuthHttp(http, Storage) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "",
    noJwtError: true,
    globalHeaders: [{'Content-Type': 'application/json'}],
    tokenGetter: (() => {return Storage.get('token')}),
  }), http);
}
@NgModule({
  declarations: [
    MyApp,
    MybookingPage,
    NotificationPage,
    HomePage,
    MyaccountPage,    
    TabsPage,
    TestPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),    
    IonicStorageModule.forRoot(),    
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MybookingPage,
    NotificationPage,
    HomePage,
    MyaccountPage,
    TabsPage,
    TestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserData,
    AlertService,
    Transfer,    
    FileChooser,
    FileOpener,  
    File,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, Storage]
    }
  ]
})
export class AppModule {}
