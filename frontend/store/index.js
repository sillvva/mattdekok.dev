export const state = () => ({
  blogCardTags: "",
  blogPosts: [],
  postsTimestamp: 0,
});

// Getters
export const getters = {
  blogCardTags(state) {
    return state.blogCardTags;
  },
  blogPosts(state) {
    return state.blogPosts;
  },
  postsTimestamp(state) {
    return state.postsTimestamp;
  }
};

export const mutations = {
  setBlogCardTags(state, data) {
    state.blogCardTags = data;
  },
  setBlogPosts(state, posts) {
    state.blogPosts = posts;
  },
  setPostsTimestamp(state, timestamp) {
    state.postsTimestamp = timestamp;
  }
};

export const actions = {
  setBlogCardTags({ commit }, data) {
    commit("setBlogCardTags", data);
  },
  setBlogPosts({ commit }, posts) {
    commit("setBlogPosts", posts);
    commit("setPostsTimestamp", new Date().getTime());
  }
};
