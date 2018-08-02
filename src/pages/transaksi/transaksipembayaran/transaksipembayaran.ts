import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController, ActionSheetController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';
import moment from 'moment'

@IonicPage()
@Component({
  selector: 'page-transaksipembayaran',
  templateUrl: 'transaksipembayaran.html',
})
export class TransaksipembayaranPage {

  BASE_URL = 'http://setapakbogor.site/';
  BASE_ADMIN_URL = 'http://admin.setapakbogor.site/'
  headers = new Headers({ 
    'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});
  dataBank:any;
  dataTransaksi:any;
  datetimeDeadline:any;
  nomorRekeningMandiri:any = "900 826 4465826";
  nomorRekeningBNI:any = "448 123 4424552";
  nomorRekeningBRI:any = "225 223 4445212";
  constructor(public navCtrl: NavController,    
    public navParams: NavParams,
    public http: Http,    
    public userData: UserData,
    public toastCtrl : ToastController,
    public app:App,
    public loadCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController
    ) {
      this.dataTransaksi = this.navParams.data.datatransaksi
      this.datetimeDeadline = moment(this.dataTransaksi.transaction_date).add(24, 'hours') //tambah24hours
     console.log(this.dataTransaksi)
  }

  ionViewDidLoad() {
    this.getDataBank()
    console.log('ionViewDidLoad TransaksipembayaranPage');
  }

  getDataBank(){    
    this.http.get(this.userData.BASE_URL+"api/alamat/bank",this.options).subscribe(data => {
      let response = data.json();
      if(response.status==200) {       
         this.dataBank = response.data
         console.log('databank',this.dataBank) 
      }
   }, err => { 
      this.showError(err);
   });
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
