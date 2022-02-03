import { createStore} from "vuex";

const store = createStore({
    state: {
        user: {
            userId: null,
            displayName: null,
            pictureUrl: null,
            statusMessage: null,
        },
        profile: {
            challenges: [],
        },
        activity_records: [],
        meditation_records: [],
        mood_records: [],
        goals: [],
        userGroup: null,
        groups: [],
        challenges: [],
        drink_records: {
          datetxt: null,
          drinkdate: null,
          drinkwater: null,
          userId: null
        },
        currentWeight:null,
        currentHeight: null,
    },
    getters: {
        userId: state => {
            return state.user.userId
        },
        displayName: state => {
            if (state.user.firstNameTh !== '') {
                return state.profile.firstNameTh + ' ' + state.profile.lastNameTh
            } else {
                return state.profile.firstNameEn + ' ' + state.profile.lastNameEn
            }
        },
        walkRecords: state => {
            return state.activity_records.filter(d => d.type === 'walking')
        },
        JogRecords: state => {
            return state.activity_records.filter(d => d.type === 'jogging')
        },
        swimRecords: state => {
            return state.activity_records.filter(d => d.type === 'swimming')
        },
        BikeRecords: state => {
            return state.activity_records.filter(d => d.type === 'biking')
        },
        DanceRecords: state => {
            return state.activity_records.filter(d => d.type === 'dancing')
        },
        SportRecords: state => {
            return state.activity_records.filter(d => d.type === 'sport')
        },
        JumpRopeRecords: state => {
            return state.activity_records.filter(d => d.type === 'jump rope')
        },
        HulaHoopRecords: state => {
            return state.activity_records.filter(d => d.type === 'hulahoop')
        },
        BodyWeightRecords: state => {
            return state.activity_records.filter(d => d.type === 'bodyweight')
        },
        WeightTrainingRecords: state => {
            return state.activity_records.filter(d => d.type === 'weightTraining')
        },
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_PROFILE(state, profile) {
            state.profile = profile
        },
        ADD_ACTIVITY(state, payload) {
            state.activity_records.push(payload)
        },
        ADD_MOOD(state, payload) {
            state.mood_records.push(payload)
        },
        INSERT_MOOD(state, payload) {
            state.mood_records.unshift(payload)
        },
        ADD_MEDITATION(state, payload) {
            state.meditation_records.push(payload)
        },
        INSERT_MEDITATION(state, payload) {
            state.meditation_records.unshift(payload)
        },
        ADD_GOAL(state, payload) {
            state.goals.push(payload)
        },
        RESET_GOAL_LIST(state, payload) {
            state.goals = state.goals.filter(g=>{ g.id != payload.id })
        },
        INSERT_ACTIVITY(state, payload) {
            state.activity_records.unshift(payload)
        },
        DELETE_ACTIVITY(state, payload) {
            state.activity_records = state.activity_records.filter(d => d.id !== payload )
        },
        SET_USER_GROUP(state, userGroup) {
            state.userGroup = userGroup
        },
        ADD_GROUP(state, payload) {
            state.groups.push(payload)
        },
        ADD_CHALLENGE(state, payload) {
            state.challenges.push(payload)
        },
        ADD_USER_CHALLENGE(state, payload) {
            state.profile.challenges.push(payload)
        },
        SET_Drink(state,drink_records){
            state.drink_records = drink_records
        },
        SET_Weight(state,weight){
            state.currentWeight = weight
        },
        SET_Height(state,height){
            state.currentHeight = height
        }
    },
    actions: {
        updateUser({ commit }, user) {
            commit('SET_USER', user)
        },
        updateProfile({ commit }, profile) {
            commit('SET_PROFILE', profile)
        },
        addActivity({ commit }, payload) {
            commit('ADD_ACTIVITY', payload)
        },
        insertActivity({ commit }, payload) {
            commit('INSERT_ACTIVITY', payload)
        },
        addMeditation({ commit }, payload) {
            commit('ADD_MEDITATION', payload)
        },
        insertMeditation({ commit }, payload) {
            commit('INSERT_MEDITATION', payload)
        },
        addMood({ commit }, payload) {
            commit('ADD_MOOD', payload)
        },
        insertMood({ commit }, payload) {
            commit('INSERT_MOOD', payload)
        },
        addGoal({ commit }, payload) {
            commit('ADD_GOAL', payload)
        },
        resetGoalList({ commit }, payload) {
            commit('RESET_GOAL_LIST', payload)
        },
        deleteActivity({ commit }, payload) {
            commit('DELETE_ACTIVITY', payload)
        },
        setUserGroup({ commit }, userGroup) {
            commit('SET_USER_GROUP', userGroup)
        },
        addGroup({ commit }, payload) {
            commit('ADD_GROUP', payload)
        },
        addChallenge({ commit }, payload) {
            commit('ADD_CHALLENGE', payload)
        },
        addUserChallenge({ commit }, payload) {
            commit('ADD_USER_CHALLENGE', payload)
        },
        updateDrink_Records({ commit }, drink_records){
            commit('SET_Drink', drink_records)
        },
        updateWeight({commit},weight){
            commit('SET_Weight', weight)
        },
        updateHeight({commit},height){
            commit('SET_Height', height)
        }
    }
})

export default store