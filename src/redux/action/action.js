export const SIGN_OUT = "SIGN_OUT";
export const SIGN_IN = "SIGN_IN";

export function signIn (firstname, lastname, email) {
    return {type : SIGN_IN, firstname : firstname, lastname : lastname, email : email};
}

export function signOut () {
    return {type : SIGN_OUT};
}