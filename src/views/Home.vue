<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>MUMT UberHealth App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <img src="https://source.unsplash.com/gJtDg6WfMlQ">
              <ion-card-header>
                <ion-card-title>Your Activities</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item>
                    <ion-label>
                      Jogging
                    </ion-label>
                    <ion-note slot="end">
                      30 mins
                    </ion-note>
                  </ion-item>
                  <ion-item>
                    <ion-label>
                      Walking
                    </ion-label>
                    <ion-note slot="end">
                      1 hrs
                    </ion-note>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <img src="https://source.unsplash.com/J154nEkpzlQ">
              <ion-card-header>
                <ion-card-title>Upcoming Activity</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Socialize with your peers and get motivated!
                <ion-button>Join now</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonCard,
    IonCardHeader,
    IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/vue';
import {defineComponent} from 'vue';
import {home, personCircle, timer, bicycle, diamond, barChart, accessibility} from 'ionicons/icons';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
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

</style>
