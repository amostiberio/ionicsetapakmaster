import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-homestayresult',
  templateUrl: 'homestayresult.html',
})
export class HomestayresultPage {
  datahomestay: any;
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
    this.datahomestay = this.navParams.data.datahomestay;
    this.namaprovinsi = this.navParams.data.provinsi;
    this.namakabupaten = this.navParams.data.kabupaten;
    this.namakecamatan = this.navParams.data.kecamatan;

    //console.log('thisnavparamdata',this.navParams);
   
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomestayresultPage');
  }
  homestaydetail(data) {   
    this.app.getRootNav().push('HomestaydetailPage',data);
  }

}
