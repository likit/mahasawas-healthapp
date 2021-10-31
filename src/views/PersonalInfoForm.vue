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
              </ion-text>
            </ion-list-header>
            <ion-list>
              <ion-item>
                <ion-label position="floating">Title</ion-label>
                <ion-input v-model="title" placeholder="คำนำหน้า"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">First Name</ion-label>
                <ion-input v-model="firstname" placeholder="ชื่อ"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Last Name</ion-label>
                <ion-input v-model="lastname" placeholder="นามสกุล"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Phone</ion-label>
                <ion-input v-model="phone" placeholder="เบอร์โทรศัพท์"></ion-input>
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
} from '@ionic/vue';

import { helpCircleOutline } from 'ionicons/icons'
import {defineComponent} from 'vue';
import { db } from '../firebase'
import { collection, addDoc } from '@firebase/firestore'
import liff from "@line/liff";
import {getDocs, query, where, doc, updateDoc } from "firebase/firestore";

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
  },
  setup () {
    return {
      helpCircleOutline,
    }
  },
  data () {
    return {
      profileId: null,
      firstname: null,
      lastname: null,
      title: null,
      phone: null,
      profile: {
        userId: 'mumthealthtest',
        displayName: 'Testing Account'
      },
      updateDateTime: new Date().toISOString(),
      endDateTime: new Date().toISOString(),
    }
  },
  computed: {
  },
  methods: {
    clearForm () {
      const self = this
      self.updateDateTime = new Date().toISOString()
      self.firstname = null
      self.lastname = null
      self.title = null
      self.phone = null
    },
    async saveData() {
      const self = this
      // TODO: add start, end datetime validation
      const ref = collection(db, 'profiles')
      if (self.profileId === null) {
        addDoc(ref, {
          userId: self.profile.userId,
          updateDateTime: new Date(),
          firstname: self.firstname,
          lastname: self.lastname,
          title: self.title,
          phone: self.phone,
        }).then(() => {
          self.clearForm()
          self.$router.push({name: 'Profile'})
        })
      } else {
        const docRef = doc(db, 'profiles', self.profileId)
        await updateDoc(docRef, {
          title: self.title,
          firstname: self.firstname,
          lastname: self.lastname,
          phone: self.phone,
          updateDateTime: new Date(),
        }).then(() => {
          self.clearForm()
          self.$router.push({name: 'Profile'})
        })
      }
    }
  },
  async mounted() {
    const self = this

    if (liff.isInClient())
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          self.profile = profile
        })
      }

    const ref = collection(db, 'profiles')
    const q = query(ref, where("userId", "==", self.profile.userId))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      querySnapshot.forEach(d => {
        let data = d.data()
        self.profileId = d.id
        self.firstname = data.firstname
        self.lastname = data.lastname
        self.title = data.title
        self.phone = data.phone
      })
    }
  }
})
</script>

<style scoped>

</style>
