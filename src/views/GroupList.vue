<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Groups</h1>
              <p>{{ userId }}</p>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item v-for="group in groups" :key="group.id">
                <ion-label>
                  กลุ่ม{{ group.name }}
                  <p>
                    สมาชิก {{ group.members.length }} คน
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
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
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { arrowBackCircle } from 'ionicons/icons'
import {mapGetters, mapState} from "vuex";

export default defineComponent({
  name: "WalkRecord",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonFab,
    IonFabButton
  },
  setup () {
    return {
      arrowBackCircle
    }
  },
  computed: {
    ...mapGetters(['userId']),
    ...mapState(['groups'])
  }
})
</script>

<style scoped>

</style>
