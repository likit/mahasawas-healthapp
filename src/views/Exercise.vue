<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text class="ion-text-lg-center">
              <div class="ion-text-center">
                <h1>Exercise Records</h1>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item detail router-link="/activities/walk-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/PHIgYUGQPvU">
                </ion-thumbnail>
                <ion-label>
                  Walking
                  <p>เดิน</p>
                  <ion-progress-bar :value="counts['walking']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/jog-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/oGv9xIl7DkY">
                </ion-thumbnail>
                <ion-label>
                  Jogging
                  <p>วิ่ง</p>
                  <ion-progress-bar :value="counts['jogging']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/swim-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/JjUyjE-oEbM">
                </ion-thumbnail>
                <ion-label>
                  Swiming
                  <p>ว่ายน้ำ</p>
                  <ion-progress-bar :value="counts['swimming']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/bike-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/K2xGNNcQn_w">
                </ion-thumbnail>
                <ion-label>
                  Biking
                  <p>ปั่นจักรยาน</p>
                  <ion-progress-bar :value="counts['biking']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/dance-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/3ckWUnaCxzc">
                </ion-thumbnail>
                <ion-label>
                  Dancing
                  <p>เต้นแอโรบิก ลีลาศ ซุมบ้า</p>
                  <ion-progress-bar :value="counts['dancing']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/sport-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/dKCKiC0BQtU">
                </ion-thumbnail>
                <ion-label>
                  Sport
                  <p>กีฬาต่างๆ</p>
                  <ion-progress-bar :value="counts['sport']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/jumprope-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/7QYd1VxLRbM">
                </ion-thumbnail>
                <ion-label>
                  Jump Rope
                  <p>โดดเชือก</p>
                  <ion-progress-bar :value="counts['jumprope']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/hulahoop-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/HC1I-tgIDq0">
                </ion-thumbnail>
                <ion-label>
                  Hula Hoop
                  <p>ฮูล่าฮูป</p>
                  <ion-progress-bar :value="counts['hulahoop']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/bodyweight-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/jD4MtXnsJ6w">
                </ion-thumbnail>
                <ion-label>
                  Body Weight
                  <p>บอร์ดี้เวท</p>
                  <ion-progress-bar :value="counts['bodyweight']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <ion-item detail router-link="/activities/weighttraining-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/FP7cfYPPUKM">
                </ion-thumbnail>
                <ion-label>
                  Weight Training
                  <p>เวทเทรนนิ่ง</p>
                  <ion-progress-bar :value="counts['weightTraining']/total"></ion-progress-bar>
                </ion-label>
              </ion-item>
              <!--
              -->
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonThumbnail,
  IonContent,
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonText
} from '@ionic/vue';
import {defineComponent} from 'vue';
import {mapGetters, mapState} from "vuex";
export default defineComponent({
  name: "Exercise",
  components: {
    IonProgressBar,
    IonText,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel
  },
  data () {
    return {
      counts: {
        walking: 0,
        jogging: 0,
        swimming: 0,
        biking: 0,
        dancing: 0,
        sport: 0,
        jumprope: 0,
        hulahoop: 0,
        bodyweight: 0,
        weightTraining: 0
      },
      total: 0
    }
  },
  computed: {
    ...mapGetters(['displayName', 'userId']),
    ...mapState(['activity_records'])
  },
  methods: {
    loadActivities () {
      this.total = 0
      this.counts.walking = 0
      this.counts.jogging = 0
      this.counts.swimming = 0
      this.counts.biking = 0,
      this.counts.dancing = 0,
      this.counts.sport = 0,
      this.counts.jumprope = 0,
      this.counts.hulahoop = 0,
      this.counts.bodyweight = 0,
      this.counts.weightTraining = 0
      this.activity_records.forEach(d=>{
        this.total++
        this.counts[d.type]++
      })
    }
  },
  updated() {
    this.loadActivities()
  }
});
</script>

<style scoped>

</style>