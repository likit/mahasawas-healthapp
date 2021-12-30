<template>
<ion-page>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-text>
            <div class="ion-text-center">
              <h2>Meditation</h2>
            </div>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="$router.push({ name: 'MeditationRecordForm' })">
            Add
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <div class="ion-text-center">
            <h3>รายการล่าสุด</h3>
          </div>
          <ion-list>
            <ion-item v-for="record in meditation_records.slice(0, 7)" :key="record.id">
              <ion-label>
                {{ record.startDateTime.toDate().toLocaleString() }}
                <p>
                  Mindfulness level: {{ record.mindfullness }}
                </p>
              </ion-label>
            </ion-item>
          </ion-list>
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
  IonButton,
  IonList,
  IonItem,
  IonFabButton,
  IonFab,
  IonLabel,
  IonIcon,
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { arrowBackCircle, addOutline, golfOutline } from 'ionicons/icons'
import {mapState} from "vuex";
import {collection, getDocs, query, where, limit, orderBy} from "@firebase/firestore";
import {db} from "../../../firebase";

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
    ...mapState(['meditation_records']),
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'WalkRecordDetail', params: { recordId: recordId}})
    },
    async loadData() {
      const ref = collection(db, 'meditation_records')
      const qSnapshot = await getDocs(query(ref,
          where('userId', '==', this.$store.state.user.userId),
          orderBy('startDateTime', 'desc'),
          limit(10)
      ))
      for (let m of qSnapshot.docs) {
        let data = m.data()
        data.id = m.id
        this.$store.dispatch('addMeditation', data)
      }
    },
  },
  mounted() {
    this.loadData()
  }
})
</script>

<style scoped>

</style>