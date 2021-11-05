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
            title: null,
            firstname: null,
            lastname: null,
            challenges: [],
            phone: null,
            updateDateTime: null,
            userId: null
        },
        activity_records: [],
        groups: [],
        challenges: [],
    },
    getters: {
        userId: state => {
            return state.user.userId
        },
        displayName: state => {
            return state.user.displayName
        },
        walkRecords: state => {
            return state.activity_records.filter(d => d.type === 'walking')
        },
        JogRecords: state => {
            return state.activity_records.filter(d => d.type === 'jogging')
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
        DELETE_ACTIVITY(state, payload) {
            state.activity_records = state.activity_records.filter(d => d.id !== payload )
        },
        ADD_GROUP(state, payload) {
            state.groups.push(payload)
        },
        ADD_CHALLENGE(state, payload) {
            state.challenges.push(payload)
        },
        ADD_USER_CHALLENGE(state, payload) {
            state.profile.challenges.push(payload)
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
        deleteActivity({ commit }, payload) {
            commit('DELETE_ACTIVITY', payload)
        },
        addGroup({ commit }, payload) {
            commit('ADD_GROUP', payload)
        },
        addChallenge({ commit }, payload) {
            commit('ADD_CHALLENGE', payload)
        },
        addUserChallenge({ commit }, payload) {
            commit('ADD_USER_CHALLENGE', payload)
        }
    }
})

export default store