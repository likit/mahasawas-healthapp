<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h3>Mood Record Detail</h3>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item>
                <ion-label>
                  <p v-if="record.startDateTime != null">
                    {{ record.startDateTime.toDate().toLocaleString() }}
                  </p>
                  <p>
                    You felt {{ feeling_levels[record.feeling] }}.
                  </p>
                  <p>
                    Reason: {{ record.reason }}
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'MoodRecord' })">
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
  IonFabButton,
  IonFab,
  IonIcon,
  IonLabel
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../../../firebase'
import { arrowBackCircle } from 'ionicons/icons'
import {collection, doc, getDoc} from 'firebase/firestore'

export default defineComponent({
  name: "MoodRecordDetail",
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
    IonFabButton,
    IonFab,
    IonIcon,
  },
  setup () {
    return {
      arrowBackCircle
    }
  },
  data() {
    return {
      record: {},
      feeling_levels: {
        1: 'very sad',
        2: 'sad',
        3: 'neutral',
        4: 'good',
        5: 'fantastic'
      },
      route: null
    }
  },
  watch: {
    'route.params.recordId': async function(newRecordId) {
      if (newRecordId !== undefined) {
        let docRef = doc(collection(db, 'mood_records'), newRecordId)
        let docSnapshot = await getDoc(docRef)
        this.record = docSnapshot.data()
        this.record.id = docSnapshot.id
      }
    }
  },
  mounted() {
    this.route = useRoute()
  }
})
</script>

<style scoped>

</style>
