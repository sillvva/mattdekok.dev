export const state = () => ({
  blogCardTags: "",
});

// Getters
export const getters = {
  blogCardTags(state) {
    return state.blogCardTags;
  }
};

export const mutations = {
  setBlogCardTags(state, data) {
    state.blogCardTags = data;
  }
};

export const actions = {
  setBlogCardTags({ commit }, data) {
    commit("setBlogCardTags", data);
  }
};
