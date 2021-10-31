<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-content>
                <ion-item lines="none">
                  <ion-icon slot="start" class="badge" size="large" :icon="ribbonOutline"></ion-icon>
                  <ion-text color="primary">
                    โปรแกรมนี้ยังอยู่ในระหว่างการทดสอบ
                  </ion-text>
                </ion-item>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card>
              <img src="https://source.unsplash.com/gJtDg6WfMlQ">
              <ion-card-header>
                <ion-card-title>Your Recent Activities</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-text>Next level</ion-text>
                <ion-progress-bar value="0.3"></ion-progress-bar>
                <ion-list>
                  <ion-item lines="full" v-for="rec in records" :key="rec.id">
                    <ion-label>
                      {{ rec.type }}
                    </ion-label>
                    <ion-note slot="end">
                      {{ rec.estimatedCalories.toFixed(1) }} Cal.
                    </ion-note>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row v-for="ch in allChallenges" :key="ch.id">
          <ion-col>
            <ion-card>
              <img src="https://source.unsplash.com/J154nEkpzlQ">
              <ion-card-header>
                <ion-card-title>{{ ch.title }} Challenges</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                {{ ch.pitch }}
                <ion-button v-if="profile.challenges.indexOf(ch.id) < 0"
                            @click="addChallenge(ch.id)">Join now</ion-button>
                <ion-button v-else @click="addChallenge(ch.id)">Detail</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  IonProgressBar,
  IonLabel,
  IonCardTitle,
  IonNote,
  IonText,
} from '@ionic/vue';
import {defineComponent} from 'vue';
import { ribbonOutline } from 'ionicons/icons';
import liff from "@line/liff";
import { collection, getDocs, query, where, orderBy, limit, doc, updateDoc } from "firebase/firestore";
import {db} from "@/firebase";

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonProgressBar,
    IonLabel,
    IonCardTitle,
    IonNote,
    IonText,
  },
  setup() {
    return {
      ribbonOutline,
    }
  },
  data () {
    return {
      profile: {
        userId: null,
        challenges: [],
      },
      records: [],
      allChallenges: [],
      groups: []
    }
  },
  methods: {
    async addChallenge(challengeId) {
      if (this.profile.challenges.indexOf(challengeId) >= 0) {
        return
      }
      const self = this
      let ref = collection(db, 'profiles')
      let q = query(ref, where('userId', '==', self.profile.userId))
      let querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        querySnapshot.forEach(d => {
          let docRef = doc(db, 'profiles', d.id)
          self.profile.challenges.push(challengeId)
          updateDoc(docRef, { challenges: self.profile.challenges})
        })
      }
    }
  },
  async mounted() {
    const self = this
    let querySnapshot, ref, q
    if (liff.isInClient() && liff.isLoggedIn()) {
      liff.getProfile().then(profile => {
        self.profile = profile
      })
    } else {
      let ref = collection(db, 'profiles')
      let q = query(ref, where("userId", "==", "mumthealthtest"))
      let querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        querySnapshot.forEach(d => {
          self.profile = d.data()
        })
      }
    }
    console.log(self.profile)
    ref = collection(db, 'userGroups')
    q = query(ref, where("members", "array-contains", self.profile.userId))
    querySnapshot = await getDocs(q)
    querySnapshot.forEach(d=>{
      let data = d.data()
      data.id = d.id
      self.groups.push(data)
    })
    ref = collection(db, 'activity_records')
    q = query(ref,
        where('userId', '==', self.profile.userId),
        orderBy('startDateTime', 'desc'),
        limit(4)
    )
    querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      querySnapshot.forEach(d => {
        let data = d.data()
        data.id = d.id
        self.records.push(data)
      })
    }
    for (const g of self.groups) {
      let ref = collection(db, 'challenges')
      let q = query(ref, where('groups', 'array-contains', g.id))
      let querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        querySnapshot.forEach(d => {
          let data = d.data()
          data.id = d.id
          if (self.profile.challenges.indexOf(d.id) < 0)
            self.allChallenges.push(data)
        })
      }
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.badge {
  font-size: 64px;
}

</style>
