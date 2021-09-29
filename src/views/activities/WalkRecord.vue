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
          <ion-list>
            <ion-item detail v-for="record in records" :key="record.id">
              <ion-label>
                {{ record.startDateTime.toDate().toLocaleString() }}
                <p>
                  Distance {{ record.distance }} km, Steps {{ record.steps }}
                </p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" href="/activities/walk-record-form">
            Add
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
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'

export default defineComponent({
  name: "WalkRecord",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  },
  data () {
    return {
      records: []
    }
  },
  async mounted () {
    const ref = collection(db, 'activity_records')
    const querySnapshot = await getDocs(ref)
    querySnapshot.forEach(d=>{
      let data = d.data()
      data.id = d.id
      this.records.push(data)
    })
  }
})
</script>

<style scoped>

</style>