<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="home"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="exercise" href="/tabs/exercise">
          <ion-icon :icon="bicycle"></ion-icon>
          <ion-label>Exercise</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="ranking" href="/tabs/ranking">
          <ion-icon :icon="barChart"></ion-icon>
          <ion-label>Ranking</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="health">
          <ion-icon :icon="accessibility"></ion-icon>
          <ion-label>Health</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personCircle"></ion-icon>
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonIcon
} from '@ionic/vue';
import {defineComponent} from 'vue';
import {home, personCircle, timer, bicycle, diamond, barChart, accessibility} from 'ionicons/icons';

export default defineComponent({
  name: 'Home',
  components: {
    IonPage,
    IonTabs,
    IonTabButton,
    IonTabBar,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
  },
  setup() {
    return {
      personCircle,
      home,
      timer,
      bicycle,
      diamond,
      barChart,
      accessibility,
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.card-icon {
  font-size: 64px;
}

ion-text {
  font-size: 64px;
}
</style>
