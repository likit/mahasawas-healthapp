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
                    The user is: {{ profile.firstname }} {{ profile.lastname }}
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
                <ion-progress-bar value="0.0"></ion-progress-bar>
                <ion-list>
                  <ion-item lines="full" v-for="rec in activity_records.slice(0, 4)" :key="rec.id">
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
        <ion-row v-for="ch in challenges" :key="ch.id">
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
                <ion-button v-else
                            @click="$router.push({ name: 'ChallengeDetail', params: { recordId: ch.id}})">
                  Detail
                </ion-button>
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
import { collection, getDocs, query, where, orderBy, doc, updateDoc, addDoc } from "firebase/firestore";
import {db} from "@/firebase";
import { mapState} from "vuex";
import axios from "axios";

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
  computed: {
    ...mapState(['user', 'profile', 'activity_records', 'challenges', 'groups']),
  },
  // mapState is async operation, we need to watch for when the data is ready
  watch: {
    user: async function (newValue) {
      await this.loadGroups(newValue.userId)
      await this.loadChallenges()
      await this.loadActivities(newValue.userId)
    }
  },
  data () {
    return {
      authToken: null
    }
  },
  mounted () {
    this.authToken = this.$route.query.token
    if (this.authToken !== null && this.authToken !== undefined) {
      this.loadProfile()
    } else {
      // this.$router.push({ name: 'Prohibition' })
      this.setUpUser({
        userId: 'mahidol-test',
        userName: 'mahidol-test',
        firstNameTh: 'ลิขิต',
        lastNameTh: 'ปรียานนท์',
        titleNameTh: 'ดร.',
        facultyNameTh: 'คณะเทคนิคการแพทย์',
        groupType: 'staff',
      })
    }
  },
  methods: {
    async setUpUser(data) {
      let ref = collection(db, 'users')
      let q = query(ref, where('userId', '==', data.userId))
      let querySnapshot = await getDocs(q)
      let userData = {
        userId: data.userId,
        userName: data.userName
      }
      if (querySnapshot.empty) {
        await addDoc(ref, userData)
      }
      this.$store.commit('SET_USER', userData)
      let profileData = {
        firstNameTh: data.firstNameTh,
        lastNameTh: data.lastNameTh,
        titleNameTh: data.titleNameTh,
        facultyNameTh: data.facultyNameTh,
        groupType: data.groupType,
        phone: '',
        challenges: [],
        userId: data.userId
      }
      this.$store.commit('SET_PROFILE', {
        firstname: data.firstNameTh,
        lastname: data.lastNameTh,
        title: data.titleNameTh,
        phone: null,
        userId: data.userId,
        updateDateTime: null,
        challanges: [],
      })
      let profileRef = collection(db, 'profiles')
      q = query(profileRef, where('userId', '==', data.userId))
      querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        await addDoc(profileRef, profileData)
      } else {
        for (let d of querySnapshot.docs) {
          let docRef = doc(db, 'profiles', d.id)
          console.log('Updating the user profile...')
          await updateDoc(docRef, profileData)
        }
      }
    },
    async loadProfile() {
      await axios.post('https://dcu-sitauth.mahidol.ac.th/auth/v1/sso/profile',
          {
            "token": this.authToken,
            "clientId": "8fd61a82-ba20-4278-82b0-5b175b489189",
            "clientSecret": "x67IirZdDTCHp1pLor6mAdVT107qZ0Yv1mi8O6VB"
          }).then(async res => {
            this.setUpUser(res)
      }).catch(e => {
        alert(e.toString())
      })
    },
    async addChallenge(challengeId) {
      if (this.profile.challenges.indexOf(challengeId) < 0) {
        let ref = collection(db, 'profiles')
        let q = query(ref, where('userId', '==', this.user.userId))
        let querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          querySnapshot.forEach(d => {
            let docRef = doc(db, 'profiles', d.id)
            this.$store.dispatch('addUserChallenge', challengeId)
            updateDoc(docRef, { challenges: this.profile.challenges})
          })
        }
      }
    },
    async loadGroups (userId) {
      let ref = collection(db, 'userGroups')
      let q = query(ref, where("members", "array-contains", userId))
      let querySnapshot = await getDocs(q)
      querySnapshot.forEach(d => {
        let data = d.data()
        data.id = d.id
        this.$store.dispatch('addGroup', data)
      })
    },
    async loadActivities(userId) {
      if (this.activity_records.length == 0) {
        let ref = collection(db, 'activity_records')
        let q = query(ref,
            where('userId', '==', userId),
            orderBy('startDateTime', 'desc'),
        )
        let querySnapshot = await getDocs(q)
        querySnapshot.forEach(d => {
          let data = d.data()
          data.id = d.id
          this.$store.dispatch('addActivity', data)
        })
      }
    },
    async loadChallenges () {
      for (const g of this.groups) {
        let ref = collection(db, 'challenges')
        let q = query(ref, where('groups', 'array-contains', g.id))
        let querySnapshot = await getDocs(q)
        querySnapshot.forEach(d => {
          let data = d.data()
          data.id = d.id
          this.$store.dispatch('addChallenge', data)
        })
      }
    }
  },
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
