<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <div class="ion-text-center">
                <h1>Standing</h1>
                <p>{{ challengeTitle }}</p>
              </div>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-list-header>
                <h4>Your Standing</h4>
              </ion-list-header>
              <ion-item>
                <ion-col>
                  <ion-label>
                    {{ myRank }}
                  </ion-label>
                </ion-col>
                <ion-col size="7">
                  <ion-label>
                    {{ displayName }}
                  </ion-label>
                </ion-col>
                <ion-col>
                  <ion-badge color="warning">{{ mySteps }}</ion-badge>
                </ion-col>
                <ion-col>
                  <ion-label class="ion-text-right">steps</ion-label>
                </ion-col>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-list-header>
                <h4>Top 5 Groups</h4>
              </ion-list-header>
              <ion-item v-for="(item, index) in sortedGroupIds.slice(0, 5)" :key="item">
                <ion-col>
                  <ion-label>
                    {{ index + 1 }}
                  </ion-label>
                </ion-col>
                <ion-col size="7">
                  <ion-label>
                    {{ this.groupNames[item] }}
                  </ion-label>
                </ion-col>
                <ion-col>
                  <ion-badge color="warning">{{ sortedGroupSteps[index][1] }}</ion-badge>
                </ion-col>
                <ion-col>
                  <ion-label class="ion-text-right">steps</ion-label>
                </ion-col>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button @click="$router.push({ name: 'Ranking' })">
          <ion-icon :icon="arrowBackCircle"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="ReLoad" color="light">
          <ion-icon :icon="refreshOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonLabel,
  IonListHeader,
  IonFabButton,
  IonFab,
  IonIcon,
  IonItem,
  IonBadge
} from '@ionic/vue';
import {defineComponent} from 'vue';
import { arrowBackCircle, refreshOutline } from 'ionicons/icons'
import {mapGetters, mapState} from "vuex";
import { db } from '@/firebase';
import {collection, where, getDocs, query} from "firebase/firestore";
export default defineComponent({
  props: {
    timeout: { type: Number, default: 7000 },
  },
  name: "RankingChallenge",
  components: {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonPage,
    IonList,
    IonLabel,
    IonListHeader,
    IonFabButton,
    IonFab,
    IonIcon,
    IonBadge,
    IonItem,
  },
  setup () {
    return {
      arrowBackCircle,
      refreshOutline,
    }
  },
  data(){
    return{
      sortedUsteps: [],
      sortedUID: [],
      challengeId: '',
      userGroupsId: null,
      userSteps: {},
      groupSteps: {},
      groupNames: {},
      sortedGroupSteps: [],
      sortedGroupIds: [],
      challengeTitle: '',
    }
  },
  computed: {
    ...mapState(['user','profile','challenges','userGroup']),
    ...mapGetters(['displayName', 'userId']),
    myRank () {
      return this.sortedUID.indexOf(this.user.userId) + 1
    },
    mySteps () {
      return this.userSteps[this.userId]
    }
  },
  watch:{
    challengeId: async function() {
      await this.ResetData()
      await this.Loadactivity_submission()
    }
  },
  methods:{
    ReLoad(){
      this.ResetData()
      this.Loadactivity_submission()
    },
    ResetData(){
      this.userSteps = {}
      this.groupSteps = {}
      this.sortedUsteps = []
      this.sortedUID = []
      this.sortedGroupSteps = []
      this.sortedGroupIds = []
    },
    async Loadactivity_submission() {
      let ref = collection(db, 'activity_submission')
      let q = query(ref, where('challengeId', '==', this.challengeId ))
      let querySnapshot = await getDocs(q)
      for (let rec of querySnapshot.docs) {
        let data = rec.data()
        if (!(data.userId in this.userSteps)) {
          this.userSteps[data.userId] = 0
        }
        this.userSteps[data.userId] += parseInt(data.steps)
        if (!(data.userGroupId in this.groupSteps)) {
          this.groupSteps[data.userGroupId] = 0
        }
        this.groupSteps[data.userGroupId] += parseInt(data.steps)
      }
      for (var uid in this.userSteps) {
        this.sortedUsteps.push([uid, this.userSteps[uid]])
      }
      this.sortedUsteps.sort((a, b)=>{
        return a[1] - b[1];
      })
      for (let item of this.sortedUsteps) {
        this.sortedUID.push(item[0])
      }
      for (let gid in this.groupSteps) {
        this.sortedGroupSteps.push([gid, this.groupSteps[gid]])
      }
      this.sortedGroupSteps.sort((a, b) => {
        return a[1] - b[1]
      })
      for (let item of this.sortedGroupSteps) {
        this.sortedGroupIds.push(item[0])
      }
      console.log(this.groupNames)
    }
  },
  async mounted() {
    this.challengeId = this.$route.params.recordId
    let groupRef = collection(db, 'userGroups')
    let groupSnapshot = await getDocs(groupRef)
    for (let rec of groupSnapshot.docs) {
      let data = rec.data()
      this.groupNames[rec.id] = data.name
    }
  },
});
</script>

<style scoped>

</style>
