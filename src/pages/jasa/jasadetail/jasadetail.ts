import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';



@IonicPage()
@Component({
  selector: 'page-jasadetail',
  templateUrl: 'jasadetail.html',
})
export class JasadetailPage {
  BASE_URL = 'http://setapakbogor.site/';
  userLoggedIn: any;
  loading:any;
  datajasa: any;
  currentUserId: any; 
  newDataJasa:any; 
  idAlamatCategory :any;
  dataAlamatCategory: any;
  dataPictures:any;
  dataPemandu:any;
  namaProvinsi:any;
  namaKabupaten:any;
  namaKecamatan:any;
  

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
    this.datajasa = this.navParams.data;
    
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomestaydetailPage');
  }

  getReadyData(){
    return new Promise((resolve) => {        
          this.idAlamatCategory = this.datajasa.alamatcategory_id; 
          this.getDataJasa(this.datajasa.jasa_id);
          this.getJasaPhoto(this.datajasa.jasa_id);
          this.userData.hasLoggedIn().then((value)=>{
            this.userLoggedIn = value;
            if(this.userLoggedIn == true)  {
              this.userData.getId().then((value) => {
                this.currentUserId = value;
              });
            }   
          });  
          resolve(true);
    });
  }

  getDataJasa(idJasa){    
    this.http.get(this.userData.BASE_URL+"api/jasa/"+idJasa,this.options).subscribe(data => {
      let response = data.json();
      if(response.status==200) {
         this.newDataJasa = response.dataJasa 
         this.dataAlamatCategory = response.dataAlamatCategory
         this.dataPemandu = response.dataPemandu
         //console.log("dataalamatcategory",this.dataAlamatCategory)   
      }
   }, err => { 
      this.showError(err);
   });
  }

  bro(){
    const index = this.navCtrl.getActive().index;
    this.navCtrl.remove(index-1);
  }
  

  getJasaPhoto(idJasa){
    this.http.get(this.userData.BASE_URL+"api/picture/jasa/"+idJasa,this.options).subscribe(data => {
      let response = data.json();
      if(response.status==200) {
         this.dataPictures = response.data
         console.log('datapictures',this.dataPictures);        
      }
   }, err => { 
      this.showError(err);
   });
  }  

  pesanJasa(idJasa){    
    if(this.userLoggedIn == true ){    
      if(this.dataPemandu.user_id == this.currentUserId) {
        this.showAlert("Tidak bisa memesan layanan Jasa milik sendiri");          
      }else{
        this.app.getRootNav().push('JasapesanPage',{dataJasa: this.newDataJasa}); 
      }       
    }else{     
      this.showAlert("Harus Login Terlebih Dahulu");       
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
  navProfileCompany(){
    //urusan emiel bikin profile company
    //this.app.getRootNav().push('PemanduPage');
  }

}
