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
        activity_records: {
            walking: []
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_PROFILE(state, profile) {
            state.profile = profile
        },
        ADD_ACTIVITY(state, payload) {
            state.activity_records[payload.activity].push(payload.data)
        },
        DELETE_ACTIVITY(state, payload) {
            state.activity_records[payload.activity] =
                state.activity_records[payload.activity].filter(d=> d.id !== payload.id )
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
        }
    }
})

export default store