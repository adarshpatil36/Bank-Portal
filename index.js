window.onload = () => {
  if (!sessionStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
  } else {
    window.location.href = "portal.html";
  }
};
