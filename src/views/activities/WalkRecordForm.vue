<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Walk Record</h1>
            </ion-text>
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
              <ion-item>
                <ion-label position="floating">End</ion-label>
                <ion-datetime display-format="MMM DD, YYYY HH:mm" v-model="endDateTime"></ion-datetime>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Steps</ion-label>
                <ion-input type="number" min="1" step="1" v-model="steps" placeholder="จำนวนก้าวโดยประมาณ"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Distance (km)</ion-label>
                <ion-input type="number" min="0.1" step="0.1" v-model="distance" placeholder="ระยะทางหน่วยกิโลเมตร"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Calculated calories</ion-label>
                <ion-input readonly :value="estimatedCal"></ion-input>
              </ion-item>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">Calories (cal)</ion-label>
                <ion-input type="number" min="0" step="100" v-model="calories" placeholder="แคลอรีที่เผาผลาญโดยประมาณ"></ion-input>
              </ion-item>
              <ion-item lines="none">
                <ion-label>
                  Intensity <ion-icon :icon="helpCircleOutline" @click="presentAlert"></ion-icon>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-range v-model="intensity" pin="true" min="1" max="3" ticks="true" snaps="true">
                  <ion-label slot="start">1</ion-label>
                  <ion-label slot="end">3</ion-label>
                </ion-range>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" color="success" @click="saveData">
              Save
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonIcon, alertController,
} from '@ionic/vue';

import { helpCircleOutline } from 'ionicons/icons'
import {defineComponent} from 'vue';
import { db } from '../../firebase'
import { collection, addDoc } from '@firebase/firestore'

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
  },
  setup () {
    return {
      helpCircleOutline,
    }
  },
  data () {
    return {
      startDateTime: new Date().toISOString(),
      endDateTime: new Date().toISOString(),
      distance: 0,
      steps: 0,
      calories: 0,
      intensity: 1,
    }
  },
  computed: {
    estimatedCal () {
      let end = new Date(this.endDateTime)
      let start = new Date(this.startDateTime)
      let delta = end - start
      return (delta / 60000) * 5.23 * this.intensity
    }
  },
  methods: {
    clearForm () {
      const self = this
      self.startDateTime = new Date().toISOString()
      self.endDateTime = new Date().toISOString()
      self.distance = 0
      self.steps = 0
      self.calories = 0
      self.intensity = 1
    },
    async presentAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'Intensity Description',
            subHeader: 'คำอธิบายระดับความหนัก',
            message: '1 หมายถึงเบา พูดได้ปกติ<br>2 หมายถึงปานกลาง พูดได้ติดขัด<br>3 หมายถึงหนัก แทบพูดไม่ได้เลย',
            buttons: ['OK'],
          });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },
    saveData () {
      const self = this
      // TODO: add start, end datetime validation
      if ((self.startDateTime != '' || self.startDateTime != null)
          && (self.endDateTime != '' || self.endDateTime != null)) {
        const ref = collection(db, 'activity_records')
        addDoc(ref, {
          userId: 'mumthealthtest',
          startDateTime: new Date(self.startDateTime),
          endDateTime: new Date(self.endDateTime),
          distance: self.distance,
          steps: self.steps,
          calories: self.calories,
          createdAt: new Date(),
          type: 'walking'
        }).then(()=>{
          self.clearForm()
          self.$router.back()
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
