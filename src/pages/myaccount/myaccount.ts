import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  HAS_LOGGED_IN = 'hasLoggedIn';
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public app: App, public userData:UserData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');
  }
  
  navigateToLoginPage(): void {
    //this.navCtrl.push('LoginPage')
    this.app.getRootNav().push('LoginPage')
  }

  navigateToSignupPage(): void {
    //this.navCtrl.push('SignupPage') // tab keliatan
    this.app.getRootNav().push('SignupPage') // tab gak keliatan
  }

  loadToken() {
    this.storage.get('token').then((val) => {
      console.log('Your Token is ', val)
    })
  }

  loadUserData() {
    this.storage.get('user_data').then((val) => {
      console.log('Your yser data is ', val)
    })
  }

  loadLoggedIn() {
    this.storage.get(this.HAS_LOGGED_IN).then((val) => {
      console.log('Your Logged Status is ', val)
    })
  }
  logout() {
    this.userData.logout();
  }
}