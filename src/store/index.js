import { createStore } from 'vuex'

export default createStore({
  state: {
    activeLogin:false,
  },
  mutations: {
    activeLogin () {
      this.state.activeLogin = true;
    },
    activeHidden () {
      this.state.activeLogin = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
