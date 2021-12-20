<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1>Food</h1>
                <p>สัดส่วนการทานอาหาร</p>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
              <h3>Daily Ratio</h3>
              <p>Carbohydrate</p>
              <ion-progress-bar :value="foodBarCarb"></ion-progress-bar>
              <p>Protein</p>
              <ion-progress-bar :value="foodBarProtein"></ion-progress-bar>
              <p>Vegetable</p>
              <ion-progress-bar :value="foodBarVegetable"></ion-progress-bar>
              <p>Total {{ counts.foodCal }} kCal</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h4>สัดส่วนมื้ออาหาร</h4>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item>
                <ion-label position="floating">ชื่อเมนูอาหาร</ion-label>
                <ion-input placeholder="dish name" v-model="dishName"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">วันที่ / Date</ion-label>
                <ion-datetime display-format="MMM DD, YYYY HH:mm"
                              v-model="foodDateTime">
                </ion-datetime>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item v-for="FoodRec in foodData" :key="FoodRec.id">
                <label>ชื่ออาหาร {{ dishName }}
                </label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="8">
            <ion-label>Carb เช่น ข้าว/แป้ง/น้ำตาล</ion-label>
          </ion-col>
          <ion-col>
            <ion-label>{{ foodCarb }} ส่วน</ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-range  min="0" max="5"
                        :value="foodCarb"
                        @ionChange="changeCarbRatio($event.target.value)"
                        step="1" ticks="true" snaps="true" color="warning">
            </ion-range>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="8">
            <ion-label>Protein เช่น เนื้อสัตว์/ถั่ว/เห็ด</ion-label>
          </ion-col>
          <ion-col>
            <ion-label>{{ foodProtein }} ส่วน</ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-range  min="0" max="5"
                        :value="foodProtein"
                        @ionChange="changeProteinRatio($event.target.value)"
                        step="1" ticks="true"
                        snaps="true" color="secondary">
            </ion-range>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="8">
            <ion-label>Vegetable เช่น ผักสีต่าง ๆ</ion-label>
          </ion-col>
          <ion-col>
            <ion-label>{{ foodVegetable }} ส่วน</ion-label>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-range  min="0" max="5"
                        :pin="true"
                        :value="foodVegetable"
                        @ionChange="changeVegetableRatio($event.target.value)"
                        step="1" ticks="true"
                        snaps="true" color="success">
            </ion-range>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Energy (kCal)</ion-label>
              <ion-input type="number" placeholder="100" v-model="foodCal"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Quantity (ฝ่ามือ)</ion-label>
              <ion-input type="number" placeholder="1" v-model="foodQuantity"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button :disabled="!isFormValid"
                        expand="block" color="success"
                        @click="saveData">เพิ่มรายการ
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list>
        <ion-item v-for="foodPerDayRecord in foodPerDay.slice(0,3)" :key="foodPerDayRecord.id">
          <ion-label>
            <p>
              {{ foodPerDayRecord.createdAt.toDate().toLocaleString() }}
            </p>
            <h3>
              {{ foodPerDayRecord.foodName}}
              {{ foodPerDayRecord.foodCal}} kCal
              {{ foodPerDayRecord.foodQuantity }} ฝ่ามือ
            </h3>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-text>
            <p>
              เนื้อสัตว์ 1 ฝ่ามือ ประมาณ 85-100 กรัม
            </p>
            <p>
              ข้าว 1 ฝ่ามือ/ถ้วย ประมาณ 80 กรัม
            </p>
          </ion-text>
        </ion-item>
      </ion-list>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'Health' })">
          <ion-icon :icon="arrowBackCircle"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonList,
  IonItem,
  IonButton,
  IonRange,
  IonDatetime,
  IonInput,
  IonProgressBar,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/vue';
