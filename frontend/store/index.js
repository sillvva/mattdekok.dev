import axios from "axios";

export const state = () => ({
  blogSearch: "",
  blogCardTags: "",
  blogPosts: [],
  lastPostFetch: 0
});

// Getters
export const getters = {
  blogSearch(state) {
    return state.blogSearch;
  },
  blogCardTags(state) {
    return state.blogCardTags;
  },
  blogPosts(state) {
    return state.blogPosts;
  },
  lastPostFetch(state) {
    return state.lastPostFetch;
  }
};

export const mutations = {
  setBlogSearch(state, data) {
    state.blogSearch = data;
  },
  setBlogCardTags(state, data) {
    state.blogCardTags = data;
  },
  setBlogPosts(state, data) {
    state.blogPosts = data;
  },
  setLastPostFetch(state, data) {
    state.lastPostFetch = data;
  }
};

export const actions = {
  setBlogSearch({ commit }, data) {
    commit("setBlogSearch", data);
  },
  setBlogCardTags({ commit }, data) {
    commit("setBlogCardTags", data);
  },
  async getBlogPosts({ commit, state }) {
    const time = new Date().getTime();
    if (time - state.lastPostFetch < 1000 * 60 * 5) return state.blogPosts;
    return axios
      .get("/blogAPI")
      .then(response => {
        commit("setBlogPosts", response.data.posts);
        commit("lastPostFetch", time);
        return response.data.posts;
      })
      .catch(err => {
        console.log(err);
      });
  },
  async getBlogPost({ state }, slug) {
    if (!state.blogPosts.find(post => post.slug === slug)) return null;
    return axios
      .get(`/blogAPI?slug=${slug}`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
