<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {defineComponent} from 'vue';
import { db } from './firebase'
import { addDoc, query, collection, where, getDocs, setDoc } from 'firebase/firestore'

import liff from '@line/liff';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods: {
    initializeLine: async () => {
      await liff.init({liffId: '1655424321-KqJyaXOy'}).then(() => {
        if (!liff.isInClient() && !liff.isLoggedIn()) {
          liff.login()
        }
        liff.getProfile().then(async profile => {
          const userRef = collection(db, "users")
          const q = query(userRef, where('userId', '==', profile.userId))
          const querySnapshot = await getDocs(q)
          if (querySnapshot.empty) {
            addDoc(userRef, profile)
          } else {
            querySnapshot.forEach((u) => {
              setDoc(userRef, profile, u.id)
            })
          }
        })
      })
    }
  },
  mounted() {
    this.initializeLine()
  }
});
</script>
