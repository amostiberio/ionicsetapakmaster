import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';


@IonicPage()
@Component({
  selector: 'page-addreview',
  templateUrl: 'addreview.html',
})
export class AddreviewPage {
  BASE_URL = 'http://setapakbogor.site/';
  userLoggedIn: any;
  loading:any;
  headers = new Headers({ 
    'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});
  
  token:any;  
  tipeProduk:any;
  idProduk:any;
  isi_review:any;
  jumlah_star:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,    
    public userData: UserData,
    public toastCtrl : ToastController,
    public app:App,
    public loadCtrl: LoadingController) {
    this.idProduk = this.navParams.data.id
    this.tipeProduk = this.navParams.data.tipeproduk

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddreviewPage');
  }

  
  ionViewWillEnter() {    
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
        this.userData.getToken().then((token) => {
          this.token = token;
        });   
        resolve(true);
    });
  }

  addReview(){    
    this.loading = this.loadCtrl.create({
      content: 'Tunggu sebentar...'
    });
    this.loading.present();
    let input = JSON.stringify({
      isi_review: this.isi_review,
      produk_id: this.idProduk,
      tipe_produk:this.tipeProduk,
      jumlah_star:this.jumlah_star,
      token: this.token
    });     
    this.http.post(this.userData.BASE_URL+"api/review/addReview",input,this.options).subscribe(data => {
      this.loading.dismiss();
      let response = data.json();       
      if(response.status == 200) {
        this.showAlert(response.message);     
      }else{
        this.showAlert(response.message); 
      }
    }, err => { 
        this.loading.dismiss();
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
