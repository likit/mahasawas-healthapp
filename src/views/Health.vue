<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Health Diary</h1>
              <h3>บันทึกสุขภาพ</h3>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-list>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>ร่างกาย</ion-label>
                </ion-item-divider>
                <ion-item inset="true" detail @click="$router.push({name: 'LabRecord'})">
                  <ion-icon slot="start" :icon="waterOutline"></ion-icon>
                  <ion-label>
                    ผลการตรวจทางห้องปฏิบัติการ
                    <p>Lab tests</p>
                  </ion-label>
                </ion-item>
                <ion-item inset="true" detail @click="$router.push({name:'weight'})">
                  <ion-icon slot="start" :icon="scaleOutline"></ion-icon>
                  <ion-label>
                    น้ำหนักตัว
                    <p>Weight</p>
                  </ion-label>
                </ion-item>
                <ion-item inset="true" detail @click="$router.push({name:'height'})">
                  <ion-icon slot="start" :icon="accessibility"></ion-icon>
                  <ion-label>
                    ส่วนสูง
                    <p>Height</p>
                  </ion-label>
                </ion-item>
                <ion-item lines="none" v-if="hasBmi">
                  <ion-text>
                    <h4>ดัชนีมวลกายของคุณคือ {{ bmi.toFixed(1) }}</h4>
                  </ion-text>
                </ion-item>
<!--                <ion-item inset="true" detail href="/tabs/home" class="ion-margin-bottom">-->
<!--                  <ion-icon slot="start" :icon="manOutline"></ion-icon>-->
<!--                  <ion-label>Body Composition</ion-label>-->
<!--                </ion-item>-->
              </ion-item-group>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>โภชนาการ</ion-label>
                </ion-item-divider>
                <ion-item inset="true" detail @click="$router.push({name:'foodsearch'})">
                  <ion-icon slot="start" :icon="fastFoodOutline"></ion-icon>
                  <ion-label>
                    อาหาร
                    <p>Food</p>
                  </ion-label>
                </ion-item>
                <ion-item inset="true" detail @click="$router.push({name:'Drink'})">
                  <ion-icon slot="start" :icon="wineOutline"></ion-icon>
                  <ion-label>
                    การดื่มน้ำ
                    <p>Water consumption</p>
                  </ion-label>
                </ion-item>
              </ion-item-group>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>จิตใจ</ion-label>
                </ion-item-divider>
                <ion-item inset="true" detail @click="$router.push({name: 'MoodRecord'})">
                  <ion-icon slot="start" :icon="happyOutline"></ion-icon>
                  <ion-label>
                    อารมณ์
                    <p>Mood</p>
                  </ion-label>
                </ion-item>
                <ion-item inset="true" detail @click="$router.push({name: 'MeditationRecord'})" class="ion-margin-bottom">
                  <ion-icon slot="start" :icon="headsetOutline"></ion-icon>
                  <ion-label>
                    สมาธิ
                    <p>Meditation</p>
                  </ion-label>
                </ion-item>
              </ion-item-group>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>
                    สุขภาพส่วนตัว
                  </ion-label>
                </ion-item-divider>
                <ion-item inset="true" detail @click="$router.push({name: 'Goal'})">
                  <ion-icon slot="start" :icon="trophyOutline"></ion-icon>
                  <ion-label>
                    เป้าหมาย
                    <p>Goals</p>
                  </ion-label>
                </ion-item>
                <ion-item inset="true" detail href="/milestones">
                  <ion-icon slot="start" :icon="flagOutline"></ion-icon>
                  <ion-label>
                    ความสำเร็จ
                    <p>
                      Milestones
                    </p>
                  </ion-label>
                </ion-item>
              </ion-item-group>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  waterOutline,
  alertCircleOutline,
  headsetOutline,
  trophyOutline,
  flagOutline,
  scaleOutline,
  manOutline,
  happyOutline,
  accessibility,
  fastFoodOutline,
  wineOutline
} from 'ionicons/icons';

import {
  IonItemDivider,
  IonItemGroup,
  IonContent,
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/vue';
import {defineComponent} from 'vue';
import {mapState} from "vuex";

export default defineComponent({
  name: 'Profile',
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonItemDivider,
    IonItemGroup,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonText,
  },
  setup() {
    return {
      waterOutline,
      scaleOutline,
      headsetOutline,
      manOutline,
      trophyOutline,
      happyOutline,
      flagOutline,
      alertCircleOutline,
      fastFoodOutline,
      accessibility,
      wineOutline
    }
  },
  computed: {
    ...mapState(['user', 'profile', 'currentHeight', 'currentWeight']),
    bmi () {
      return this.currentWeight / Math.pow(this.currentHeight * 0.01, 2)
    },
    hasBmi () {
      return this.currentHeight !== null && this.currentHeight !== null
    }
  },
  mounted() {
  }
});
</script>

<style scoped>

</style>