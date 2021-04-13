export const state = () => ({
  blog: {
    cardTags: "",
    posts: [],
    lastFetch: 0
  },
});

// Getters
export const getters = {
  blogCardTags(state) {
    return state.blog.cardTags;
  },
  blogPosts(state) {
    return state.blog.posts;
  },
  blogLastFetch(state) {
    return state.blog.lastFetch;
  }
};

export const mutations = {
  setBlogCardTags(state, data) {
    state.blog = {
      ...state.blog,
      cardTags: data
    };
  },
  setBlogPosts(state, posts) {
    state.blog = {
      ...state.blog,
      lastFetch: new Date().getTime(),
      posts: posts
    };
  }
};

export const actions = {
  setBlogCardTags({ commit }, data) {
    commit("setBlogCardTags", data);
  },
  setBlogPosts({ commit }, posts) {
    commit("setBlogPosts", posts);
  }
};
