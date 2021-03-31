export const state = () => ({
  blogSearch: "",
  blogCardTags: ""
});

// Getters
export const getters = {
  blogSearch(state) {
    return state.blogSearch;
  },
  blogCardTags(state) {
    return state.blogCardTags;
  }
};

export const mutations = {
  setBlogSearch(state, data) {
    state.blogSearch = data;
  },
  setBlogCardTags(state, data) {
    state.blogCardTags = data;
  }
};

export const actions = {
  setBlogSearch({ commit }, data) {
    commit("setBlogSearch", data);
  },
  setBlogCardTags({ commit }, data) {
    commit("setBlogCardTags", data);
  }
};
