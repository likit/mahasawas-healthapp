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
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_PROFILE(state, profile) {
            state.profile = profile
        }
    },
    actions: {
        updateUser({ commit }, user) {
            commit('SET_USER', user)
        },
        updateProfile({ commit }, profile) {
            commit('SET_PROFILE', profile)
        }
    }
})

export default store