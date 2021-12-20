<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1>Food</h1>
                <p>ค้นหารายการอาหาร</p>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Date</ion-label>
              <ion-datetime display-format="MMM DD, YYYY HH:mm" v-model="FoodDateTime"></ion-datetime>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-label>
              <h3>Day Nutrients</h3>
              <p>Carb</p>
              <ion-progress-bar :value="FoodBarCarb"></ion-progress-bar>
            </ion-label>
            <ion-label>
              <p>Protein</p>
              <ion-progress-bar :value="FoodBarProtein"></ion-progress-bar>
            </ion-label>
            <ion-label>
              <p>Vegetable</p>
              <ion-progress-bar :value="FoodBarVegetable"></ion-progress-bar>
            </ion-label>
            <ion-lab>
              <p>Cal {{ this.counts.FoodCal }}</p>
            </ion-lab>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-searchbar placeholder="enter key" inputmode="search" animated debounce="100" v-model="keywords" @ionChange="change">
            </ion-searchbar>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-list>
            <ion-item v-for="FoodRec in FoodData" :key="FoodRec.id">
              <label>ชื่ออาหาร {{ keywords }}
              </label>
            </ion-item>
          </ion-list>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ion-row>
          <ion-col size="8">
            <ion-label>Carb:(ข้าว/แป้ง/เส้น)</ion-label>
          </ion-col>
          <ion-col>
            <ion-label>{{ FoodCarb }} %</ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-range  min="0" max="100" v-model="FoodCarb" step="5" ticks="true" snaps="true" color="warning"></ion-range>
        </ion-row>
        <ion-row>
          <ion-col size="8">
            <ion-label>Protein:(เนื้อสัตว์/ถั่ว/เห็ด)</ion-label>
          </ion-col>
          <ion-col>
            <ion-label>{{ FoodProtein }} %</ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-range  min="0" max="100" v-model="FoodProtein" step="5" ticks="true" snaps="true" color="secondary"></ion-range>
        </ion-row>
        <ion-row>
          <ion-col size="8">
            <ion-label>Vegetable:(ผัก)</ion-label>
          </ion-col>
          <ion-col>
            <ion-label>{{ FoodVegetable }} %</ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-range  min="0" max="100" v-model="FoodVegetable" step="5" ticks="true" snaps="true" color="success"></ion-range>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-label>{{ FoodNutrientsPercent = FoodCarb +  FoodProtein + FoodVegetable }}</ion-label>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-item>
            <ion-label slot="start">Calorie</ion-label>
            <ion-input type="number" placeholder="100" v-model="FoodCal"></ion-input>
            <ion-label slot="end">Cal</ion-label>
          </ion-item>
        </ion-row>
        <ion-row>
          <ion-item>
            <ion-label slot="start">Quantity</ion-label>
            <ion-input type="number" placeholder="1" v-model="FoodQuantity"></ion-input>
            <ion-label slot="end">ฝ่ามือ</ion-label>
          </ion-item>
        </ion-row>
      </ion-grid>
      <ion-button :disabled="!isFormValid" expand="block" color="success" @click="SaveData">เพิ่มรายการ</ion-button>
      <ion-list>
        <ion-item v-for="FoodPerDayRecord in FoodPerDay" :key="FoodPerDayRecord.id">
          <ion-label>
            <p>
              {{ FoodPerDayRecord.createdAt.toDate().toLocaleString() }}
            </p>
            <h3>
              {{ FoodPerDayRecord.FoodName}}
              {{ FoodPerDayRecord.FoodCal}} Cal
              {{ FoodPerDayRecord.FoodQuantity }} ฝ่ามือ
            </h3>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>
              เนื้อสัตว์ 1 ฝ่ามือ ประมาณ 85-100 กรัม
            </p>
            <p>
              ข้าว 1 ฝ่ามือ/ถ้วย ประมาณ 80 กรัม
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSearchbar,
  IonList,
  IonItem,
  IonButton,
  IonRange,
  IonDatetime,
  IonInput,
  IonProgressBar,
} from '@ionic/vue';
import {db} from "@/firebase";
import { collection, addDoc,Timestamp,getDocs, query, where } from '@firebase/firestore'
import {ref} from 'vue';
import {orderBy} from "firebase/firestore";
export default {
  name: "FoodSearch",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonSearchbar,
    IonList,
    IonItem,
    IonButton,
    IonRange,
    IonDatetime,
    IonInput,
    IonProgressBar
  },
  data(){
    return{
      FoodData: [],
      FoodPerDay:[],
      FoodDateTime: new Date().toISOString(),
      FoodCarb: 0,
      FoodProtein: 0,
      FoodVegetable: 0,
      FoodNutrientsPercent: 0,
      FoodQuantity: 0,
      FoodCal: 0,
      DateN: '',
      counts:{
        FoodCarb: 0,
        FoodProtein: 0,
        FoodVegetable: 0,
        FoodCal: 0
      },
      FoodBarCarb: 0,
      FoodBarProtein: 0,
      FoodBarVegetable: 0,
      ToTalNutrients: 0
    }
  },
  computed:{
    isFormValid () {
      return (this.FoodNutrientsPercent === 100 && this.keywords !== '')
      && (this.FoodQuantity != '' || this.FoodQuantity != 0)
    }
  },
  watch:{
    keywords: async function () {
      await this.LoadFoodData()
    },
    FoodDateTime: async  function(){
      await this.LoadFoodPereDay()
    }
  },
  methods:{
    async LoadFoodData(){
      let ref = collection(db, 'Food')
      let q = query(ref, where("FoodName", "==", this.keywords))
      let querySnapshot = await getDocs(q)
      if (querySnapshot.empty){
        this.FoodData = [{ FoodName: this.keywords }]
        this.FoodCarb = 0
        this.FoodProtein = 0
        this.FoodVegetable = 0
        this.FoodCal = 0
      }else{
        querySnapshot.forEach(d => {
          let data = d.data()
          data.id = d.id
          this.FoodData = []
          this.FoodData.push(data)
          this.FoodCarb = data.FoodCarb
          this.FoodProtein = data.FoodProtein
          this.FoodVegetable = data.FoodVegetable
          this.FoodCal = data.FoodCal
          this.FoodQuantity = data.FoodQuantity
        })
      }
    },
    async SaveData(){
      let data ={
        userId: this.$store.state.user.userId,
        FoodName : this.keywords,
        FoodCarb : this.FoodCarb,
        FoodProtein : this.FoodProtein,
        FoodVegetable : this.FoodVegetable,
        FoodCal: this.FoodCal,
        FoodQuantity: this.FoodQuantity,
        createdAt: Timestamp.fromDate(new Date()),
        datetxt: this.DateN
      }
      let ref = collection(db, 'Food')
      let q = query(ref, where("FoodName", "==", this.keywords))
      let querySnapshot = await getDocs(q)
      if (querySnapshot.empty){
        addDoc(ref, data).then((docRef)=>{
          data.id = docRef.id
        })
      }
      if (this.isFormValid) {
        let ref = collection(db, 'FoodUser')
        addDoc(ref, data).then((docRef)=>{
          data.id = docRef.id
        })
      }
      await  this.LoadFoodPereDay()
    },
    async LoadFoodPereDay(){
      let ref = collection(db, 'FoodUser')
      let q = query(ref, where("userId", "==", this.$store.state.user.userId), where('datetxt', '==',this.DateN ),
          orderBy('createdAt','desc'))
      let querySnapshot = await getDocs(q)
      this.counts.FoodCal = 0
      this.counts.FoodCarb += 0
      this.counts.FoodProtein += 0
      this.counts.FoodVegetable += 0
      this.ToTalNutrients += 0
      this.FoodPerDay = []
      querySnapshot.forEach(d => {
        let data = d.data()
        data.id = d.id
        this.FoodPerDay.push(data)
        this.counts.FoodCal += parseInt(data.FoodCal) * (data.FoodQuantity)
        this.counts.FoodCarb += parseInt(data.FoodCarb)* (data.FoodQuantity)
        console.log(data.FoodCarb)
        this.counts.FoodProtein += parseInt(data.FoodProtein)* (data.FoodQuantity)
        this.counts.FoodVegetable += parseInt(data.FoodVegetable)* (data.FoodQuantity)
        this.ToTalNutrients += parseInt(data.FoodCarb)* (data.FoodQuantity)
        this.ToTalNutrients += parseInt(data.FoodProtein)* (data.FoodQuantity)
        this.ToTalNutrients += parseInt(data.FoodVegetable)* (data.FoodQuantity)
      })
      if(this.counts.FoodCarb != 0){this.FoodBarCarb = this.counts.FoodCarb / this.ToTalNutrients}
      if(this.counts.FoodProtein != 0){this.FoodBarProtein = this.counts.FoodProtein / this.ToTalNutrients}
      if(this.counts.FoodVegetable != 0){this.FoodBarVegetable = this.counts.FoodVegetable / this.ToTalNutrients}

    },
  },
  setup(){
    const keywords = ref("");
    const change  = () => {
    }
    return {
      keywords,
      change,
    };
  },
  updated() {
    let strDateY = new Date().getFullYear()
    let strDateM = new Date().getMonth()
    let strDateD = new Date().getDate()
    this.DateN = strDateY.toString() + strDateM.toString() + strDateD.toString()
    this.LoadFoodPereDay()
  }
}
</script>

<style scoped>

</style>