<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1>Goals</h1>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text v-if="goals.length == 0">
            <div class="ion-text-center">
              <h5>ยังไม่มีเป้าหมายใหม่</h5>
              <h5>Please set a new challenging goal.</h5>
            </div>
            </ion-text>
            <ion-list v-else>
              <ion-item v-for="goal in goals" :key="goal.id">
                <ion-label>
                  {{ goal.deadline.toDate().toLocaleString() }}
                  <p>
                    {{ goal.type }}:
                    {{ goal.steps }} steps,
                    {{ goal.min}} min,
                    {{ goal.calories.toFixed(1) }} Cal,
                    {{ goal.distance }} km.
                  </p>
                </ion-label>
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
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonList,
  IonItem,
  IonFabButton,
  IonFab,
  IonLabel,
  IonIcon,
} from '@ionic/vue';

import { db } from '../firebase'
import { arrowBackCircle, addOutline, golfOutline } from 'ionicons/icons'
import {collection, getDocs, where, query} from "@firebase/firestore";
import {mapState} from "vuex";

export default {
  name: "Goals",
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
    IonFabButton,
    IonFab,
    IonIcon,
  },
  setup () {
    return {
      arrowBackCircle,
      golfOutline,
      addOutline
    }
  },
  computed: {
    ...mapState(['goals'])
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'WalkRecordDetail', params: { recordId: recordId}})
    },
    async loadGoals() {
      const ref = collection(db, 'goals')
      const qSnapshot = await getDocs(query(ref,
          where('achieved', '==', false),
          where('userId', '==', this.$store.state.user.userId)
      ))
      for (let goal of qSnapshot.docs) {
        let data = goal.data()
        data.id = goal.id
        this.goals.push(data)
      }
    }
  },
  mounted() {
    this.loadGoals()
  }
}
</script>

<style scoped>

</style>