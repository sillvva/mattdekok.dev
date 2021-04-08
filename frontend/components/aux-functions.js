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

export const apiRedirect = () => {
  if (!process.server) {
    if (window.location.host.includes("api.mattdekok.dev")) {
      window.location.replace(window.location.toString().replace('api.matt', 'www.matt'));
    }
  }
}

export default {
  apiRedirect,
  formatDate
};
