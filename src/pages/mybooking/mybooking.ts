import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../providers/user-data';

@IonicPage()
@Component({
  selector: 'page-mybooking',
  templateUrl: 'mybooking.html',
})
export class MybookingPage {
  //deklarasi umum
  BASE_URL = 'http://setapakbogor.site/';
  userLoggedIn: any;
  loading:any;
  headers = new Headers({ 
    'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  myBooking: string ;
  currentUserId:any;
  token:any;
  segment: String='homestay';
  dataTransaksiHomestay: any = [];
  dataTransaksiProduk: any = [];
  dataTransaksiJasa: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,    
    public userData: UserData,
    public toastCtrl : ToastController,
    public app:App,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookingPage');
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
            this.myBooking = "homestaynotloggin";
            this.userData.hasLoggedIn().then((value)=>{
            this.userLoggedIn = value;
            //console.log(this.userLoggedIn)
            if(this.userLoggedIn == true){
              this.userData.getId().then((value) => {
                this.currentUserId = value;
              });
              this.userData.getToken().then((value)=>{
                this.token = value;
                console.log(this.token)
                this.getTransaksiHomestay(this.token); //starter get data transaksi awal                
              })              
              this.myBooking = "homestay";
            }
          });         
          resolve(true);
    });
  }

  selectedSegment(value){
    //console.log('segment yang dipilih ', value);
    this.segment = value;
    //req api
    if(this.segment == 'homestay' && this.dataTransaksiHomestay.length == 0){
      this.getTransaksiHomestay(this.token);
    }else if(this.segment == 'produk' && this.dataTransaksiProduk.length == 0){
      console.log(this.segment)
    }else if(this.segment =='jasa' && this.dataTransaksiJasa.length == 0){
      console.log(this.segment)  
    }  
  }

  getTransaksiHomestay(token){
    //console.log(token)
    let input = JSON.stringify({     
      token: token,
    });    
    this.http.post(this.userData.BASE_URL+"api/transaksiHomestay/user/historytransaksiku",input,this.options).subscribe(data => {
      let response = data.json();
      //console.log(data.json());
      if(response.status==200) {
         this.dataTransaksiHomestay = response.data
         for(var i = 0 ; i<this.dataTransaksiHomestay.length; i++){
            this.getDataHomestay(this.dataTransaksiHomestay[i].homestay_id,i)            
         }
         console.log(this.dataTransaksiHomestay)
      }else if(response.status==204) {
        console.log('data kosong');
     }
   }, err => { 
      this.showError(err);
   });
  } 

  getDataHomestay(idHomestay,i){    
    this.http.get(this.userData.BASE_URL+"api/homestay/"+idHomestay,this.options).subscribe(data => {
      let response = data.json();
      if(response.status==200) {
        this.dataTransaksiHomestay[i].datahomestay = response.datahomestay        
        this.dataTransaksiHomestay[i].dataAlamatCategory = response.dataAlamatCategory
        this.dataTransaksiHomestay[i].dataPemandu = response.dataPemandu            
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
