"use strict";

const userDataBase = [
  {
    uname: "Adarsh",
    password: "Qwerty@123",
  },
  {
    uname: "Jarvis",
    password: "Jarvis@123",
  },
];

const CONSTANTS = {
  PASSWORD_MISMATCH: "Password Mismatch",
  LOGGEDINUSER: "loggedInUser",
};

const redirectToSignUp = () => {
  window.location.href = "signup.html";
};

const login = (theForm) => {
  localStorage.setItem(CONSTANTS.LOGGEDINUSER, `${theForm[0].value}`);
  window.location.href = "portal.html";
  return false;
};

const signUp = (theForm) => {
  const ele = document.getElementById("errorMessage");
  if (theForm[4].value === theForm[3].value) {
    ele.style.display = "none";
    window.location.href = "portal.html";
    localStorage.setItem(CONSTANTS.LOGGEDINUSER, `${theForm[0].value}`);
  } else {
    ele.style.display = "initial";
    ele.innerHTML = CONSTANTS.PASSWORD_MISMATCH;
  }
  return false;
};
