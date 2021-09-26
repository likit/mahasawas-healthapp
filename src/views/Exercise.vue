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
              <ion-item detail router-link="/activities/walk-records">
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/PHIgYUGQPvU">
                </ion-thumbnail>
                <ion-label>
                  <p>Walking</p>
                  <p>เดิน</p>
                </ion-label>
              </ion-item>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/oGv9xIl7DkY">
                </ion-thumbnail>
                <ion-label>
                  <p>Jogging</p>
                  <p>วิ่ง</p>
                </ion-label>
              </ion-item>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/XOcM3n0QkHg">
                </ion-thumbnail>
                <ion-label>
                  <p>Swimming</p>
                  <p>ว่ายน้ำ</p>
                </ion-label>
              </ion-item>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/K2xGNNcQn_w">
                </ion-thumbnail>
                <ion-label>
                  <p>Biking</p>
                  <p>ปั่นจักรยาน</p>
                </ion-label>
              </ion-item>
              <ion-item detail>
                <ion-thumbnail slot="start">
                  <img src="https://source.unsplash.com/BcVvVvqiCGA">
                </ion-thumbnail>
                <ion-label>
                  <p>Dancing</p>
                  <p>เต้นแอโรบิก ลีลาศ ซุมบ้า</p>
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
  IonText,
} from '@ionic/vue';
import {defineComponent} from 'vue';
export default defineComponent({
  name: "Exercise",
  components: {
    IonText,
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