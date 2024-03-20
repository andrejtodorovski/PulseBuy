export const setAuthToken = (token: string) => {
  sessionStorage.setItem("AuthorizationToken", `Bearer ${token}`);
};

export async function interceptedFetch(input: string, init: any) {
  const apiURL = import.meta.env.VITE_API_URL;
  console.log(apiURL);

  const token = getAuthToken();
  if (token) {
    if (!init.headers) {
      init.headers = {};
    }
    init.headers.Authorization = token;
  }
  return fetch(apiURL + input, init);
}

export const removeAuthToken = () => {
  sessionStorage.removeItem("AuthorizationToken");
  localStorage.removeItem("userId");
  window.location.reload();
};

export const getAuthToken = () => {
  if (typeof sessionStorage !== 'undefined' && sessionStorage !== null) {
    return sessionStorage.getItem("AuthorizationToken");
  } else {
    return null;
  }
};

export const isUserLoggedIn = () => {
  return getAuthToken() !== null;
};
