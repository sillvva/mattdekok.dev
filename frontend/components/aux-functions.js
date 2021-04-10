export const formatDate = (date, time) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return time
    ? new Date(date).toLocaleString("en", {
        ...options,
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short"
      })
    : new Date(date).toLocaleDateString("en", options);
};

export const removeQueryParam = (path, param) => {
  const anchor = document.createElement("A");
  anchor.setAttribute("href", path);
  const search = anchor.search;
  const params = new URLSearchParams(search);
  params.delete(param);
  if (params.toString().length === 0) return path.replace(search, "");
  else return path.replace(search, `?${params.toString()}`);
};

export const setQueryParam = (path, param, value) => {
  const anchor = document.createElement("A");
  anchor.setAttribute("href", path);
  let search = anchor.search;
  const hash = anchor.hash;
  const params = new URLSearchParams(search);
  params.set(param, value.toString().trim());
  search = search.replace(search, `?${params.toString()}`);
  return `${anchor.pathname}${search}${hash}`;
};

var timers = {};
export const throttle = (callback, ms, id, ...args) => {
  if (!id) id = "Don't call this twice without an id";
  if (timers[id]) {
    clearTimeout(timers[id]);
  }
  timers[id] = setTimeout(callback, ms, ...args);
};

export default {
  formatDate,
  removeQueryParam,
  setQueryParam,
  throttle
};
