import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../providers/util/alert.service';


@IonicPage()
@Component({
  selector: 'page-transaksiproduk',
  templateUrl: 'transaksiproduk.html',
})
export class TransaksiprodukPage {
  token: string;
  BASE_URL = 'http://setapakbogor.site/';
  userLoggedIn: any;
  loading:any;
  submitted = false;
  headers = new Headers({ 
    'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});
  user: {user_id?: string, nama?: string, email?: string, alamat?: string, nohp?: string, userphoto?:string} = {};
  
  transaction_id :any;
  dataTransaksi:any;
  dataProduk :any;          
  dataPemandu :any;
  idAlamatCategory :any;
  dataAlamatCategory :any;
  constructor(public navCtrl: NavController,
    public alertService: AlertService, 
    public navParams: NavParams,
    public http: Http,    
    public userData: UserData,
    public toastCtrl : ToastController,
    public app:App,
    public loadCtrl: LoadingController) {
      this.transaction_id = this.navParams.data.transactionId
      //console.log(this.transaction_id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaksiprodukPage');
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
            this.getTransaksiProduk(this.transaction_id)
            //this.getAlamatCategory(this.idAlamatCategory);
            this.userData.getData().then((value)=>{
            this.user.nama = value.nama;
            this.user.email = value.email;
            this.user.nohp = value.no_hp;
            this.user.user_id = value.user_id
          });    
          this.userData.getToken().then((token) => {
            this.token = token;
          });
          //this.hitungTotalPrice();
          //this.getDataProduk(this.datahomestay.homestay_id);    
          resolve(true);
    });
  }

  getTransaksiProduk(transaction_id){

    this.http.get(this.userData.BASE_URL+"api/transaksiBarang/user/transaksibyid/"+transaction_id,this.options).subscribe(data => {
      let response = data.json();
      if(response.status==200) {
        this.dataTransaksi = response.data
        this.getDataProduk(this.dataTransaksi.barang_id)        
      }
   }, err => { 
      this.showError(err);
   });
    
  }
  
  getDataProduk(idBarang){    
    this.http.get(this.userData.BASE_URL+"api/barang/"+idBarang,this.options).subscribe(data => {
      let response = data.json();
      console.log(data.json());
      if(response.status==200) {
         this.dataProduk = response.dataBarang          
         this.dataPemandu = response.dataPemandu
         this.idAlamatCategory = this.dataPemandu.alamatcategory_id; 
         this.getAlamatCategory(this.idAlamatCategory);
      }
   }, err => { 
      this.showError(err);
   });
  }

  getAlamatCategory(idAlamat){    
    this.http.get(this.userData.BASE_URL+"api/alamat/category/"+idAlamat,this.options).subscribe(data => {
      let response = data.json();
      if(response.status==200) {
         this.dataAlamatCategory = response.data
         //console.log('alamatcategorydata',this.dataAlamatCategory);
      }
   }, err => { 
      this.showError(err);
   });
  }

  uploadBuktiPembayaran(){

  }
 
  konfirmasiTransaksi(){

  }
  cancelTransaksi(transaction_status){
    if(transaction_status > 0){
      this.showAlert("Transaksi sudah berjalan atau diproses");
    }else{
      this.showAlert("Cancel");
    }
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
