<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>MUMT UberHealth App</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">MUMT UberHealth App</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row>
          <ion-row>
            <ion-col>
              <ion-card color="danger">
                <ion-card-content>
                  <ion-icon :icon="timer" class="card-icon"></ion-icon>
                  <ion-text color="light">25 min</ion-text>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Activity</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836.
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Activity</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836.
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="activity">
          <ion-icon :icon="calendar"></ion-icon>
          <ion-label>Schedule</ion-label>
          <ion-badge>6</ion-badge>
        </ion-tab-button>
        <ion-tab-button tab="account">
          <ion-icon :icon="bicycle"></ion-icon>
          <ion-label>Exercise</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="account">
          <ion-icon :icon="barChart"></ion-icon>
          <ion-label>Ranking</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="account">
          <ion-icon :icon="personCircle"></ion-icon>
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonTabs, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonBadge } from '@ionic/vue';
import { IonText } from '@ionic/vue';
import { defineComponent } from 'vue';
import { calendar, personCircle, timer, bicycle, diamond, barChart } from 'ionicons/icons';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonTabs,
    IonTabButton,
    IonTabBar,
    IonIcon,
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonBadge,
    IonText,
  },
  setup() {
    return {
      personCircle,
      calendar,
      timer,
      bicycle,
      diamond,
      barChart,
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
