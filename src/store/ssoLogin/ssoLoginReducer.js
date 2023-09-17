import { SSO_LOGIN_STORE } from "./ssoLoginAction";

const initialState = {
    token: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SSO_LOGIN_STORE:
            return {
                token: action.payload
            };
        default:
            return state;
    }
}
