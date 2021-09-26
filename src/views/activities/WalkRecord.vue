<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="back"></ion-back-button>
      </ion-buttons>
      <ion-title></ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-text>
            <h1>Walk Record</h1>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <p>Graph here</p>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-list-header>
            <ion-text>
              <h3>
                New record
              </h3>
            </ion-text>
          </ion-list-header>
          <ion-list>
            <ion-item>
              <ion-label position="floating">Start date</ion-label>
              <ion-datetime display-format="MMM DD, YYYY"></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Start time</ion-label>
              <ion-datetime display-format="HH:mm"></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-label position="floating">End date</ion-label>
              <ion-datetime display-format="MMM DD, YYYY"></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-label position="floating">End time</ion-label>
              <ion-datetime display-format="HH:mm"></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Steps</ion-label>
              <ion-input type="number" placeholder="จำนวนก้าวโดยประมาณ"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Calories</ion-label>
              <ion-input type="number" placeholder="แคลอรีที่เผาผลาญโดยประมาณ"></ion-input>
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button expand="block">
            Add
          </ion-button>
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
  IonBackButton,
    IonInput,
    IonDatetime,
    IonList,
    IonItem,
    IonButton,
    IonToolbar,
    IonListHeader,
    IonLabel,
    IonTitle,
    IonButtons,
} from '@ionic/vue';

import {defineComponent} from 'vue';
export default defineComponent({
  name: "WalkRecord",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonBackButton,
    IonInput,
    IonDatetime,
    IonList,
    IonItem,
    IonButton,
    IonToolbar,
    IonListHeader,
    IonLabel,
    IonTitle,
    IonButtons,
  }
})
</script>

<style scoped>

</style>