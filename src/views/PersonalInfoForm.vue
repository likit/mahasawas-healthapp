<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Personal Information</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list-header>
              <ion-text>
                <h3>
                  Update/แก้ไข
                </h3>
                <p>User: {{ user.displayName }}</p>
              </ion-text>
            </ion-list-header>
            <ion-list>
              <ion-item>
                <ion-label position="floating">Title</ion-label>
                <ion-input v-model="profile.title" placeholder="คำนำหน้า"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">First Name</ion-label>
                <ion-input v-model="profile.firstname" placeholder="ชื่อ"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Last Name</ion-label>
                <ion-input v-model="profile.lastname" placeholder="นามสกุล"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Phone</ion-label>
                <ion-input v-model="profile.phone" placeholder="เบอร์โทรศัพท์"></ion-input>
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
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonListHeader,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/vue';

import { helpCircleOutline, arrowBackCircle } from 'ionicons/icons'
import {defineComponent} from 'vue';
import { db } from '../firebase'
import { collection, addDoc } from '@firebase/firestore'
import {getDocs, query, where, doc, updateDoc, Timestamp } from "firebase/firestore";
import {mapState} from "vuex";

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
    IonButton,
    IonListHeader,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon
  },
  setup () {
    return {
      helpCircleOutline,
      arrowBackCircle
    }
  },
  computed: {
    ...mapState(['profile', 'user'])
  },
  methods: {
    async saveData() {
      const ref = collection(db, 'profiles')
      let q = query(ref, where('userId', '==', this.user.userId))
      let querySnap = await getDocs(q)
      if (querySnap.empty) {
        let newProfile = {
          userId: this.user.userId,
          updateDateTime: Timestamp.fromDate(new Date()),
          firstname: this.profile.firstname,
          lastname: this.profile.lastname,
          title: this.profile.title,
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
            title: this.profile.title,
            firstname: this.profile.firstname,
            lastname: this.profile.lastname,
            phone: this.profile.phone,
            updateDateTime: Timestamp.fromDate(new Date()),
            challenges: this.profile.challenges
          }
          updateDoc(docRef, updatedProfile).then(() => {
            this.$store.dispatch('updateProfile', updatedProfile)
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
