<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text class="ion-text-lg-center">
              <h1>Profile</h1>
            </ion-text>
            <ion-item inset="true">
              <ion-avatar slot="start">
                <img :src="profile.pictureUrl">
              </ion-avatar>
              <ion-label>
                <h2>{{ profile.displayName }}</h2>
                <p>{{ profile.statusMessage }}</p>
              </ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-list>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>Settings</ion-label>
                </ion-item-divider>
                <ion-item detail inset="true" href="/profile/personal-info-edit" class="ion-margin-bottom">
                  <ion-icon slot="start" :icon="personOutline"></ion-icon>
                  <ion-label>Personal Info</ion-label>
                </ion-item>
              </ion-item-group>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>
                    Information
                  </ion-label>
                </ion-item-divider>
                <ion-item detail inset="true" href="/tabs/home">
                  <ion-icon slot="start" :icon="alertCircleOutline"></ion-icon>
                  <ion-label>Term & Condition</ion-label>
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
import {personOutline, alertCircleOutline} from 'ionicons/icons';

import {
  IonItemDivider,
  IonItemGroup,
  IonAvatar,
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
import liff from "@line/liff";

export default defineComponent({
  name: 'Profile',
  components: {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonItemDivider,
    IonItemGroup,
    IonAvatar,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  },
  setup() {
    return {
      personOutline,
      alertCircleOutline
    }
  },
  data() {
    return {
      profile: {
        'displayName': 'Testing Account',
        'pictureUrl': '',
        'statusMessage': '',
        'userId': 'mumthealthtest'
      }
    }
  },
  mounted() {
    const self = this
    if (liff.isInClient() && liff.isLoggedIn()) {
      liff.getProfile().then(profile => {
        self.profile = profile
      })
    }
  }
});
</script>

<style scoped>

.avatar {
  margin: auto;
}

</style>