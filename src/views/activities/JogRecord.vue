<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1>Jog Record</h1>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="$router.push({name: 'JogRecordForm'})">
              Add
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item detail v-for="record in JogRecords.slice(0, 7)" :key="record.id" @click="goToDetail(record.id)">
                <ion-label>
                  {{ record.startDateTime.toDate().toLocaleString() }}
                  <p>
                    {{ record.distance }} km,
                    {{ record.min }} min,
                    {{ record.estimatedCalories.toFixed(1) }} Cal
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
      <ion-fab vertical="bottom" horizontal="end">
        <ion-fab-button color="success" @click="$router.push({ name: 'JogRecordGoalForm' })">
          <ion-icon :icon="golfOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/vue";
import { arrowBackCircle, golfOutline } from 'ionicons/icons'
import {mapGetters} from "vuex";

export default {
  name: "JogRecord",
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
    IonFab,
    IonFabButton,
    IonIcon
  },
  setup () {
    return {
      arrowBackCircle, golfOutline
    }
  },
  computed: {
    ...mapGetters(['JogRecords'])
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'JogRecordDetail', params: { recordId: recordId}})
    }
  }
}
</script>

<style scoped>

</style>