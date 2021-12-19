<template>
<ion-page>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-text>
            <div class="ion-text-center">
              <h1>Walk Record</h1>
              <p>{{ this.user.displayName }}</p>
            </div>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-list>
            <ion-item detail v-for="record in walkRecords.slice(0, 7)"
                      :key="record.id" @click="goToDetail(record.id)">
              <ion-label>
                {{ record.startDateTime.toDate().toLocaleString() }}
                <p>
                  Steps {{ record.steps }},
                  {{ record.min}} min,
                  {{ record.estimatedCalories.toFixed(1) }} Cal
                </p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block" @click="$router.push({ name: 'WalkRecordForm' })">
            Add
          </ion-button>
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
import { arrowBackCircle } from 'ionicons/icons'
import {mapGetters, mapState} from "vuex";

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
  computed: {
    ...mapState(['user', 'activity_records']),
    ...mapGetters(['walkRecords']),
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'WalkRecordDetail', params: { recordId: recordId}})
    }
  }
})
</script>

<style scoped>

</style>