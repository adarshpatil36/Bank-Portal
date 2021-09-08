"use strict";

const CONSTANTS = {
  PASSWORD_MISMATCH: "Password Mismatch",
  LOGGEDINUSER: "loggedInUser",
};

const redirectToSignUp = () => {
  window.location.href = "signup.html";
};

const login = (theForm) => {
  localStorage.setItem(CONSTANTS.LOGGEDINUSER, `${theForm[0].value}`);
  window.location.href = "index.html";
  return false;
};

const signUp = (theForm) => {
  const ele = document.getElementById("errorMessage");
  if (theForm[4].value === theForm[3].value) {
    ele.style.display = "none";
    window.location.href = "index.html";
    localStorage.setItem(
      CONSTANTS.LOGGEDINUSER,
      `${theForm[0].value} ${theForm[1].value}`
    );
  } else {
    ele.style.display = "initial";
    ele.innerHTML = CONSTANTS.PASSWORD_MISMATCH;
  }
  return false;
};
