<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Walk Record Detail</h1>
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
                    Distance {{ record.distance }} km, Steps {{ record.steps }}
                  </p>
                  <p>
                    ID {{ record.id }}
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="deleteRecord" color="danger">
              Delete
            </ion-button>
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
  IonButton,
  IonList,
  IonItem,
  IonLabel, alertController,
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { db } from '../../firebase'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'

export default defineComponent({
  name: "WalkRecordDetail",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      record: {}
    }
  },
  methods: {
    deleteRecord () {
      const self = this
      if (this.record.id) {
        const ref = doc(db, 'activity_records', this.record.id)
        deleteDoc(ref).then(async () => {
          await self.presentAlert()
          self.$router.go(1)
        })
      }
    },
    async presentAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'Delete Successfully',
            subHeader: 'ลบรายการ',
            message: 'ลบข้อมูลเรียบร้อยแล้ว',
            buttons: ['OK'],
          });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },
  },
  async mounted() {
    const recordId = this.$route.params.recordId
    const ref = doc(db, 'activity_records', recordId)
    const docSnapshot = await getDoc(ref)
    if (docSnapshot.exists()) {
      this.record = docSnapshot.data()
      this.record.id = docSnapshot.id
    }
  }
})
</script>

<style scoped>

</style>
