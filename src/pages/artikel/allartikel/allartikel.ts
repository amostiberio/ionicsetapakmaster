import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';



@IonicPage()
@Component({
  selector: 'page-allartikel',
  templateUrl: 'allartikel.html',
})
export class AllartikelPage {

  dataArtikel: any;
  jumlahArtikel :any;
  loading:any;
  BASE_URL = 'http://setapakbogor.site/'; 
  headers = new Headers({ 
    'Content-Type': 'application/json'});

  options = new RequestOptions({ headers: this.headers});
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,    
    public userData: UserData,
    public toastCtrl : ToastController,
    public app:App,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllartikelPage');
  }

  ionViewWillEnter(){
    this.loading = this.loadCtrl.create({
      content: 'Tunggu sebentar...'
      });
      this.loading.present()
      this.getReadyData().then((x) => {
        if (x) this.loading.dismiss();
    });

  }

  getReadyData(){
    return new Promise((resolve) => {        
        this.getArtikel();           
         resolve(true);
    });
  }

  getArtikel(){   
    this.http.get(this.userData.BASE_URL+"api/artikel/newest",this.options).subscribe(data => {
         let response = data.json();
         //  console.log(response.data)
	       if(response.status==200) {
           this.dataArtikel = response.data;
           this.jumlahArtikel = response.jumlah           
	       }else if (response.status == 204){
          this.jumlahArtikel = response.jumlah           
         }
         console.log(response)
	    }, err => { 
	       this.showError(err);
	    });
  }

  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }  
}
