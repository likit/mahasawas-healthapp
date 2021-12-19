<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h3>Dance Record Detail</h3>
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
                    Estimated Calories {{ record.estimatedCalories }}
                  </p>
                  <p>
                    Calories {{ record.calories }}
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
                    v-for="ch in challenges.filter(c=> submissions.indexOf(c.id) < 0 )"
                    :key="ch.id" :value="ch.id">
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
        <ion-row v-if="submissions.length > 0">
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
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'DanceRecord' })">
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
  IonButton,
  IonList,
  IonListHeader,
  IonItem,
  IonFabButton,
  IonFab,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonLabel, alertController,
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../../firebase'
import { arrowBackCircle } from 'ionicons/icons'
import {doc, getDoc, getDocs, collection, deleteDoc, query, where, addDoc } from 'firebase/firestore'
import {mapState} from "vuex";

export default defineComponent({
  name: "DanceRecordDetail",
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
    IonFabButton,
    IonFab,
    IonIcon,
    IonSelectOption
  },
  setup () {
    return {
      arrowBackCircle
    }
  },
  data() {
    return {
      record: {
        startDateTime: null,
        distances: null,
        estimatedCalories: null,
        calories: null,
      },
      challenges: [],
      submissions: [],
      selectedChallenges: [],
      route: null,
    }
  },
  computed: {
    selectedChallengeItems () {
      return this.challenges.filter(ch => {
        return this.selectedChallenges.indexOf(ch.id) >= 0
      })
    },
    submissableChallenges () {
      return this.challenges.filter(ch => this.submissions.indexOf(ch.id) < 0)
    },
    ...mapState(['user', 'profile'])
  },
  watch: {
    'route.params.recordId': async function() {
      this.reset()
      const recordId = this.route.params.recordId
      if (recordId !== null && recordId !== undefined) {
        let ref = collection(db, 'activity_submission')
        let q = query(ref, where('recordId', '==', recordId))
        let querySnapshot = await getDocs(q)
        querySnapshot.docs.forEach(s => {
          this.submissions.push(s.data().challengeId)
        })

        for (const ch of this.profile.challenges) {
          let docRef = doc(db, 'challenges', ch)
          getDoc(docRef).then((snapshot) => {
            if (snapshot.exists()) {
              let data = snapshot.data()
              data.id = snapshot.id
              this.challenges.push(data)
            }
          })
        }

        ref = doc(db, 'activity_records', recordId)
        const docSnapshot = await getDoc(ref)
        if (docSnapshot.exists()) {
          this.record = docSnapshot.data()
          this.record.id = docSnapshot.id
        }
      }
    }
  },
  methods: {
    reset () {
      this.challenges = []
      this.submissions = []
      this.selectedChallenges = []
    },
    deleteRecord () {
      if (this.record.id) {
        const ref = doc(db, 'activity_records', this.record.id)
        deleteDoc(ref).then(async () => {
          await this.presentAlert()
          this.$store.dispatch('deleteActivity', this.record.id)
          this.$router.push({ name: 'DanceRecord' })
        })
      }
    },
    async submit() {
      for (const ch of this.selectedChallenges) {
        let ref = collection(db, 'activity_submission')
        addDoc(ref, {
          recordId: this.route.params.recordId,
          userId: this.user.userId,
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
      await alert.onDidDismiss();
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
      await alert.onDidDismiss();
    },
  },
  mounted() {
    this.route = useRoute()
  }
})
</script>

<style scoped>

</style>
