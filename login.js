"use strict";

const CONSTANTS = {
  PASSWORD_MISMATCH: "Password Mismatch",
};

function signUp(theForm) {
  const ele = document.getElementById("errorMessage");
  if (theForm[4].value === theForm[3].value) {
    ele.style.visibility = "hidden";
    window.location.href = "index.html";
    localStorage.setItem(
      "loggedInUser",
      `${theForm[0].value} ${theForm[1].value}`
    );
  } else {
    ele.style.visibility = "visible";
    ele.innerHTML = CONSTANTS.PASSWORD_MISMATCH;
  }
  return false;
}
