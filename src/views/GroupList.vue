<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Groups</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item detail v-for="group in groups" :key="group.id">
                <ion-label>
                  กลุ่ม{{ group.name }}
                  <p>
                    สมาชิก {{ group.members.length }} คน
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue';

import {defineComponent} from 'vue';
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import liff from "@line/liff";

export default defineComponent({
  name: "WalkRecord",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonList,
    IonItem,
    IonLabel,
  },
  data () {
    return {
      profile: {
        userId: "mumthealthtest"
      },
      groups: []
    }
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'WalkRecordDetail', params: { recordId: recordId}})
    }
  },
  async mounted () {
    const self = this
    if (liff.isInClient()) {
      liff.getProfile().then(profile => {
        self.profile = profile
      })
    }
    const ref = collection(db, 'userGroups')
    const q = query(ref, where("members", "array-contains", self.profile.userId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(d=>{
      let data = d.data()
      data.id = d.id
      self.groups.push(data)
    })
  }
})
</script>

<style scoped>

</style>
