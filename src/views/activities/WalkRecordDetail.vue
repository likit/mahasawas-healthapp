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
                    Estimated Calories {{ record.estimatedCalories }}
                  </p>
                  <p>
                    Calories {{ record.calories }}
                  </p>
                  <p>
                    Steps {{ record.steps }}
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row v-if="submissions.length == 0">
          <ion-col>
            <ion-button expand="block" @click="deleteRecord" color="danger">
              Delete
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item v-if="submissableChallenges.length > 0">
              <ion-label>
                โครงการที่เข้าร่วม
              </ion-label>
              <ion-select v-model="selectedChallenges" multiple="true">
                <ion-select-option
                    v-for="ch in challenges.filter(c=> submissions.indexOf(c.id) < 0 )" :key="ch.id" :value="ch.id">
                  {{ ch.title}}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <ion-list-header v-if="submissableChallenges.length > 0">
              <ion-label>ส่งผลไปยังโครงการ</ion-label>
            </ion-list-header>
            <ion-item v-for="ch in selectedChallengeItems" :key="ch.id">
              <ion-label>{{ ch.title }}</ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row v-if="submissableChallenges.length > 0">
          <ion-col>
            <ion-button expand="block" @click="submit" color="primary">
              Submit
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list-header>
              <ion-label>โครงการที่ส่งผลแล้ว</ion-label>
            </ion-list-header>
            <ion-item v-for="ch in challenges.filter(s => submissions.indexOf(s.id) >= 0)" :key="ch.id">
              <ion-label>{{ ch.title }}</ion-label>
            </ion-item>
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
import {doc, getDoc, getDocs, collection, deleteDoc, query, where, addDoc } from 'firebase/firestore'
import liff from "@line/liff";

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
      profile: {
        challenges: [],
        userId: null
      },
      record: {},
      challenges: [],
      submissions: [],
      selectedChallenges: [],
    }
  },
  computed: {
    selectedChallengeItems () {
      const self = this
      return this.challenges.filter(ch => {
        return self.selectedChallenges.indexOf(ch.id) >= 0
      })
    },
    submissableChallenges () {
      const self = this
      return this.challenges.filter(ch => self.submissions.indexOf(ch.id) < 0)
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
    async submit() {
      for (const ch of this.selectedChallenges) {
        let ref = collection(db, 'activity_submissions')
        addDoc(ref, {
          recordId: this.$route.params.recordId,
          userId: this.profile.userId,
          challengeId: ch,
          submittedAt: new Date()
        }).then(async () => {
          await this.presentSubmit()
          this.submissions.push(ch)
        })
      }
    },
    async presentSubmit() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'Submit Successfully',
            subHeader: 'ส่งรายการ',
            message: 'ส่งข้อมูลเรียบร้อยแล้ว',
            buttons: ['OK'],
          });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
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
    ref = collection(db, 'activity_submissions')
    let q = query(ref, where('userId', '==', self.$store.state.user.userId), where('recordId', '==', recordId))
    let querySnapshot = await getDocs(q)
    querySnapshot.forEach(s => {
      self.submissions.push(s.data().challengeId)
    })
    for (const ch of self.$store.state.profile.challenges) {
      let docRef = doc(db, 'challenges', ch)
      let docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        let data = docSnap.data()
        data.id = docSnap.id
        self.challenges.push(data)
      }
    }
  }
})
</script>

<style scoped>

</style>
