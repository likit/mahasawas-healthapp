<template>
  <ion-page>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-text>
                <h1>ผลการตรวจสุขภาพ</h1>
                <p>ลากลงเพื่ออัพเดต</p>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Glucose
                  <ion-chip color="success" v-if="this.latestGlu < 110">
                    <ion-label>ผลล่าสุดอยู่ในช่วงปกติ</ion-label>
                  </ion-chip>
                  <ion-chip color="warning" v-else>
                    <ion-label>ผลล่าสุดเริ่มผิดปกติ ควรระวัง</ion-label>
                  </ion-chip>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <canvas id="GlucChart"></canvas>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Cholesterol
                  <ion-chip color="success" v-if="this.latestCHO < 200">
                    <ion-label>ผลล่าสุดอยู่ในช่วงปกติ</ion-label>
                  </ion-chip>
                  <ion-chip color="warning" v-else>
                    <ion-label>ผลล่าสุดเริ่มผิดปกติ ควรระวัง</ion-label>
                  </ion-chip>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <canvas id="CHOChart"></canvas>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Triglyceride
                  <ion-chip color="success" v-if="this.latestTG < 300">
                    <ion-label>ผลล่าสุดอยู่ในช่วงปกติ</ion-label>
                  </ion-chip>
                  <ion-chip color="warning" v-else>
                    <ion-label>ผลล่าสุดเริ่มผิดปกติ ควรระวัง</ion-label>
                  </ion-chip>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <canvas id="TGChart"></canvas>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'Health' })">
          <ion-icon :icon="arrowBackCircle"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="success" @click="$router.push({ name: 'LabRecordForm' })">
          <ion-icon :icon="addOutline"></ion-icon>
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonText,
  IonIcon,
  IonFab,
  IonFabButton,
  IonLabel,
  IonChip,
  IonCardTitle,
} from '@ionic/vue';
import {defineComponent, shallowRef } from 'vue';
import { Chart, registerables } from 'chart.js';
import { db } from '../../../firebase'
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore'
Chart.register(...registerables);
import 'chartjs-adapter-moment';
import {mapState} from "vuex";
import moment from 'moment';
moment.locale('th');
import { arrowBackCircle, addOutline, chevronUpCircleOutline, syncOutline } from 'ionicons/icons'
export default defineComponent({
  name: "LabRecord",
  components: {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonIcon,
    IonFab,
    IonFabButton,
    IonLabel,
    IonChip,
    IonCardTitle,
  },
  setup () {
    return {
      arrowBackCircle,
      addOutline,
      chevronUpCircleOutline,
      syncOutline
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      gluchart: null,
      chochart: null,
      tgchart: null,
      gluData: [],
      choData: [],
      tgData: [],
      latestGlu: null,
      latestCHO: null,
      latestTG: null,
    }
  },
  methods: {
    createChart(ctx, datasets, label, borderColor) {
      return shallowRef(new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: label,
            data: datasets,
            backgroundColor: borderColor, // array should have same number of elements as number of dataset
            borderColor: borderColor,// array should have same number of elements as number of dataset
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              unit: 'day'
            },
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
          lineTension: .3,
          pointRadius: 4,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      }));
    },
    async doRefresh(event) {
      let ref = collection(db, 'lab_records')
      let q = query(ref,
          where('userId', '==', this.user.userId),
          orderBy('labDateTime')
      )
      this.gluchart.data.datasets[0].data = []
      this.chochart.data.datasets[0].data = []
      this.tgchart.data.datasets[0].data = []
      let querySnapshot = await getDocs(q)
      querySnapshot.forEach((record) => {
        let data = record.data()
        console.log(moment(data.labDateTime.toDate()).format('YYYY-MM-DD'))
        if (data.labTest.labGlu !== null) {
          this.gluchart.data.datasets[0].data.push({
            y: parseFloat(data.labTest.labGlu),
            x: moment(data.labDateTime.toDate()).format('YYYY-MM-DD')
          })
          this.latestGlu = parseFloat(data.labTest.labGlu)
        }
        if (data.labTest.labCHO !== null) {
          this.chochart.data.datasets[0].data.push({
            y: parseFloat(data.labTest.labCHO),
            x: moment(data.labDateTime.toDate()).format('YYYY-MM-DD')
          })
          this.latestCHO = parseFloat(data.labTest.labCHO)
        }
        if (data.labTest.labTG !== null) {
          this.tgchart.data.datasets[0].data.push({
            y: parseFloat(data.labTest.labTG),
            x: moment(data.labDateTime.toDate()).format('YYYY-MM-DD')
          })
          this.latestTG = parseFloat(data.labTest.labTG)
        }
      })
      if (event) {
        event.target.complete()
      }
      this.gluchart.update()  // shallowRef must be use, or the maximum call stack will be exceeded.
      this.chochart.update()
      this.tgchart.update()
    }
  },
  async mounted() {
    let ref = collection(db, 'lab_records')
    let q = query(ref,
        where('userId', '==', this.user.userId),
        orderBy('labDateTime')
    )
    let querySnapshot = await getDocs(q)
    querySnapshot.forEach((record) => {
      let data = record.data()
      console.log(moment(data.labDateTime.toDate()).format('YYYY-MM-DD'))
      if (data.labTest.labGlu !== null) {
        this.gluData.push({
          y: parseFloat(data.labTest.labGlu),
          x: moment(data.labDateTime.toDate()).format('YYYY-MM-DD')
        })
        this.latestGlu = parseFloat(data.labTest.labGlu)
      }
      if (data.labTest.labCHO !== null) {
        this.choData.push({
          y: parseFloat(data.labTest.labCHO),
          x: moment(data.labDateTime.toDate()).format('YYYY-MM-DD')
        })
        this.latestCHO = parseFloat(data.labTest.labCHO)
      }
      if (data.labTest.labTG !== null) {
        this.tgData.push({
          y: parseFloat(data.labTest.labTG),
          x: moment(data.labDateTime.toDate()).format('YYYY-MM-DD')
        })
        this.latestTG = parseFloat(data.labTest.labTG)
      }
    })
    let label = 'mg/dL'
    let glucctx = document.getElementById('GlucChart').getContext('2d')
    let choctx = document.getElementById('CHOChart').getContext('2d')
    let tgctx = document.getElementById('TGChart').getContext('2d')
    this.gluchart = this.createChart(glucctx, this.gluData, label, 'rgb(38, 194, 129)')
    this.chochart = this.createChart(choctx, this.choData, label, 'rgb(250, 185, 35)')
    this.tgchart = this.createChart(tgctx, this.tgData, label, 'rgb(250, 185, 35)')
  },
});
</script>

<style scoped>
</style>