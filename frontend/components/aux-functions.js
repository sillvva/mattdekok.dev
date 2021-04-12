export const formatDate = (date, time) => {
  return new Date(date)[`toLocale${time ? "" : "Date"}String`]("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(time && {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short"
    })
  });
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
  params.set(param, value.toString());
  search = search.replace(search, `?${params.toString()}`);
  return `${anchor.pathname}${search}${hash}`;
};

export default {
  formatDate,
  removeQueryParam,
  setQueryParam
};
