<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Health</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-list>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>Records</ion-label>
                </ion-item-divider>
                <ion-item inset="true" detail href="/tabs/home">
                  <ion-icon slot="start" :icon="waterOutline"></ion-icon>
                  <ion-label>Lab tests</ion-label>
                </ion-item>
                <ion-item inset="true" detail href="/tabs/home">
                  <ion-icon slot="start" :icon="scaleOutline"></ion-icon>
                  <ion-label>Weight</ion-label>
                </ion-item>
                <ion-item inset="true" detail href="/tabs/home" class="ion-margin-bottom">
                  <ion-icon slot="start" :icon="manOutline"></ion-icon>
                  <ion-label>Body Composition</ion-label>
                </ion-item>
              </ion-item-group>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>
                    Preferences
                  </ion-label>
                </ion-item-divider>
                <ion-item inset="true" href="/tabs/home">
                  <ion-icon slot="start" :icon="trophyOutline"></ion-icon>
                  <ion-label>Goals</ion-label>
                </ion-item>
                <ion-item inset="true" href="/tabs/home">
                  <ion-icon slot="start" :icon="trophyOutline"></ion-icon>
                  <ion-label>Favorites</ion-label>
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
import liff from '@line/liff';
import {
  waterOutline,
  alertCircleOutline,
  scaleOutline,
  trophyOutline,
  manOutline
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
      manOutline,
      trophyOutline,
      alertCircleOutline
    }
  },
  data() {
    return {
      profile: {
        'displayName': 'Likit',
        'pictureUrl': ''
      }
    }
  },
  methods: {
    getLineProfile: () => {
      liff.getProfile().then(profile => {
        this.profile = profile
      })
    }
  },
  mounted() {
  }
});
</script>

<style scoped>

</style>