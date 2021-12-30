<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-text>
                <h1>Goal Setting</h1>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list-header>
              <ion-text>
                <h3>
                  New goal / เป้าหมายใหม่
                </h3>
              </ion-text>
            </ion-list-header>
            <ion-list>
              <ion-item>
                <ion-label position="floating">Deadline</ion-label>
                <ion-datetime display-format="MMM DD, YYYY HH:mm" v-model="deadline" :max="maxDate"></ion-datetime>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Steps</ion-label>
                <ion-input type="number" min="1" step="1" v-model="steps" placeholder="จำนวนก้าวโดยประมาณ"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Distance (km)</ion-label>
                <ion-input type="number" min="0.1" step="0.1" v-model="distance" placeholder="ระยะทางหน่วยกิโลเมตร"></ion-input>
              </ion-item>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">Calories (cal)</ion-label>
                <ion-input type="number" min="0" step="100" v-model="calories" placeholder="แคลอรีที่เผาผลาญโดยประมาณ"></ion-input>
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
        <ion-fab-button @click="$router.push({ name: 'Exercise' })">
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
  IonFabButton,
  IonFab,
  IonIcon,
  toastController
} from '@ionic/vue';

import { helpCircleOutline, arrowBackCircle } from 'ionicons/icons'
import { defineComponent } from 'vue';
import { db } from '../../firebase'
import { collection, addDoc, Timestamp } from '@firebase/firestore'

export default defineComponent({
  name: "WalkRecordGoalForm",
  components: {
    IonFabButton,
    IonFab,
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
  },
  setup () {
    return {
      helpCircleOutline,
      arrowBackCircle,
    }
  },
  data () {
    return {
      deadline: new Date().toISOString(),
      maxDate: new Date().getFullYear() + 1,
      distance: 0,
      steps: 0,
      calories: 0,
    }
  },
  computed: {
    isFormValid () {
      return (this.deadline != '' || this.deadline != null)
          && (this.steps > 0 || this.distance > 0)
          && (new Date(this.deadline).getTime() > new Date().getTime())
    }
  },
  methods: {
    async openToast() {
      const toast = await toastController
          .create({
            color: "dark",
            message: 'Your new goal has been set!',
            duration: 2000
          })
      return toast.present();
    },
    saveData () {
      if (this.isFormValid) {
        const ref = collection(db, 'goals')
        let data = {
          userId: this.$store.state.user.userId,
          deadline: Timestamp.fromDate(new Date(this.deadline)),
          distance: parseFloat(this.distance),
          steps: parseInt(this.steps),
          calories: parseFloat(this.calories),
          createdAt: Timestamp.fromDate(new Date()),
          type: 'walking',
          exerType: 'Cardio',
          achieved: false,
          cum_distance: 0,
          cum_steps: 0,
          cum_calories: 0,
        }
        addDoc(ref, data).then(async (docRef) => {
          data.id = docRef.id
          this.$store.dispatch('addGoal', data)
          await this.openToast()
          this.$router.push({name: 'WalkRecord'})
        })
      }
    }
  }
})
</script>

<style scoped>

</style>