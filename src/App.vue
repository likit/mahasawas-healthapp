<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

import liff from '@line/liff';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods: {
     initializeLine: async () => {
      await liff.init({ liffId: '1655424321-KqJyaXOy'})
      if (!liff.isInClient() && !liff.isLoggedIn()) {
        await liff.login()
      }
    }
  },
  mounted() {}
});
</script>
