<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Milestones</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item>
                <ion-label>
                  <p>
                    Total Time
                  </p>
                  <p>
                    {{ totalTime }} mins
                  </p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label>
                  <p>
                    Total Steps
                  </p>
                  <p>
                    {{ totalSteps }} steps
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
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
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

export default defineComponent({
  name: "Milestone",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonList,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      records: [],
    }
  },
  computed: {
    totalTime () {
      let total = 0
      this.records.forEach(rec=>{
        let mins = (rec.endDateTime - rec.startDateTime) / 60
        total = total + mins
      })
      return total
    },
    totalSteps () {
      let total = 0
      this.records.forEach(rec=>{
        if (rec.type=='walking') {
          total = total + parseInt(rec.steps)
        }
      })
      return total
    }
  },
  async mounted() {
    const self = this
    const ref = collection(db, 'activity_records')
    const querySnapshot = await getDocs(ref)
    querySnapshot.forEach(d=>{
      let data = d.data()
      data.id = d.id
      self.records.push(data)
    })
  }
})
</script>

<style scoped>

</style>
