<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1>ส่วนสูง</h1>
                <h4>Height</h4>
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
                <ion-label position="floating">ส่วนสูงหน่วยเซ็นติเมตร</ion-label>
                <ion-input type="number" placeholder="159" v-model="newHeight"></ion-input>
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
              <ion-item v-for="heightrecord in lstHeight.slice(0, 1)" :key="heightrecord.id">
                <label>Date {{ heightrecord.date.toDate().toLocaleString() }}
                  <p>
                    น้ำหนัก {{ heightrecord.height}} cm
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
      newHeight: null,
      lstHeight: [],
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
      return this.newHeight != null
    }
  },
  watch:{
    DateN: async function (newValue,oldValue) {
      await this.loadHeight(newValue, oldValue)
    }
  },
  methods:{
    async loadHeight(){
      this.lstHeight = []
      let ref = collection(db, 'height')
      let q = query(ref, where("userId", "==", this.user.userId),
          orderBy('date','desc'), limit(5))
      let querySnapshot = await getDocs(q)
      querySnapshot.forEach(d => {
        let data = d.data()
        data.id = d.id
        this.lstHeight.push(data)
      })
    },
    async savedata() {
      const ref = collection(db, 'height')
      let q = query(ref, where("userId", "==", this.user.userId),
          where("datetxt", "==",this.DateN),
          orderBy('date','desc'))
      let querySnap = await getDocs(q)
      if (querySnap.empty) {
        let data ={
          userId: this.user.userId,
          date: Timestamp.fromDate(new Date(this.measureDate)),
          datetxt: this.DateN,
          height: this.newHeight
        }
        addDoc(ref, data).then((docRef)=> {
          data.id = docRef.id
          this.$store.dispatch('updateHeight',this.newHeight)
        })
      } else {
        querySnap.forEach(d => {
          let docRef = doc(db, 'height', d.id)
          let updateHeight = {
            height: this.newHeight
          }
          updateDoc(docRef, updateHeight).then(() => {
            this.$store.dispatch('updateHeight', this.newHeight)
          })
        })
      }
      await this.loadHeight()
    }
  },
  mounted() {
    this.newHeight = this.currentHeight
    this.loadHeight()
  }
}
</script>

<style scoped>

</style>
