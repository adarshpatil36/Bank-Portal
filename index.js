window.onload = () => {
  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
  } else {
    window.location.href = "portal.html";
  }
};
