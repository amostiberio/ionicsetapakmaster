import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';


/**
 * Generated class for the HomestaysearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homestaysearch',
  templateUrl: 'homestaysearch.html',
})
export class HomestaysearchPage {
  
  kecamatan : string[] =["Dramaga","Cilebut"] 
  knobValues: any = {
    upper:3000000,
    lower:0
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public app : App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomestaysearchPage');
  }
  navigateToHomestayresult(): void {
    //this.navCtrl.push('LoginPage')
    this.app.getRootNav().push('HomestayresultPage')
  }
}
