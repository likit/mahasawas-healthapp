<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-text>
              <h1>Jog Record</h1>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item detail v-for="record in records" :key="record.id" @click="goToDetail(record.id)">
                <ion-label>
                  {{ record.startDateTime.toDate().toLocaleString() }}
                  <p>
                    Distance {{ record.distance }} km, Steps {{ record.steps }}, Est. calories {{ ((record.endDateTime - record.startDateTime) / 60) * 5.23 }}
                  </p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" href="/activities/walk-record-form">
              Add
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonButton, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonPage, IonRow, IonText} from "@ionic/vue";
import {collection, getDocs, where, query} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  name: "JogRecord",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  },
  data () {
    return {
      records: []
    }
  },
  methods: {
    goToDetail (recordId) {
      this.$router.push({ name: 'WalkRecordDetail', params: { recordId: recordId}})
    }
  },
  async mounted () {
    const ref = collection(db, 'activity_records')
    const q = query(ref, where("type", "==", "jogging"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(d=>{
      let data = d.data()
      data.id = d.id
      this.records.push(data)
    })
  }
}
</script>

<style scoped>

</style>