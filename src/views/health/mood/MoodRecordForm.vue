<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-text>
                <h1>Mood</h1>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list-header>
              <ion-text>
                <h3>
                  How are you feeling? / ความรู้สึกในขณะนี้
                </h3>
              </ion-text>
            </ion-list-header>
            <ion-list>
              <ion-item class="ion-margin-bottom">
                <ion-label position="floating">Reason / สาเหตุ</ion-label>
                <ion-textarea v-model="reason" placeholder="อธิบายเหตุผลคร่าว ๆ"></ion-textarea>
              </ion-item>
              <ion-item lines="none">
                <ion-label>
                  ระดับแย่ถึงดีที่สุด
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-range v-model="feeling" pin="true" min="1" max="5" ticks="true" snaps="true">
                  <ion-label slot="start">1</ion-label>
                  <ion-label slot="end">5</ion-label>
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
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'MoodRecord' })">
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
  IonTextarea,
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
    IonTextarea,
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
      feeling: 1,
      reason: '',
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
      const ref = collection(db, 'mood_records')
      let data = {
        userId: this.$store.state.user.userId,
        startDateTime: Timestamp.fromDate(new Date()),
        feeling: parseInt(this.feeling),
        reason: this.reason,
        createdAt: Timestamp.fromDate(new Date()),
      }
      addDoc(ref, data).then(async (docRef) => {
        data.id = docRef.id
        this.$store.dispatch('insertMood', data)
        await this.openToast()
        this.$router.push({name: 'MoodRecord'})
      })
    }
  }
})
</script>

<style scoped>

</style>
