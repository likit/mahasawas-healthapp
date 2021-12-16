<template>
<ion-page>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-text color="danger">
            The web application must be run within We Mahidol App.
          </ion-text>
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
} from '@ionic/vue';
export default {
  name: "Prohibition",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  },
}
</script>

<style scoped>

</style>