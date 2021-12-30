<template>
<ion-page>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-text>
            <div class="ion-text-center">
              <h1>Mood Record</h1>
            </div>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="$router.push({ name: 'MoodRecordForm' })">
            Add
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <canvas id="moodChart"></canvas>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <div class="ion-text-center">
            <h3>รายการล่าสุด</h3>
          </div>
          <ion-list>
            <ion-item detail v-for="record in mood_records.slice(0, 7)"
                      :key="record.id" @click="goToDetail(record.id)">
              <ion-label>
                {{ record.startDateTime.toDate().toLocaleString() }}
                <p>
                  You felt {{ feeling_levels[record.feeling] }}.
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
import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

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
  data () {
    return {
      feeling_levels: {
        1: 'very sad',
        2: 'sad',
        3: 'neutral',
        4: 'good',
        5: 'fantastic'
      },
      chart: null
    }
  },
  computed: {
    ...mapState(['mood_records']),
  },
  watch : {
    'mood_records.length': function () {
      let labels = []
      let datasets = []
      if (this.chart != null) {
        this.chart.destroy()
      }
      this.mood_records.forEach(data=>{
        datasets.unshift(data.feeling)
        labels.unshift(data.startDateTime.toDate().toLocaleString())
      })
      this.createChart(datasets, labels, 'Feeling level', 'rgb(38,194,129)')

    }
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'MoodRecordDetail', params: { recordId: recordId}})
    },
    createChart(datasets, labels, label, bgColor) {
      let ctx = document.getElementById('moodChart')
      this.chart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: datasets,
            backgroundColor: bgColor, // array should have same number of elements as number of dataset
            borderColor: bgColor,// array should have same number of elements as number of dataset
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          lineTension: .3,
          pointRadius: 4,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    },
    async loadData() {
      const ref = collection(db, 'mood_records')
      const qSnapshot = await getDocs(query(ref,
          where('userId', '==', this.$store.state.user.userId),
          orderBy('startDateTime', 'desc'),
          limit(10)
      ))
      for (let m of qSnapshot.docs) {
        let data = m.data()
        data.id = m.id
        this.$store.dispatch('addMood', data)
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