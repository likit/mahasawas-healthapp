<template>
<ion-page>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-text>
            <h1>Walk Record</h1>
            <p>{{ this.user.displayName }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-list>
            <ion-item detail v-for="record in records" :key="record.id" @click="goToDetail(record.id)">
              <ion-label>
                {{ record.startDateTime.toDate().toLocaleString() }}
                <p>
                  Distance {{ record.distance }} km
                </p>
                <p>
                  Steps {{ record.steps }}
                </p>
                <p>
                  Est. calories {{ ((record.endDateTime - record.startDateTime) / 60) * 5.23 }}
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
    <ion-fab vertical="bottom" horizontal="center" slot="fixed">
      <ion-fab-button @click="$router.push({ name: 'Home' })">
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
import { db } from '../../firebase'
import { arrowBackCircle } from 'ionicons/icons'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import {mapState} from "vuex";

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
    }
  },
  data () {
    return {
      records: []
    }
  },
  computed: {
    ...mapState(['profile', 'user'])
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'WalkRecordDetail', params: { recordId: recordId}})
    }
  },
  async mounted () {
    const ref = collection(db, 'activity_records')
    const q = query(ref,
        where('userId', '==', this.$store.state.user.userId),
        where("type", "==", "walking"),
        orderBy('startDateTime', 'desc'))
    const querySnapshot = await getDocs(q)
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