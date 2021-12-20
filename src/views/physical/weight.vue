<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1> น้ำหนักตัว</h1>
                <h4>Body Weight</h4>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
             <ion-item>
               <ion-label position="floating">Date</ion-label>
               <ion-datetime :max="measureDate" display-format="MMM DD, YYYY" v-model="measureDate"></ion-datetime>
             </ion-item>
             <ion-item lines="full">
               <ion-label position="floating">Weight in kilogram</ion-label>
               <ion-input type="number" placeholder="99.5" v-model="newWeight"></ion-input>
             </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" color="success" @click="savedata">Save</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h3>Recents</h3>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item v-for="weightrecord in lstWeight.slice(0, 5)" :key="weightrecord.id">
                <label>Date {{ weightrecord.weightdate.toDate().toLocaleString() }}
                  <p>
                    น้ำหนัก {{ weightrecord.weight}} kg
                  </p>
                </label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'Health' })">
          <ion-icon :icon="arrowBackCircle"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import { arrowBackCircle } from 'ionicons/icons';
import { Timestamp,collection,addDoc } from '@firebase/firestore';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonLabel,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCol,
  IonText,
  IonButton,
  IonList,
  IonDatetime,
  IonItem
} from '@ionic/vue';
import {db} from "@/firebase";
import {mapState} from "vuex";
import {doc, getDocs, orderBy, query, updateDoc, where, limit} from "firebase/firestore";
export default {
  name: "weight",
  components :{
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonLabel,
    IonInput,
    IonFab,
    IonCol,
    IonText,
    IonButton,
    IonList,
    IonItem,
    IonIcon,
    IonFabButton,
    IonDatetime
  },
  data(){
    return {
      newWeight: null,
      lstWeight: [],
      measureDate: new Date().toISOString(),
    }
  },
  setup () {
    return {
      arrowBackCircle,
    }
  },
  computed: {
    ...mapState(['user', 'currentWeight']),
    DateN () {
      let mDate = new Date(this.measureDate)
      let month = mDate.getMonth() + 1
      return mDate.getFullYear().toString() + month + mDate.getDate().toString()
    },
    isSavable () {
      return this.newWeight != null
    }
  },
  watch:{
    DateN: async function (newValue,oldValue) {
       await this.loadWeight(newValue, oldValue)
    }
  },
  methods:{
    async loadWeight(){
      this.lstWeight = []
      let ref = collection(db, 'weight')
      let q = query(ref, where("userId", "==", this.user.userId),
          orderBy('weightdate','desc'), limit(5))
      let querySnapshot = await getDocs(q)
      const self = this
      querySnapshot.forEach(d => {
        let data = d.data()
        data.id = d.id
        self.lstWeight.push(data)
      })
    },
    async savedata() {
      const ref = collection(db, 'weight')
      let q = query(ref, where("userId", "==", this.user.userId),
          where("datetxt", "==",this.DateN),
          orderBy('weightdate','desc'))
      let querySnap = await getDocs(q)
      if (querySnap.empty) {
        let data ={
          userId: this.user.userId,
          weightdate: Timestamp.fromDate(new Date(this.measureDate)),
          datetxt: this.DateN,
          weight: this.newWeight
        }
        addDoc(ref, data).then((docRef)=> {
          data.id = docRef.id
          this.$store.dispatch('updateWeight',this.newWeight)
        })
      } else {
        querySnap.forEach(d => {
          let docRef = doc(db, 'weight', d.id)
          let updateWeight = {
            weight: this.newWeight
          }
          updateDoc(docRef, updateWeight).then(() => {
            this.$store.dispatch('updateWeight', this.newWeight)
          })
        })
      }
      await this.loadWeight()
    }
  },
  mounted() {
    this.newWeight = this.currentWeight
    this.loadWeight()
  }
}
</script>

<style scoped>

</style>