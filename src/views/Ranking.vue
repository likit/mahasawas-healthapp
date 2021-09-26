<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text class="ion-text-lg-center">
              <h1>Ranking</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12">
            <ion-list>
              <ion-item-group>
                <ion-item inset="true">
                  <ion-avatar slot="start">
                    <img src="https://i.pravatar.cc/300">
                  </ion-avatar>
                  <ion-label>Toy</ion-label>
                  <ion-note slot="end">545</ion-note>
                </ion-item>
                <ion-item inset="true">
                  <ion-avatar slot="start">
                    <img src="https://i.pravatar.cc/300">
                  </ion-avatar>
                  <ion-label>Likit</ion-label>
                  <ion-note slot="end">435</ion-note>
                </ion-item>
                <ion-item inset="true">
                  <ion-avatar slot="start">
                    <img src="https://i.pravatar.cc/300">
                  </ion-avatar>
                  <ion-label>Tu</ion-label>
                  <ion-note slot="end">234</ion-note>
                </ion-item>
                <ion-item inset="true">
                  <ion-avatar slot="start">
                    <img src="https://i.pravatar.cc/300">
                  </ion-avatar>
                  <ion-label>Nut</ion-label>
                  <ion-note slot="end">230</ion-note>
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
  IonItemGroup,
  IonAvatar,
  IonContent,
  IonPage,
  IonList,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
    IonNote,
} from '@ionic/vue';
export default {
  name: "Ranking",
  components: {
    IonNote,
    IonGrid,
    IonRow,
    IonCol,
    IonItemGroup,
    IonAvatar,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  },
}
</script>

<style scoped>

</style>