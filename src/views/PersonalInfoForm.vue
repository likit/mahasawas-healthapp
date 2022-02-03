<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-text>
                <h1>Personal Information</h1>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item>
                <ion-label position="floating">คำนำหน้า</ion-label>
                <ion-input v-model="profile.titleNameTh"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">ชื่อ</ion-label>
                <ion-input v-model="profile.firstNameTh" readonly></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">นามสกุล</ion-label>
                <ion-input v-model="profile.lastNameTh"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">อีเมล</ion-label>
                <ion-input v-model="profile.email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">โทรศัพท์</ion-label>
                <ion-input v-model="profile.phone"></ion-input>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" color="success" @click="saveData">
              Save
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
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
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonButton,
  IonIcon, toastController
} from '@ionic/vue';
import { db } from '../firebase'
import { collection, addDoc } from '@firebase/firestore'
import {getDocs, query, where, doc, updateDoc, Timestamp } from "firebase/firestore";
import { helpCircleOutline, arrowBackCircle } from 'ionicons/icons'
import {defineComponent} from 'vue';
import {mapState, mapGetters} from "vuex";

export default defineComponent({
  name: "PersonalInfoForm",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton
  },
  setup () {
    return {
      helpCircleOutline,
      arrowBackCircle
    }
  },
  computed: {
    ...mapState(['profile', 'user']),
    ...mapGetters(['displayName'])
  },
  methods: {
    async openToast() {
      const toast = await toastController
          .create({
            message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
            duration: 2000,
            position: "top",
            color: "success"
          })
      return toast.present();
    },
    async saveData() {
      const ref = collection(db, 'profiles')
      let q = query(ref, where('userId', '==', this.user.userId))
      let querySnap = await getDocs(q)
      if (querySnap.empty) {
        let newProfile = {
          userId: this.user.userId,
          updateDateTime: Timestamp.fromDate(new Date()),
          firstNameTh: this.profile.firstNameTh,
          lastNameTh: this.profile.lastNameTh,
          titleNameTh: this.profile.titleNameTh,
          email: this.profile.email,
          phone: this.profile.phone,
          challenges: [],
        }
        addDoc(ref, newProfile).then(() => {
          this.$store.dispatch('updateProfile', newProfile)
          this.$router.push({name: 'Profile'})
        })
      } else {
        querySnap.forEach(d => {
          let docRef = doc(db, 'profiles', d.id)
          let updatedProfile = {
            userId: this.user.userId,
            titleNameTh: this.profile.titleNameTh,
            firstNameTh: this.profile.firstNameTh,
            lastNameTh: this.profile.lastNameTh,
            phone: this.profile.phone,
            email: this.profile.email,
            updateDateTime: Timestamp.fromDate(new Date()),
          }
          updateDoc(docRef, updatedProfile).then(() => {
            this.$store.dispatch('updateProfile', updatedProfile)
            this.openToast()
            this.$router.push({name: 'Profile'})
          })
        })
      }
    }
  },
})
</script>

<style scoped>

</style>
