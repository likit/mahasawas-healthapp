<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {defineComponent} from 'vue';
import liff from '@line/liff';
import { db } from './firebase'
import { addDoc, query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore'


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods: {
    async initializeLine () {
      liff.init({liffId: '1656855755-l64BBAo0'}).then(() => {
        if (!liff.isInClient() && !liff.isLoggedIn()) {
          liff.login()
        }
        liff.getProfile().then(async profile => {
          const userRef = collection(db, "users")
          let q = query(userRef, where('userId', '==', profile.userId))
          let querySnapshot = await getDocs(q)
          if (querySnapshot.empty) {
            profile.isActive = true
            addDoc(userRef, profile).then(() => {
              let proRef = collection(db, "profiles")
              let newProfile = {
                userId: profile.userId,
                updateDateTime: new Date(),
                firstNameTh: null,
                lastNameTh: null,
                titleNameTh: null,
                firstNameEn: null,
                lastNameEn: null,
                titleNameEn: null,
                email: null,
                phone: null,
                challenges: [],
              }
              addDoc(proRef, newProfile).then(()=> {
                this.$store.dispatch('updateProfile', newProfile)
              })
            })
          } else {
            querySnapshot.forEach((u) => {
              let userRef = doc(db, "users", u.id)
              updateDoc(userRef, profile)
            })
          }
          this.$store.dispatch('updateUser', profile)
          let ref = collection(db, 'profiles')
          q = query(ref, where("userId", "==", profile.userId))
          querySnapshot = await getDocs(q)
          querySnapshot.forEach(d => {
            this.$store.dispatch('updateProfile', d.data())
          })
        })
      })
    }
  },
  async mounted() {
    if (liff.isInClient()) {
      await this.initializeLine()
    } else {
      // Load user data
      let ref = collection(db, 'users')
      let q = query(ref, where("userId", "==", "test"))
      let querySnapshot = await getDocs(q)
      querySnapshot.forEach(d => {
        this.$store.dispatch('updateUser', d.data())
      })
      // Load profile data
      ref = collection(db, 'profiles')
      q = query(ref, where("userId", "==", "test"))
      querySnapshot = await getDocs(q)
      querySnapshot.forEach(d => {
        this.$store.dispatch('updateProfile', d.data())
      })
    }
  }
});
</script>
