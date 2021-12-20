<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-text>
                <h1>Personal Information</h1>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item>
                <ion-label position="floating">Title</ion-label>
                <ion-input :value="profile.titleNameTh + '/' + profile.titleNameEn"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Thai Name</ion-label>
                <ion-input :value="profile.firstNameTh + ' ' + profile.lastNameTh" readonly></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">English Name</ion-label>
                <ion-input :value="profile.firstNameEn + ' ' + profile.lastNameEn" readonly></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input :value="profile.emails" readonly></ion-input>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'Profile' })">
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
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/vue';

import { helpCircleOutline, arrowBackCircle } from 'ionicons/icons'
import {defineComponent} from 'vue';
import {mapState, mapGetters} from "vuex";

export default defineComponent({
  name: "PersonalInfoForm",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon
  },
  setup () {
    return {
      helpCircleOutline,
      arrowBackCircle
    }
  },
  computed: {
    ...mapState(['profile', 'user']),
    ...mapGetters(['displayName'])
  },
})
</script>

<style scoped>

</style>
