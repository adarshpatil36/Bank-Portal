"use strict";

const CONSTANTS = {
  API_HOST: "binubuo.p.rapidapi.com",
  API_KEY: "1f3eaaf7a7msh1d36133d9087be8p15f32ajsn2913fc18b847",
  AUTHORIZATION_VALUE: "undefined",
  FILTER_TYPE: {
    ALL: "All",
  },
  R_ACCOUNTTRANSACTION: "R_ACCOUNTTRANSACTION",
};

var transactionData = JSON.parse(
  '[{"R_ACCOUNTTRANSACTION":"Sell to Close"},{},{"R_ACCOUNTTRANSACTION":"Cap. Distribution"},{},{"R_ACCOUNTTRANSACTION":"Deposit"},{},{"R_ACCOUNTTRANSACTION":"Check"},{},{},{},{"R_ACCOUNTTRANSACTION":"Sell to Close"},{},{"R_ACCOUNTTRANSACTION":"Buy"},{"R_ACCOUNTTRANSACTION":"Transfer"},{"R_ACCOUNTTRANSACTION":"Interest"},{"R_ACCOUNTTRANSACTION":"Cap. Gains long"},{"R_ACCOUNTTRANSACTION":"Deposit"},{"R_ACCOUNTTRANSACTION":"Buy"},{"R_ACCOUNTTRANSACTION":"Move"},{"R_ACCOUNTTRANSACTION":"Online"},{"R_ACCOUNTTRANSACTION":"Sell"},{"R_ACCOUNTTRANSACTION":"Charge"},{"R_ACCOUNTTRANSACTION":"Interest"},{"R_ACCOUNTTRANSACTION":"Withdrawal"},{"R_ACCOUNTTRANSACTION":"Cap. Gains Short"},{},{"R_ACCOUNTTRANSACTION":"Dividend"},{"R_ACCOUNTTRANSACTION":"Sell"},{},{"R_ACCOUNTTRANSACTION":"Sell to Close"}]'
);

var transactionType;
var selectedFilterType = CONSTANTS.FILTER_TYPE.ALL;
window.onload = () => {
  let url;
  document.getElementById("userName").innerHTML =
    sessionStorage.getItem("loggedInUser");

  document.getElementById("balance").innerHTML = `$ ${localStorage.getItem(
    "balance"
  )}`;

  navigator.geolocation.getCurrentPosition((position) => {
    url =
      "https://us1.locationiq.com/v1/reverse.php?key=pk.6202b2b9b4c51cce665354eed017a565&lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude;

    fetch(url)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        document.getElementById("loginLocation").innerHTML =
          data.getElementsByTagName("result")[0].childNodes[0].nodeValue;
      });
  });

  url =
    "https://binubuo.p.rapidapi.com/generator/finance/account_transaction?rows=30";
  const options = {
    headers: {
      authorization: CONSTANTS.AUTHORIZATION_VALUE,
      "x-rapidapi-host": CONSTANTS.API_HOST,
      "x-rapidapi-key": CONSTANTS.API_KEY,
    },
  };

  let uniqueTransactionType = new Set();

  transactionData = transactionData.filter((item) =>
    item.hasOwnProperty(CONSTANTS.R_ACCOUNTTRANSACTION)
  );
  transactionData.map((item) => (item["amount"] = Math.random() * 100000));

  transactionData.forEach((item, index) => {
    /** For deep copy of JS object using stringify and parse */
    const obj = JSON.parse(JSON.stringify(item));

    const date = randomDate(new Date(2020, 0, 1), new Date());
    const id = Math.floor(Math.random() * 1000000);
    transactionData[index] = { id: id, date: date, ...obj };
    uniqueTransactionType.add(item[CONSTANTS.R_ACCOUNTTRANSACTION]);
  });

  transactionType = Array.from(uniqueTransactionType);

  const ele = document.getElementById("filter");
  for (let i = 0; i < Object.values(transactionType).length; i++) {
    ele.innerHTML =
      ele.innerHTML +
      '<option value = "' +
      i +
      '">' +
      String(transactionType[i]) +
      "</option>";
  }
};

const filterData = (ele) => {
  selectedFilterType = ele.value;
};

const search = () => {
  let res;
  if (selectedFilterType === CONSTANTS.FILTER_TYPE.ALL) res = transactionData;
  else {
    res = transactionData.filter(
      (item) =>
        item.R_ACCOUNTTRANSACTION === transactionType[selectedFilterType]
    );
  }
  renderTabularData(res);
};

const randomDate = (start, end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const renderTabularData = (data) => {
  const ele = document.getElementById("transactionDetails");
  let tableData =
    "<table><tr><th>Transaction Date</th><th>Transaction Type</th><th>Transaction Amount</th</tr>";
  Object.values(data).forEach((item) => {
    tableData =
      tableData +
      "<tr><td>" +
      item["date"].toLocaleDateString() +
      "</td><td>" +
      item[CONSTANTS.R_ACCOUNTTRANSACTION] +
      "</td><td>" +
      item["amount"] +
      "</td></tr>";
  });
  tableData += "</td></table>";
  ele.innerHTML = tableData;
};

const logout = () => {
  console.log("User logged off succesfully");
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
};
