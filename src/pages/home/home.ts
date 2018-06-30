import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides,App } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('slider') slider: Slides;

  slides = [
    {
      title: 'Dream\'s Adventure',
      imageUrl: 'assets/imgs/lists/wishlist-1.jpg',
      songs: 2,
      private: false
    },
    {
      title: 'For the Weekend',
      imageUrl: 'assets/imgs/lists/wishlist-2.jpg',
      songs: 4,
      private: false
    },
    {
      title: 'Family Time',
      imageUrl: 'assets/imgs/lists/wishlist-3.jpg',
      songs: 5,
      private: true
    },
    {
      title: 'My Trip',
      imageUrl: 'assets/imgs/lists/wishlist-4.jpg',
      songs: 12,
      private: true
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,public app :App,public userData : UserData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  navigateToLoginPage2(): void {
    //this.navCtrl.push('LoginPage')
    this.app.getRootNav().push('LoginPage')
  }
  navigateToSearchHomestay(): void {
    //this.navCtrl.push('LoginPage')
    this.app.getRootNav().push('HomestaysearchPage')
  }
  
}
