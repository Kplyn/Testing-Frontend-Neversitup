export const SSO_LOGIN_STORE = "SSO_LOGIN_STORE";

export const ssoLoginData = (message) => {
    const data = message;
    return { type: SSO_LOGIN_STORE, payload: data };
  };
