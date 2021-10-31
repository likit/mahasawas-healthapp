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
                    Distance {{ record.distance }} km
                  </p>
                  <p>
                    Steps {{ record.steps }}
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
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label>
                โครงการที่เข้าร่วม
              </ion-label>
              <ion-select v-model="selectedCampaigns" multiple="true">
                <ion-select-option
                    v-for="camp in campaigns" :key="camp.id" :value="camp">
                  {{ camp.name}}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <ion-list-header>
              <ion-label>ส่งผลไปยังโครงการ</ion-label>
            </ion-list-header>
            <ion-item v-for="camp in selectedCampaigns" :key="camp.id">
              <ion-label>{{ camp.name }}</ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="deleteRecord" color="primary">
              Submit
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
  IonListHeader,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel, alertController,
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { db } from '../../firebase'
import { doc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'

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
    IonListHeader,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption
  },
  data() {
    return {
      record: {},
      campaigns: [],
      selectedCampaigns: [],
    }
  },
  methods: {
    deleteRecord () {
      const self = this
      if (this.record.id) {
        const ref = doc(db, 'activity_records', this.record.id)
        deleteDoc(ref).then(async () => {
          await self.presentAlert()
          self.$router.push({ name: 'WalkRecord' })
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
    const self = this
    const recordId = this.$route.params.recordId
    let ref = doc(db, 'activity_records', recordId)
    const docSnapshot = await getDoc(ref)
    if (docSnapshot.exists()) {
      this.record = docSnapshot.data()
      this.record.id = docSnapshot.id
    }
    let campRef = collection(db, 'campaigns')
    const documentQuerySnapshot = await getDocs(campRef)
    documentQuerySnapshot.docs.forEach(d=>{
      let data = d.data()
      data.id = d.id
      if (self.record.submissions &&
          self.record.submissions.indexOf(data.id) < 0) {
        self.campaigns.push(data)
      }
    })
  }
})
</script>

<style scoped>

</style>