import { arrowBackCircle } from 'ionicons/icons'
import {db} from "@/firebase";
import { collection, addDoc, Timestamp, getDocs, query, where } from '@firebase/firestore'
import {orderBy} from "firebase/firestore";
import {mapGetters} from "vuex";
export default {
  name: "FoodSearch",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonList,
    IonItem,
    IonButton,
    IonRange,
    IonDatetime,
    IonInput,
    IonProgressBar,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  data(){
    return{
      foodData: [],
      foodPerDay:[],
      dishName: null,
      foodDateTime: new Date().toISOString(),
      foodCarb: 0,
      foodProtein: 0,
      foodVegetable: 0,
      foodQuantity: 0,
      foodCal: 0,
      counts:{
        foodCarb: 0,
        foodProtein: 0,
        foodVegetable: 0,
        foodCal: 0
      },
      foodBarCarb: 0,
      foodBarProtein: 0,
      foodBarVegetable: 0,
      totalNutrients: 0
    }
  },
  computed:{
    isFormValid () {
      return 0 < this.foodRatio <= 5 && this.dishName !== ''
    },
    foodRatio () {
      return this.foodProtein + this.foodCarb + this.foodVegetable
    },
    dateN () {
      let strDateY = new Date().getFullYear()
      let strDateM = new Date().getMonth() + 1
      let strDateD = new Date().getDate()
      return strDateY.toString() + strDateM.toString() + strDateD.toString()
    },
    ...mapGetters(['userId'])
  },
  watch:{
    foodDateTime: async  function(){
      await this.loadFoodPerDay()
    },
  },
  methods:{
    changeProteinRatio (value) {
      if (value + this.foodCarb + this.foodVegetable <= 5) {
        this.foodProtein = value
      }
    },
    changeCarbRatio (value) {
      if (value + this.foodProtein + this.foodVegetable <= 5) {
        this.foodCarb = value
      }
    },
    changeVegetableRatio (value) {
      if (value + this.foodProtein + this.foodCarb <= 5) {
        this.foodVegetable = value
      }
    },
    async saveData(){
      let data ={
        userId: this.userId,
        foodName : this.dishName,
        foodCarb : this.foodCarb,
        foodProtein : this.foodProtein,
        foodVegetable : this.foodVegetable,
        foodCal: this.foodCal,
        foodQuantity: this.foodQuantity,
        createdAt: Timestamp.fromDate(new Date()),
        dateCode: this.dateN
      }
      let ref = collection(db, 'food')
      let q = query(ref, where("FoodName", "==", this.dishName))
      let querySnapshot = await getDocs(q)
      if (querySnapshot.empty){
        addDoc(ref, data).then((docRef)=>{
          data.id = docRef.id
        })
      }
      if (this.isFormValid) {
        let ref = collection(db, 'food_records')
        addDoc(ref, data).then((docRef)=>{
          data.id = docRef.id
        })
      }
      await this.loadFoodPerDay()
    },
    async loadFoodPerDay(){
      let ref = collection(db, 'food_records')
      let q = query(ref, where("userId", "==", this.userId),
          where('dateCode', '==', this.dateN),
          orderBy('createdAt','desc'))
      let querySnapshot = await getDocs(q)
      this.dishName = null
      this.counts.foodCal = 0
      this.counts.foodCarb = 0
      this.counts.foodProtein = 0
      this.counts.foodVegetable = 0
      this.totalNutrients = 0
      this.foodPerDay = []
      querySnapshot.forEach(d => {
        let data = d.data()
        data.id = d.id
        this.foodPerDay.push(data)
        this.counts.foodCal += parseInt(data.foodCal) * parseInt(data.foodQuantity)
        this.counts.foodCarb += parseInt(data.foodCarb)
        this.counts.foodProtein += parseInt(data.foodProtein)
        this.counts.foodVegetable += parseInt(data.foodVegetable)
        this.totalNutrients += this.counts.foodCarb
        this.totalNutrients += this.counts.foodProtein
        this.totalNutrients += this.counts.foodVegetable
      })
      if (this.totalNutrients > 0) {
        this.foodBarCarb = (this.counts.foodCarb / this.totalNutrients)
        this.foodBarProtein = (this.counts.foodProtein / this.totalNutrients)
        this.foodBarVegetable = (this.counts.foodVegetable / this.totalNutrients)
      }
    },
  },
  setup(){
    return {
      arrowBackCircle
    };
  },
  mounted () {
    this.loadFoodPerDay()
  }
}
</script>

<style scoped>

</style>