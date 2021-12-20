<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1> น้ำหนักตัว </h1>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <label>{{ new Date().toLocaleDateString() }}</label>
        </ion-row>
        <ion-row>
         <ion-list>
           <ion-item>
             <ion-label> weight </ion-label>
             <ion-input type="number" placeholder="99.5" v-model="newWeight"></ion-input>
             <ion-label> kg </ion-label>
           </ion-item>
         </ion-list>
        </ion-row>
          <ion-button expand="block" color="success" @click="savedata">Save</ion-button>
      </ion-grid>
      <ion-list>
        <ion-item v-for="weightrecord in lstWeight.slice(0, 5)" :key="weightrecord.id">
          <label>Date {{ weightrecord.weightdate.toDate().toLocaleString() }}
            <p>
              น้ำหนัก {{ weightrecord.weight}} kg
            </p>
          </label>
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
  IonCol,
  IonText,
  IonButton,
  IonList,
  IonItem
} from '@ionic/vue';
import {db} from "@/firebase";
import {mapState} from "vuex";
import {doc, getDocs, orderBy, query, updateDoc, where} from "firebase/firestore";
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
    IonItem
  },
  data(){
    return {
      DateNow: "",
      DateN: "",
      newWeight: null,
      lstWeight: []
    }
  },
  setup () {
    return {
      arrowBackCircle,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch:{
    DateN: async function (newValue,oldValue) {
       this.loadWeight(newValue,oldValue)
    }
  },
  methods:{
    async loadWeight(){
      let ref = collection(db, 'weight')
      let q = query(ref, where("userId", "==", this.$store.state.user.userId),
          orderBy('weightdate','desc'))
      let querySnapshot = await getDocs(q)
      const self = this
      querySnapshot.forEach(d => {
        let data = d.data()
        data.id = d.id
        self.lstWeight.push(data)
      })
    },
    async savedata(){
      const ref = collection(db, 'weight')
      let q = query(ref, where("userId", "==", this.$store.state.user.userId), where("datetxt", "==",this.DateN),
          orderBy('weightdate','desc'))
      let querySnap = await getDocs(q)
      if (querySnap.empty) {
        let data ={
          userId: this.$store.state.user.userId,
          weightdate: Timestamp.fromDate(new Date()),
          datetxt: this.DateN,
          weight: this.newWeight
        }
        addDoc(ref, data).then((docRef)=> {
          data.id = docRef.id
          this.$store.dispatch('updateWeight',this.newWeight)
          console.log(this.newWeight)
        })}else {
        querySnap.forEach(d => {
          let docRef = doc(db, 'weight', d.id)
          let updateWeight = {
            userId: this.$store.state.user.userId,
            weightdate: Timestamp.fromDate(new Date()),
            datetxt: this.DateN,
            weight: this.newWeight
          }
          updateDoc(docRef, updateWeight).then(() => {
            this.$store.dispatch('updateWeight', this.newWeight)
          })
        })
      }
      this.lstWeight = []
      this.loadWeight()
      }

  },
  mounted() {
    let strDateY = new Date().getFullYear()
    let strDateM = new Date().getMonth()
    let strDateD = new Date().getDate()
    this.DateN = strDateY.toString() + strDateM.toString() + strDateD.toString()
    this.newWeight = this.$store.state.currentWeight
  }
}
</script>

<style scoped>

</style>