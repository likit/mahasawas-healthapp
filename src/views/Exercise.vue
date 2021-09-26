<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text class="ion-text-lg-center">
              <h1>Exercise</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://pixabay.com/images/id-6252827/">
                </ion-thumbnail>
                <ion-label>
                  <p>Walking</p>
                  <p>เดิน</p>
                </ion-label>
              </ion-item>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://pixabay.com/images/id-6252827/">
                </ion-thumbnail>
                <ion-label>
                  <p>Jogging</p>
                  <p>วิ่ง</p>
                </ion-label>
              </ion-item>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://pixabay.com/images/id-6252827/">
                </ion-thumbnail>
                <ion-label>
                  <p>Swimming</p>
                  <p>ว่ายน้ำ</p>
                </ion-label>
              </ion-item>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://pixabay.com/images/id-6252827/">
                </ion-thumbnail>
                <ion-label>
                  <p>Dancing</p>
                  <p>เต้นแอโรบิก ลีลาศ</p>
                </ion-label>
              </ion-item>
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
} from '@ionic/vue';
import {defineComponent} from 'vue';
export default defineComponent({
  name: "Exercise",
  components: {
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  }
});
</script>

<style scoped>

</style>