import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';


/**
 * Generated class for the ProduksearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produksearch',
  templateUrl: 'produksearch.html',
})
export class ProduksearchPage {
  token: string;
  BASE_URL = 'http://setapakbogor.site/';
  userLoggedIn: any;
  loading:any;
  submitted = false;

  dataProduk:any;
  searchkey:any;
  isSearchbarOpened = false;
  newparametersearchkey:any;

  headers = new Headers({ 
    'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App,
    public http: Http,    
    public userData: UserData,
    public toastCtrl : ToastController,
    public loadCtrl: LoadingController,) {
      this.newparametersearchkey = this.navParams.data.searchkey;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduksearchPage');
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
          this.getDataProduk(this.newparametersearchkey);         
          resolve(true);
    });
  }

  getDataProduk(keyword){
    let input = JSON.stringify({
      keyword: keyword
    });
    this.http.post(this.userData.BASE_URL+"api/barang/search",input,this.options).subscribe(data => {
      let response = data.json();       
      if(response.status==200) {          
        this.dataProduk = response.data;
        //console.log('dataproduk',this.dataProduk);
      }
      this.showAlert(response.message);
   }, err => { 
      this.showError(err);
   });       
  }

onSearch(event){
  this.searchkey = event.target.value
  //console.log("isi dari serachkey", this.searchkey)
  if(this.searchkey != null && this.searchkey != ''){
    this.app.getRootNav().push('ProduksearchPage',{searchkey: this.searchkey}).then(()=>{
      let index = 1;
      this.navCtrl.remove(index); 
      //remove page sebelumnya, biar backbutton langsung ke home 
      //bisabuat fungsi filter juga
    });
  }
}

produkDetail(data){
  this.app.getRootNav().push('ProdukdetailPage', data)
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
