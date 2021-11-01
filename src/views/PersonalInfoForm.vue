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
import {getDocs, query, where, doc, updateDoc } from "firebase/firestore";
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
  },
  setup () {
    return {
      helpCircleOutline,
    }
  },
  data () {
    return {
      firstname: null,
      lastname: null,
      title: null,
      phone: null,
    }
  },
  computed: {
    ...mapState(['profile', 'user'])
  },
  methods: {
    async saveData() {
      const self = this
      const ref = collection(db, 'profiles')
      let q = query(ref, where('userId', '==', self.user.userId))
      let querySnap = await getDocs(q)
      if (querySnap.empty) {
        let newProfile = {
          userId: self.user.userId,
          updateDateTime: new Date(),
          firstname: self.profile.firstname,
          lastname: self.profile.lastname,
          title: self.profile.title,
          phone: self.profile.phone,
          challenges: [],
        }
        addDoc(ref, newProfile).then(() => {
          self.$store.dispatch('updateProfile', newProfile)
          self.$router.push({name: 'Profile'})
        })
      } else {
        querySnap.forEach(d => {
          let docRef = doc(db, 'profiles', d.id)
          let updatedProfile = {
            userId: self.profile.userId,
            title: self.profile.title,
            firstname: self.profile.firstname,
            lastname: self.profile.lastname,
            phone: self.profile.phone,
            updateDateTime: new Date(),
            challenges: self.profile.challenges
          }
          updateDoc(docRef, updatedProfile).then(() => {
            self.$store.dispatch('updateProfile', updatedProfile)
            self.$router.push({name: 'Profile'})
          })
        })
      }
    }
  },
})
</script>

<style scoped>

</style>
