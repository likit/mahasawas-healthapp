<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {defineComponent} from 'vue';
import { db } from './firebase'
import { addDoc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore'

import liff from '@line/liff';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods: {
    initializeLine: async () => {
      const self = this
      await liff.init({liffId: '1655424321-KqJyaXOy'}).then(() => {
        if (!liff.isInClient() && !liff.isLoggedIn()) {
          liff.login()
        }
        liff.getProfile().then(async profile => {
          const userRef = collection(db, "users")
          const q = query(userRef, where('userId', '==', profile.userId))
          const querySnapshot = await getDocs(q)
          if (querySnapshot.empty) {
            addDoc(userRef, profile).then(() => {
              let proRef = collection(db, "profiles")
              let newProfile = {
                userId: profile.userId,
                updateDateTime: new Date(),
                firstname: null,
                lastname: null,
                title: null,
                phone: null,
                challenges: [],
              }
              addDoc(proRef, newProfile).then(()=> {
                self.$store.dispatch('updateProfile', newProfile)
              })
            })
          } else {
            querySnapshot.forEach((u) => {
              updateDoc(userRef, profile, u.id)
            })
          }
        self.$store.dispatch('updateUser', profile)
        }).catch(()=>{
          console.log('Failed to load profile.')
        })
      })
    }
  },
  async mounted() {
    const self = this
    if (liff.isInClient()) {
      this.initializeLine()
    } else {
      // Load user data
      let ref = collection(db, 'users')
      let q = query(ref, where("userId", "==", "mumthealthtest"))
      let querySnapshot = await getDocs(q)
      querySnapshot.forEach(d => {
        self.$store.dispatch('updateUser', d.data())
      })
      // Load profile data
      ref = collection(db, 'profiles')
      q = query(ref, where("userId", "==", "mumthealthtest"))
      querySnapshot = await getDocs(q)
      querySnapshot.forEach(d => {
        console.log(d.data())
        self.$store.dispatch('updateProfile', d.data())
      })
    }
  }
});
</script>
