export default {
    namespaced: true,

    state: {
        user_store: [],
        user_latLng: {},
        user_city: {},
        mitienda: [],
        visitor_id: null,

    },

    mutations: {
        AddUser(state, payload) {
            state.user_store = payload
        },
        AddUserlatLng(state, payload) {
            state.user_latLng = payload
        },
        AddUserCity(state, payload) {
            state.user_city = payload
        },
        ClearUser(state) {
            state.user_store = []
        },
        AddMiTienda(state, payload) {
            state.mitienda = payload
        },
        ClearTiendaState(state) {
            state.mitienda.splice(0, state.mitienda.length);
        },
        AddVisitorId(state, payload) {
            state.visitor_id = payload
        },
        ClearVisitorId(state) {
            state.visitor_id = null
        }


    },
    actions: {


    },
    getters: {

    }

}