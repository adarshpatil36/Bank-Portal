"use strict";
var transactionData = [
  {
    R_ACCOUNTTRANSACTION: "Sell to Close",
  },
  {},
  {
    R_ACCOUNTTRANSACTION: "Cap. Distribution",
  },
  {},
  {
    R_ACCOUNTTRANSACTION: "Deposit",
  },
  {},
  {
    R_ACCOUNTTRANSACTION: "Check",
  },
  {},
  {},
  {},
  {
    R_ACCOUNTTRANSACTION: "Sell to Close",
  },
  {},
  {
    R_ACCOUNTTRANSACTION: "Buy",
  },
  {
    R_ACCOUNTTRANSACTION: "Transfer",
  },
  {
    R_ACCOUNTTRANSACTION: "Interest",
  },
  {
    R_ACCOUNTTRANSACTION: "Cap. Gains long",
  },
  {
    R_ACCOUNTTRANSACTION: "Deposit",
  },
  {
    R_ACCOUNTTRANSACTION: "Buy",
  },
  {
    R_ACCOUNTTRANSACTION: "Move",
  },
  {
    R_ACCOUNTTRANSACTION: "Online",
  },
  {
    R_ACCOUNTTRANSACTION: "Sell",
  },
  {
    R_ACCOUNTTRANSACTION: "Charge",
  },
  {
    R_ACCOUNTTRANSACTION: "Interest",
  },
  {
    R_ACCOUNTTRANSACTION: "Withdrawal",
  },
  {
    R_ACCOUNTTRANSACTION: "Cap. Gains Short",
  },
  {},
  {
    R_ACCOUNTTRANSACTION: "Dividend",
  },
  {
    R_ACCOUNTTRANSACTION: "Sell",
  },
  {},
  {
    R_ACCOUNTTRANSACTION: "Sell to Close",
  },
];

var transactionType;
// var transactionData = null;
window.onload = () => {
  const url =
    "https://binubuo.p.rapidapi.com/generator/finance/account_transaction?rows=30";
  const options = {
    headers: {
      authorization: "undefined",
      "x-rapidapi-host": "binubuo.p.rapidapi.com",
      "x-rapidapi-key": "1f3eaaf7a7msh1d36133d9087be8p15f32ajsn2913fc18b847",
    },
  };

  let uniqueTransactionType = new Set();

  /** Need to add preflight api call as per api documentation  */
  // fetch(url, options)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(">> ", data);
  //     transactionData = data.filter((item) =>
  //       item.hasOwnProperty("R_ACCOUNTTRANSACTION")
  //     );
  //     transactionData.map((item) => (item["amount"] = Math.random() * 1000));

  //     const rootDiv = document.getElementById("transactionDetails");

  //     rootDiv.append(document.createElement(''))
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  transactionData = transactionData.filter((item) =>
    item.hasOwnProperty("R_ACCOUNTTRANSACTION")
  );
  transactionData.map((item) => (item["amount"] = Math.random() * 1000));

  transactionData.forEach((item, index) => {
    /** For deep copy of JS object using stringify and parse */
    const obj = JSON.parse(JSON.stringify(item));

    const date = randomDate(new Date(2020, 0, 1), new Date());
    const id = Date.now();
    transactionData[index] = { id: id, date: date, ...obj };
    uniqueTransactionType.add(item["R_ACCOUNTTRANSACTION"]);
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

const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const filterData = (ele) => {
  let res;
  if (ele.value === "All") res = transactionData;
  else {
    res = transactionData.filter(
      (item) => item.R_ACCOUNTTRANSACTION === transactionType[ele.value]
    );
  }
  console.log(">>> ", res);
};
