 const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

 const dropdowns = document.querySelectorAll(".dropdown select");
 
 const btn = document.querySelector("form button");
 const fromCurr = document.querySelector(".from select");
 const toCurr = document.querySelector(".to select");



  for(let select of dropdowns) {
    for (let currCode in countryList) {
       let newOPtion = document.createElement("option");
       newOPtion.innerText = currCode;
       newOPtion.value = currCode;
       if (select.name === "from" && currCode === "USD") {
        newOPtion.selected = "selected";
       }else if(select.name === "to" && currCode === "PKR") {
        newOPtion.selected = "selected";
       } 
       select.append(newOPtion);

 }
 select.addEventListener("change", (evt) => {
  updateFlag(evt.target);
 });
 }

 updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  } 
  // console.log(fromCurr.value, toCurr.value);
 const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = (amtVal * rate).toFixed(2);

  document.querySelector(".msg").innerText = 
  `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};

 const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode]; // for PKR CC will be PK
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
 };

btn.addEventListener("click", (evt) =>{
evt.preventDefault();
updateExchangeRate();
});

 window.addEventListener("load", () => {
  updateExchangeRate();
 });

