import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MybookingPage } from '../mybooking/mybooking';
import { NotificationPage } from '../notification/notification';
import { HomePage } from '../home/home';
import { MyaccountPage } from '../myaccount/myaccount';
import { TestPage } from '../test/test'
import { UserData } from '../../providers/user-data';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  HAS_LOGGED_IN = 'hasLoggedIn';  
  userLoggedIn : any ;
  
  // tab1Root = HomePage;
  // tab2Root = MybookingPage;
  // tab3Root = NotificationPage;
  // tab4Root = MyaccountPage;
  // tab5Root = TestPage;
  tab1Root : any = HomePage
  tab2Root : any = MybookingPage
  tab3Root : any = NotificationPage
  tab4Root : any = MyaccountPage
  tab5Root : any = TestPage
    
  constructor(public storage: Storage, public userData : UserData) {
    // check logged in to select the ion tabs
    this.userData.hasLoggedIn().then((value)=>{
      this.userLoggedIn = value;
      console.log('sudah login ', this.userLoggedIn)
    }); 
      
  }
  
}
