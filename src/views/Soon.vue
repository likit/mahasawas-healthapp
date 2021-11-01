<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text class="ion-text-lg-center">
              <h1>This feature will be available soon..</h1>
              <p>การใช้งานนี้ยังอยู่ระหว่างการพัฒนา กรุณาอดใจรอสักครู่</p>
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
import {defineComponent} from 'vue';
import {mapState} from "vuex";
export default defineComponent({
  name: "Soon",
  components: {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonPage,
  },
  computed: {
    ...mapState(['user'])
  }
});
</script>

<style scoped>

</style>
