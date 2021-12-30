<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h2>Weight Training Record</h2>
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
                <h3>Muscle</h3>
              </ion-item>
              <ion-item>
                <ion-list>
                  <ion-item>
                    <ion-checkbox slot="start" v-model="chest"></ion-checkbox>
                    <ion-label>Chest</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-checkbox slot="start" v-model="deltoids"></ion-checkbox>
                    <ion-label>Deltoids</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-checkbox slot="start" v-model="muscleback"></ion-checkbox>
                    <ion-label>Back</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-checkbox slot="start" v-model="legsandCalf"></ion-checkbox>
                    <ion-label>Legs and Calf</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-checkbox slot="start" v-model="bicepsAndTriceps"></ion-checkbox>
                    <ion-label>Biceps and Triceps  </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-checkbox slot="start" v-model="abdominal"></ion-checkbox>
                    <ion-label>Abdominal</ion-label>
                  </ion-item>
                </ion-list>
              </ion-item>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">Weight Using (kg)</ion-label>
                <ion-input type="text" v-model="weightusing" placeholder="น้ำหนักที่ใช้หน่วยเป็นกิโลกรัม"></ion-input>
              </ion-item>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">Repetition</ion-label>
                <ion-input type="number" min="0" step="100" v-model="reps" placeholder="จำนวนครั้งที่ทำได้"></ion-input>
              </ion-item>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">SET</ion-label>
                <ion-input type="number" min="0" step="100" v-model="countset" placeholder="จำนวนชุด"></ion-input>
              </ion-item>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">Time (min)</ion-label>
                <ion-input type="number" min="0" step="100" v-model="min" placeholder="ใช้เวลาทั้งหมด(นาที)"></ion-input>
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
            <ion-button :disabled="!isFormValid" expand="block" color="success" @click="saveData">
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
  IonCheckbox
} from '@ionic/vue';

import { helpCircleOutline } from 'ionicons/icons'
import { defineComponent } from 'vue';
import { db } from '../../firebase'
import { collection, addDoc, Timestamp } from '@firebase/firestore'

export default defineComponent({
  name: "WeightTrainingRecordForm",
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
    IonCheckbox
  },
  setup () {
    return {
      helpCircleOutline,
    }
  },
  data () {
    return {
      startDateTime: new Date().toISOString(),
      weightusing : '',
      min: 0,
      reps: 0,
      countset: 0,
      calories: 0,
      intensity: 1,
      chest: false,
      deltoids: false,
      muscleback: false,
      legsandCalf: false,
      bicepsAndTriceps: false,
      abdominal: false,
      muscle:[]
    }
  },
  computed: {
    isFormValid () {
      return (this.startDateTime != '' || this.startDateTime != null)
          && (this.min != 0 || this.min != null)
          && (this.estimatedCal > 0)
    },
    estimatedCal () {
      let Cainten = 1
      if( this.intensity == 2){Cainten = 1.5}
      if( this.intensity == 2){Cainten = 2}
      return (this.min * 90) / 30 * Cainten
    },
  },
  methods: {
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
      if(this.chest==true){this.muscle.push('Chest')}
      if(this.deltoids==true){this.muscle.push('Deltoids')}
      if(this.muscleback==true){this.muscle.push('Back')}
      if(this.legsandCalf==true){this.muscle.push('Legs and Calf')}
      if(this.bicepsAndTriceps==true){this.muscle.push('Biceps and Triceps')}
      if(this.abdominal==true){this.muscle.push('Abdominal')}

      if (this.isFormValid) {
        const ref = collection(db, 'activity_records')
        let data = {
          userId: this.$store.state.user.userId,
          startDateTime: Timestamp.fromDate(new Date(this.startDateTime)),
          muscle: this.muscle,
          weightusing: this.weightusing,
          reps: this.reps,
          countset: this.countset,
          min: this.min,
          calories: this.calories,
          estimatedCalories: this.estimatedCal,
          createdAt: Timestamp.fromDate(new Date()),
          type: 'weightTraining',
          exerType: 'Resistance'
        }
        addDoc(ref, data).then((docRef)=>{
          data.id = docRef.id
          this.$store.dispatch('insertActivity',  data)
          this.$router.push({ name: 'WeightTrainingRecord' })
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
