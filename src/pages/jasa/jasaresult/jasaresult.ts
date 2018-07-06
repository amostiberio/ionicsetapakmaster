import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';

/**
 * Generated class for the JasaresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jasaresult',
  templateUrl: 'jasaresult.html',
})
export class JasaresultPage {
  datajasa: any;
  input:any;
  loading:any;
  mainphoto:any;
  BASE_URL = 'http://setapakbogor.site/'; 
  namaprovinsi:any;
  namakabupaten:any;
  namakecamatan:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app : App,
    public loadCtrl: LoadingController) {      
    this.datajasa = this.navParams.data.datajasa;
    this.namaprovinsi = this.navParams.data.provinsi;
    this.namakabupaten = this.navParams.data.kabupaten;
    this.namakecamatan = this.navParams.data.kecamatan;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JasaresultPage');
  }
  jasadetail(data) {   
    this.app.getRootNav().push('JasadetailPage',data);
  }
}
