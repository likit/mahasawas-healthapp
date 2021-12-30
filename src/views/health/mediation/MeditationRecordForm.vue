<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-text>
                <h1>Meditation</h1>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list-header>
              <ion-text>
                <h3>
                  New record / รายการใหม่
                </h3>
              </ion-text>
            </ion-list-header>
            <ion-list>
              <ion-item>
                <ion-label position="floating">Start</ion-label>
                <ion-datetime display-format="MMM DD, YYYY HH:mm" v-model="startDateTime"></ion-datetime>
              </ion-item>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">Time (min)</ion-label>
                <ion-input type="number" min="0" step="100" v-model="min" placeholder="เวลาหน่วยเป็นนาที"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Distraction</ion-label>
                <ion-input type="number" min="1" step="1" v-model="distraction" placeholder="จำนวนครั้งที่ฟุ้งซ่าน"></ion-input>
              </ion-item>
              <ion-item lines="none">
                <ion-label>
                  Mindfulness level<ion-icon :icon="helpCircleOutline"></ion-icon>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-range v-model="mindfullness" pin="true" min="1" max="5" ticks="true" snaps="true">
                  <ion-label slot="start">1</ion-label>
                  <ion-label slot="end">5</ion-label>
                </ion-range>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button :disabled="!isFormValid" expand="block" color="success" @click="saveData">
              Save
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'MeditationRecord' })">
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
  IonInput,
  IonDatetime,
  IonList,
  IonItem,
  IonButton,
  IonListHeader,
  IonLabel,
  IonRange,
  IonFab,
  IonFabButton,
  IonIcon, toastController,
} from '@ionic/vue';

import { helpCircleOutline, arrowBackCircle } from 'ionicons/icons'
import { defineComponent } from 'vue';
import { db } from '../../../firebase'
import { collection, addDoc, Timestamp } from '@firebase/firestore'

export default defineComponent({
  name: "WalkRecordForm",
  components: {
    IonIcon,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonInput,
    IonDatetime,
    IonList,
    IonItem,
    IonButton,
    IonListHeader,
    IonLabel,
    IonRange,
    IonFab,
    IonFabButton,
  },
  setup () {
    return {
      helpCircleOutline, arrowBackCircle
    }
  },
  data () {
    return {
      startDateTime: new Date().toISOString(),
      min: 0,
      mindfullness: 1,
      distraction: 0,
    }
  },
  computed: {
    isFormValid () {
      return (this.startDateTime != '' || this.startDateTime != null)
          && (this.min != '' || this.min != null)
          && (this.distraction >= 0)
    }
  },
  methods: {
    async openToast() {
      const toast = await toastController
          .create({
            color: "dark",
            message: 'เพิ่มรายการใหม่เรียบร้อยแล้ว',
            duration: 2000
          })
      return toast.present();
    },
    saveData () {
      if (this.isFormValid) {
        const ref = collection(db, 'meditation_records')
        let data = {
          userId: this.$store.state.user.userId,
          startDateTime: Timestamp.fromDate(new Date(this.startDateTime)),
          min: this.min,
          mindfullness: this.mindfullness,
          distraction: this.distraction,
          createdAt: Timestamp.fromDate(new Date()),
        }
        addDoc(ref, data).then(async (docRef) => {
          data.id = docRef.id
          this.$store.dispatch('insertMeditation', data)
          await this.openToast()
          this.$router.push({name: 'MeditationRecord'})
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
