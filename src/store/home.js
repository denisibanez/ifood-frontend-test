export default {
  state: {
    albums: {
      entry: []
    },
  },

  mutations: {
    setAlbum(state, param) {
      state.albums = param
    },
  },

  actions: {
    setAlbum(context, param) {
      context.commit('setAlbum', param)
    },
  },

  getters: {
    albums: state => {
      return state.albums
    },
  }
}