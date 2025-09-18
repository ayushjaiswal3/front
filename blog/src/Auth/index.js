export const isLoggedIn = () => {
  const data = JSON.parse(localStorage.getItem("data") || "{}");
  return data.userDto && data.token;
};
export const doLogin = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
export const doLogout = () => {
  localStorage.removeItem("data");
};
export const getCurrentUserDetail = () => {
  const data = localStorage.getItem("data");

  if (data) {
    try {
      const parsed = JSON.parse(data);

      if (parsed.userDto) {
        return parsed.userDto;
      }
      if (parsed.user) return parsed.user;
      if (parsed.data?.user) return parsed.data.user;

      return {};
    } catch (e) {
      console.error("Failed to parse user data:", e);
      return {};
    }
  } else {
    console.log("No data in localStorage");
  }
  return {};
};

export const getToken = () => {
  const data = localStorage.getItem("data");
  if (data) {
    const parsed = JSON.parse(data);
    return parsed.token || "";
  }
  return "";
};
