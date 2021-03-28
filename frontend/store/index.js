export const state = () => ({
  blogSearch: ""
});

// Getters
export const getters = {
  blogSearch(state) {
    return state.blogSearch;
  }
};

export const mutations = {
  setBlogSearch(state, data) {
    state.blogSearch = data;
  }
};

export const actions = {
  setBlogSearch({ commit }, data) {
    commit("setBlogSearch", data);
  }
};
