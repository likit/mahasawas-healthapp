<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {defineComponent} from 'vue';
// import { db } from './firebase'
// import { addDoc, query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore'


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
});
</script>
