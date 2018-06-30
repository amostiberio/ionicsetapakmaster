import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomestayresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homestayresult',
  templateUrl: 'homestayresult.html',
})
export class HomestayresultPage {
  
  cards = [
    {
      imageUrl: 'assets/imgs/card/nin-live.png',
      title: 'Nine Inch Nails Live',
      // tslint:disable-next-line:max-line-length
      description: 'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.'
    },
    {
      imageUrl: 'assets/imgs/card/badu-live.png',
      title: 'Erykah Badu',
      // tslint:disable-next-line:max-line-length
      description: 'American singer-songwriter, record producer, activist, and actress, Badu\'s style is a prime example of neo-soul.'
    },
    {
      imageUrl: 'assets/imgs/card/queen-live.png',
      title: 'Queen',
      // tslint:disable-next-line:max-line-length
      description: 'The British rock band formed in London in 1970, and is considered one of the biggest stadium rock bands in the world.'
    },
    {
      imageUrl: 'assets/imgs/card/bjork-live.jpg',
      title: 'Björk',
      description: 'Björk is an Icelandic singer, songwriter and actress.'
    },
    {
      imageUrl: 'assets/imgs/card/rundmc-live.png',
      title: 'Run-D.M.C.',
      // tslint:disable-next-line:max-line-length
      description: 'The American hip hop group widely acknowledged as one of the most influential acts in the history of hip hop.'
    },];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomestayresultPage');
  }
  cardTapped(card) {
    alert(card.title + ' was tapped.');
  }

  share(card) {
    alert(card.title + ' was shared.');
  }

  listen(card) {
    alert('Listening to ' + card.title);
  }

  favorite(card) {
    alert(card.title + ' was favorited.');
  }
}
