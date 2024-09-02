const plants = document.querySelectorAll(".plantspic");
const plantsDiv = document.querySelectorAll(".plants");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const name = document.querySelector(".name");
const price = document.querySelector(".price");
const family = document.querySelector(".family");
const nav = document.querySelector(".nav");
const cart = document.querySelector(".cart");
const modalcart = document.querySelector(".modalcart");
const cartMenu = document.querySelector(".cartmenu");
const btnCloseModalCart = document.querySelector(".btn--close-modalcart");
const el1 = document.querySelector(".element1");
const overlaycart = document.querySelector(".overlaycart");
const modalcartForm = document.querySelector(".modalcart__form");
const total = document.querySelector(".total");
const buy = document.querySelector(".buy");
const buyModal = document.querySelector(".buy-modal");
const overlaybuy = document.querySelector(".overlaybuy");
const btnCloseModalBuy = document.querySelector(".btn--close-modalbuy");
const btnOrder = document.querySelector(".order-product");
const orderedModal = document.querySelector(".modalOrdered");
const submit = document.querySelector(".submit");
const btnCloseModalOrdered = document.querySelector(".btn--close-modalOrdered");
const overlayordered = document.querySelector(".overlayordered");
const modalDone = document.querySelector(".modalDone");
const overlaydone = document.querySelector(".overlaydone");
const arrow = document.querySelector(".arrow");
const dropdown = document.querySelector(".dropdown");
const arrow2 = document.querySelector(".arrow2");
const dropdown2 = document.querySelector(".dropdown2");
const priceRange = document.querySelector(".priceRange-flex");
const stylePrice = getComputedStyle(priceRange);

let priceMarginPixel = stylePrice.marginLeft;
const dropdownStyle = getComputedStyle(dropdown);

let dropdownMarginPixel = dropdownStyle.marginLeft;
let dropPix = parseInt(dropdownMarginPixel.replace("px", ""));
let pixel = parseInt(priceMarginPixel.replace("px", ""));
let rem = pixel / 10;
let dropRem = dropPix / 10;
const srchInput = document.querySelector("#search-input");
const spcInput = document.querySelector("#input-species");

const clear = document.querySelector(".clear");
const clearNames = document.querySelector(".clearNames");
const drpbt = document.querySelector(".dropbtn");
const drpbt2 = document.querySelector(".dropbtn2");
const plantsStyle = getComputedStyle(plantsDiv[0]);

const clearStyles = getComputedStyle(clear);

let x = 430;
let y = 375;
let iteracia = 0;
let scrW = window.screen.width;
const mediaQuery440 = window.matchMedia("(max-width: 440px)");

let totalPrice = 0;
let counterCart = 0;
let clickedSEARCHFAM = false;
let clickedSEARCHNAMES = false;
let cartOrders = [];
const navLogo = document.querySelector(".nav__logo");
const mainSec = document.getElementById("section--main");

navLogo.addEventListener("click", function () {
  mainSec.scrollIntoView({ behavior: "smooth" });
});

// let plantsList = [
//   "peperomia",
//   "zzplant",
//   "begonia",
//   "birdparadise",
//   "asparagusfern",
//   "stringofpearls",
//   "orchid",
//   "pothos",
//   "peacelily",
//   "dracaenamarginata",
//   "chineseevergreen",
//   "cacti",
//   "aloevera",
//   "areca",
//   "calatea",
// ];
let plantsInfo = {
  peperomia: 20,
  zzplant: 30,
  begonia: 40,
  birdparadise: 25,
  asparagusfern: 15,
  stringofpearls: 20,
  orchid: 50,
  pothos: 60,
  peacelily: 70,
  dracaenamarginata: 100,
  chineseevergreen: 45,
  cacti: 10,
  aloevera: 15,
  areca: 20,
  calatea: 30,
};
let plantsSpeciesInfo = {
  peperomia: "Piperaceae",
  zzplant: "Araceae",
  begonia: "Begoniaceae",
  birdparadise: "Paradisaeidae; Swainson, 1825",
  asparagusfern: "Asparagaceae",
  stringofpearls: "Asteraceae",
  orchid: "Orchidaceae",
  pothos: "Araceae",
  peacelily: "Araceae",
  dracaenamarginata: "Asparagaceae",
  chineseevergreen: "Araceae",
  cacti: "Cactaceae",
  aloevera: "Asphodelaceae",
  areca: "Arecaceae",
  calatea: "Marantaceae",
};
let plantNames = {
  peperomia: "Peperomia",
  zzplant: "Zzplant",
  begonia: "Begonia",
  birdparadise: "Birdparadise",
  asparagusfern: "Asparagusfern",
  stringofpearls: "Stringofpearls",
  orchid: "Orchid",
  pothos: "Pothos",
  peacelily: "Peacelily",
  dracaenamarginata: "Dracaenamarginata",
  chineseevergreen: "Chineseevergreen",
  cacti: "Cacti",
  aloevera: "Aloevera",
  areca: "Areca",
  calatea: "Calatea",
};
let clicked = false;
let submitTrigerred = false;
let mapECoords = "";
let coordsForM = [];
let marker;
let map;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.addEventListener("click", function (mapEvent) {
      if (clicked == false) {
        clicked = true;
        mapECoords = mapEvent;
        const { lat, lng } = mapEvent.latlng;
        coordsForM = [lat, lng];
        marker = L.marker([lat, lng]);
        map.addLayer(marker);
      }
    });
  });
}

btnOrder.addEventListener("click", function () {
  if (clicked) {
    buyModal.classList.add("hidden");
    overlaybuy.classList.add("hidden");
    orderedModal.classList.remove("hidden");
    overlayordered.classList.remove("hidden");
  } else {
    alert("Please Insert a Pin");
  }
});
function getIp(callback) {
  fetch("https://ipinfo.io/json?token=<your token>", {
    headers: { Accept: "application/json" },
  })
    .then((resp) => resp.json())
    .catch(() => {
      return {
        country: "ge",
      };
    })
    .then((resp) => callback(resp.country));
}

const phoneInputField = document.querySelector("#phone");

const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: "auto",
  geoIpLookup: getIp,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

const custName = document.querySelector(".first-name-in");
const phoneN = document.querySelector(".phone-number-in");
custName.addEventListener("click", function () {
  phoneInputField.style.border = "none";
  custName.style.border = "none";
});
phoneN.addEventListener("click", function () {
  phoneInputField.style.border = "none";
  custName.style.border = "none";
});
let nameC = custName.value;
let phoneC = phoneN.value;
function sendEmail() {
  let params = {
    nameC: nameC,
    phoneC: phoneC,
    message: `Customer's Name is ${nameC}, Customer's phone number is +${phoneInput.s.dialCode} ${phoneC} . 
    Customer's location is: ${coordsForM}.
    Customer's order is ${str}. price is ${totalPrice}`,
  };

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      nameC = "";
      phoneC = "";
      message = "";
      // alert("Sent");
    })
    .catch((err) => console.log(err));
}
let str = ``;
submit.addEventListener("click", function () {
  if (custName.value == "" && phoneInputField.value == "") {
    phoneInputField.style.border = "1px solid red";
    custName.style.border = "1px solid red";
  } else if (custName.value == "") {
    custName.style.border = "1px solid red";
  } else if (phoneInputField.value == "") {
    phoneInputField.style.border = "1px solid red";
  } else {
    submitTrigerred = true;
    nameC = custName.value;
    phoneC = phoneN.value;

    for (let i = 0; i < counterCart; i++) {
      for (let [key2, value2] of Object.entries(cartOrders[i])) {
        str += `${key2} - ${value2}...`;
      }
    }
    sendEmail();
    str = "";
    orderedModal.classList.add("hidden");
    overlayordered.classList.add("hidden");
    modalDone.classList.remove("hidden");
    overlaydone.classList.remove("hidden");
    setTimeout(function () {
      modalDone.classList.add("hidden");
      overlaydone.classList.add("hidden");
    }, 5000);
    cartOrders = [];
    counterCart = 0;
    clicked = false;
    map.removeLayer(marker);
  }
});

plantsDiv.forEach(function (plantDiv) {
  const plantForNames = plantDiv.firstChild.nextSibling;
  const nameOfAPlant = plantForNames.className
    .slice(plantForNames.className.indexOf(" "))
    .replaceAll("-", "")
    .trim();
  const para = document.createElement("h1");
  const nod = document.createTextNode(`${nameOfAPlant}`);
  const para2 = document.createElement("h1");
  const pr = document.createTextNode(`${plantsInfo[nameOfAPlant]}₾`);
  // para.textContent = nameOfAPlant;
  para.style.backgroundColor = "white";
  para2.style.backgroundColor = "white";
  para.style.textAlign = "center";
  para2.style.textAlign = "center";

  para.appendChild(nod);
  para2.appendChild(pr);
  plantDiv.appendChild(para);
  plantDiv.appendChild(para2);
});
let curPlant = "";
plants.forEach(function (plant) {
  const nameOfAPlant = plant.className
    .slice(plant.className.indexOf(" "))
    .replaceAll("-", "")
    .trim();

  plant.addEventListener("click", function () {
    const nameCapitalized =
      nameOfAPlant[0].toUpperCase() + nameOfAPlant.slice(1);
    name.textContent = `Name: ${nameCapitalized}`;
    price.textContent = `Price:  ${plantsInfo[nameOfAPlant]}₾`;
    family.textContent = `Family: ${plantsSpeciesInfo[nameOfAPlant]}`;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    curPlant = nameOfAPlant;
  });
});

let counter = 0;
const count = document.querySelector(".count");
function restrictNumberInput() {
  let value = count.value;
  let min = 1;
  let max = 100;
  if (value < min) {
    count.value = min;
  } else if (value > max) {
    count.value = max;
  }
}

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

const addToCart = function () {
  counterCart++;
  counter = parseInt(count.value);
  cartOrders.push({
    name: curPlant,
    price: plantsInfo[curPlant],
    amount: counter,
  });
  closeModal();
  count.value = "";
};
cart.addEventListener("click", addToCart);

let htmlcode = "";
let element = "";

cartMenu.addEventListener("click", function () {
  element = document.querySelectorAll(".orderParent");
  for (let i = 0; i < element.length; i++) {
    element[i].remove();
  }
  totalPrice = 0;
  cartOrders.forEach(function (cartoder) {
    htmlcode = `<div class="orderParent"><button class="btn--delete--item">&times;</button><li class="orders" > Name : ${cartoder.name}, Price : ${cartoder.price}, Amount : ${cartoder.amount}</li></div>`;
    totalPrice += cartoder.price * cartoder.amount;
    el1.insertAdjacentHTML("beforeend", htmlcode);
  });

  if (totalPrice === 0) {
    total.textContent = `You have nothing in your Cart`;
    buy.classList.add("hidden");
  } else {
    // const btnDeleteItem = document.querySelectorAll(".btn--delete--item");
    const orderParent = document.querySelectorAll(".orderParent");

    total.textContent = `Your Total Is: ${totalPrice}`;
    buy.classList.remove("hidden");

    orderParent.forEach(function (orderPar) {
      const childOrd = orderPar.children[0];
      const listOrd = orderPar.children[1];
      childOrd.addEventListener("click", function () {
        for (let i = 0; i < cartOrders.length; i++) {
          if (listOrd.textContent.includes(cartOrders[i].name)) {
            iteracia = i;
          }
        }
        orderPar.remove();
        counterCart--;
        totalPrice -= cartOrders[iteracia].price * cartOrders[iteracia].amount;

        cartOrders.splice(iteracia, 1);
        if (totalPrice === 0) {
          total.textContent = `You have nothing in your Cart`;
          buy.classList.add("hidden");
        } else {
          total.textContent = `Your Total Is: ${totalPrice}`;
          buy.classList.remove("hidden");
        }
      });
    });
  }
  modal.classList.add("hidden");
  modalcart.classList.remove("hidden");
  overlaycart.classList.remove("hidden");
});

const closeModalCart = function () {
  modalcart.classList.add("hidden");
  overlaycart.classList.add("hidden");
  element = document.querySelectorAll(".orderParent");
  for (let i = 0; i < element.length; i++) {
    element[i].remove();
  }
  totalPrice = 0;
};
btnCloseModalCart.addEventListener("click", closeModalCart);
overlaycart.addEventListener("click", closeModalCart);

//cart.js

buy.addEventListener("click", function () {
  modalcart.classList.add("hidden");
  overlaycart.classList.add("hidden");
  buyModal.classList.remove("hidden");
  overlaybuy.classList.remove("hidden");
});

const closeModalBuy = function () {
  buyModal.classList.add("hidden");
  overlaybuy.classList.add("hidden");
  clicked = false;
  map.removeLayer(marker);
};

const closeModalSubmit = function () {
  orderedModal.classList.add("hidden");
  overlayordered.classList.add("hidden");
  clicked = false;
  map.removeLayer(marker);
};
btnCloseModalOrdered.addEventListener("click", closeModalSubmit);
overlayordered.addEventListener("click", closeModalSubmit);
btnCloseModalBuy.addEventListener("click", closeModalBuy);
overlaybuy.addEventListener("click", closeModalBuy);

///////////////////

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Intersection Observer API

const header = document.querySelector("header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const input = document.getElementById("input-species");
const input2 = document.getElementById("search-input");
const li = document.querySelectorAll(".lisp");
const li2 = document.querySelectorAll(".lispN");
let priceTillConv, decimal, part, priceAfterConv, priceStyleR;

function myFunction() {
  document.getElementById("search-input").disabled = true;
  drpbt.style.borderBottomLeftRadius = "0px";
  drpbt.style.borderBottomRightRadius = "0px";
  document.getElementById("species-p").classList.add("show");
  arrow.style.display = "inline-block";
  priceInput[0].disabled = true;
  rangeInput[0].disabled = true;
  priceInput[1].disabled = true;
  rangeInput[1].disabled = true;
  plantsDiv.forEach(function (plantDiv) {
    plantDiv.style.display = "";
  });
  range.style.right = 100 - (200 / rangeInput[1].max) * 100 + "%";
  range.style.left = (10 / rangeInput[0].max) * 100 + "%";
  rangeInput[0].value = 10;
  rangeInput[1].value = 200;
  priceInput[0].value = 10;
  priceInput[1].value = 200;
  if (getComputedStyle(priceRange).display != "block") {
    if (y != scrW && x != scrW) {
      priceTillConv = rem - 3.2;
      priceAfterConv = String(priceTillConv);
      priceStyleR = priceAfterConv + "rem";
      priceRange.style.marginLeft = priceStyleR;
    }
  } else {
    let updMarg = parseFloat(dropdownStyle.width.replace("px", "") / 10) + 1.5;

    if (clickedSEARCHFAM == false) {
      dropdown.style.paddingRight = String(updMarg) + "rem";
      clickedSEARCHFAM = true;
    }
  }

  if (y == scrW) {
    dropdown.style.marginLeft = "3rem";
    dropdown2.style.marginLeft = "3rem";
  }

  if (x == scrW) {
    dropdown.style.marginLeft = "5.5rem";
    dropdown2.style.marginLeft = "5.5rem";
  }

  if (input.value == "") {
    for (i = 0; i < li.length; i++) {
      li[i].style.display = "";
    }
  }
}
function myFunction2() {
  document.getElementById("input-species").disabled = true;
  drpbt2.style.borderBottomLeftRadius = "0px";
  drpbt2.style.borderBottomRightRadius = "0px";
  document.getElementById("species-pN").classList.add("show");
  arrow2.style.display = "inline-block";
  priceInput[0].disabled = true;
  rangeInput[0].disabled = true;
  priceInput[1].disabled = true;
  rangeInput[1].disabled = true;
  plantsDiv.forEach(function (plantDiv) {
    plantDiv.style.display = "";
  });
  range.style.right = 100 - (200 / rangeInput[1].max) * 100 + "%";
  range.style.left = (10 / rangeInput[0].max) * 100 + "%";
  rangeInput[0].value = 10;
  rangeInput[1].value = 200;
  priceInput[0].value = 10;
  priceInput[1].value = 200;
  if (getComputedStyle(priceRange).display != "block") {
    if (y != scrW && x != scrW) {
      priceTillConv = rem - 3.2;
      priceAfterConv = String(priceTillConv);
      priceStyleR = priceAfterConv + "rem";
      priceRange.style.marginLeft = priceStyleR;
    }
  } else {
    let updMarg = parseFloat(dropdownStyle.width.replace("px", "") / 10) + 1.5;

    if (clickedSEARCHNAMES == false) {
      dropdown2.style.paddingRight = String(updMarg) + "rem";
      clickedSEARCHNAMES = true;
    }
  }
  if (y == scrW) {
    dropdown.style.marginLeft = "3rem";
    dropdown2.style.marginLeft = "3rem";
  }
  if (x == scrW) {
    dropdown.style.marginLeft = "5.5rem";
    dropdown2.style.marginLeft = "5.5rem";
  }

  if (input2.value == "") {
    for (i = 0; i < li2.length; i++) {
      li2[i].style.display = "";
    }
  }
}
let txtValue = "";
let txtValue2 = "";
function filterFunction() {
  const filter = input.value.toUpperCase();
  // const div = document.getElementById("species-p");
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function filterFunction2() {
  const filter2 = input2.value.toUpperCase();
  // const div = document.getElementById("species-p");
  for (i = 0; i < li2.length; i++) {
    txtValue2 = li2[i].textContent || li2[i].innerText;
    if (txtValue2.toUpperCase().indexOf(filter2) > -1) {
      li2[i].style.display = "";
    } else {
      li2[i].style.display = "none";
    }
  }
}
function funcClear() {
  clickedLip = {
    Piperaceae: false,
    Begoniaceae: false,
    "Paradisaeidae; Swainson, 1825": false,
    Asparagaceae: false,
    Asteraceae: false,
    Orchidaceae: false,
    Araceae: false,
    Cactaceae: false,
    Asphodelaceae: false,
    Arecaceae: false,
    Marantaceae: false,
  };

  priceInput[0].disabled = false;
  rangeInput[0].disabled = false;
  priceInput[1].disabled = false;
  rangeInput[1].disabled = false;
  li.forEach(function (lip) {
    plantsDiv.forEach(function (plantDiv) {
      plantDiv.style.display = "";
      lip.style.backgroundColor = "#f6f6f6";
      drpbt.style.display = "";
      clear.style.display = "none";
    });
  });
  drpbt.style.borderBottomLeftRadius = "10px";
  drpbt.style.borderBottomRightRadius = "10px";
  drpbt.value = "";
  clickedSpeciesSearch = false;
  clickedSEARCHFAM = false;
  clickedThePlant = false;
  if (getComputedStyle(priceRange).display != "block") {
    if (y != scrW && x != scrW) {
      priceTillConv = parseFloat(priceAfterConv) - 11.8;
      priceAfterConv = String(priceTillConv);
      priceStyleR = priceAfterConv + "rem";
      priceRange.style.marginLeft = priceStyleR;
    }
  } else {
    if (clearStyles.fontSize != "16px") {
      dropdown.style.width = "23.5rem";
      dropdown.style.marginLeft = "14rem";
      dropdown.style.paddingRight = "10rem";
    } else if (clearStyles.fontSize == "16px") {
      if (mediaQuery440.matches) {
        if (plantsStyle.width == "180px" || plantsStyle.width == "170px") {
          dropdown.style.width = "27rem";
          dropdown.style.marginLeft = "6rem";
          dropdown.style.paddingRight = "10rem";
        } else {
          dropdown.style.width = "27rem";
          dropdown.style.marginLeft = "8rem";
          dropdown.style.paddingRight = "10rem";
        }
      } else {
        dropdown.style.width = "27rem";
        dropdown.style.marginLeft = "10rem";
        dropdown.style.paddingRight = "10rem";
      }
    }
  }
  if (x == scrW && y != scrW) {
    dropdown.style.marginLeft = "7rem";
    dropdown2.style.marginLeft = "7rem";
  }
  if (y == scrW) {
    dropdown.style.marginLeft = "4.5rem";
    dropdown2.style.marginLeft = "4.5rem";
  }
  document.getElementById("search-input").disabled = false;
}

function funcClearNames() {
  clickedLip2 = {
    Peperomia: false,
    Zzplant: false,
    Begonia: false,
    Birdparadise: false,
    Asparagusfern: false,
    Stringofpearls: false,
    Pothos: false,
    Peacelily: false,
    Calatea: false,
    Chinesevergreen: false,
    Areca: false,
    Cacti: false,
    Dracaenamarginata: false,
    Orchid: false,
  };
  priceInput[0].disabled = false;
  rangeInput[0].disabled = false;
  priceInput[1].disabled = false;
  rangeInput[1].disabled = false;

  li2.forEach(function (lip2) {
    plantsDiv.forEach(function (plantDiv) {
      plantDiv.style.display = "";
      lip2.style.backgroundColor = "#f6f6f6";
      drpbt2.style.display = "";
      clearNames.style.display = "none";
    });
  });
  drpbt2.style.borderBottomLeftRadius = "10px";
  drpbt2.style.borderBottomRightRadius = "10px";
  drpbt2.value = "";
  clickedNameSearch = false;
  clickedSEARCHNAMES = false;
  clickedThePlant = false;
  if (getComputedStyle(priceRange).display != "block") {
    if (y != scrW) {
      priceTillConv = parseFloat(priceAfterConv) - 11.8;
      priceAfterConv = String(priceTillConv);
      priceStyleR = priceAfterConv + "rem";
      priceRange.style.marginLeft = priceStyleR;
    }
  } else {
    if (clearStyles.fontSize != "16px") {
      dropdown2.style.width = "23.5rem";
      dropdown2.style.marginLeft = "14rem";
      dropdown2.style.paddingRight = "10rem";
    } else if (clearStyles.fontSize == "16px") {
      if (mediaQuery440.matches) {
        if (plantsStyle.width == "180px" || plantsStyle.width == "170px") {
          dropdown2.style.width = "27rem";
          dropdown2.style.marginLeft = "6rem";
          dropdown2.style.paddingRight = "10rem";
        } else {
          dropdown2.style.width = "27rem";
          dropdown2.style.marginLeft = "8rem";
          dropdown2.style.paddingRight = "10rem";
        }
      } else {
        dropdown2.style.width = "27rem";
        dropdown2.style.marginLeft = "10rem";
        dropdown2.style.paddingRight = "10rem";
      }
    }
  }
  if (x == scrW && y != scrW) {
    dropdown2.style.marginLeft = "7rem";
    dropdown.style.marginLeft = "7rem";
  }
  if (y == scrW) {
    dropdown.style.marginLeft = "4.5rem";
    dropdown2.style.marginLeft = "4.5rem";
  }
  document.getElementById("input-species").disabled = false;
}

let clickedLip = {
  Piperaceae: false,
  Begoniaceae: false,
  "Paradisaeidae; Swainson, 1825": false,
  Asparagaceae: false,
  Asteraceae: false,
  Orchidaceae: false,
  Araceae: false,
  Cactaceae: false,
  Asphodelaceae: false,
  Arecaceae: false,
  Marantaceae: false,
};
let clickedLip2 = {
  Peperomia: false,
  Zzplant: false,
  Begonia: false,
  Birdparadise: false,
  Asparagusfern: false,
  Stringofpearls: false,
  Pothos: false,
  Peacelily: false,
  Calatea: false,
  Chinesevergreen: false,
  Areca: false,
  Cacti: false,
  Dracaenamarginata: false,
  Orchid: false,
};

let strP = "";
clear.style.display = "none";
clearNames.style.display = "none";
let clickedSpeciesSearch = false;
let clickedNameSearch = false;
let clickedThePlant = false;
li.forEach(function (lip) {
  lip.addEventListener("click", function () {
    priceInput[0].disabled = true;
    rangeInput[0].disabled = true;
    priceInput[1].disabled = true;
    rangeInput[1].disabled = true;
    if (clickedNameSearch == false) {
      if (getComputedStyle(priceRange).display != "block") {
        if (y < scrW && x != scrW) {
          if (dropRem == 1) {
            priceTillConv = parseFloat(priceAfterConv) + 12;
          } else {
            priceTillConv = parseFloat(priceAfterConv) + 15;
          }
          priceAfterConv = String(priceTillConv);
          priceStyleR = priceAfterConv + "rem";
          priceRange.style.marginLeft = priceStyleR;
        }
      } else {
        if (clearStyles.fontSize != "16px") {
          let updMarg =
            parseFloat(dropdownStyle.width.replace("px", "") / 10) - 18;
          dropdown.style.width = String(updMarg) + "rem";
          dropdown.style.paddingRight = "0rem";
          dropdown.style.marginLeft = "22rem"; //19rem
        } else if (clearStyles.fontSize == "16px") {
          if (plantsStyle.width == "180px" || plantsStyle.width == "170px") {
            let updMarg =
              parseFloat(dropdownStyle.width.replace("px", "") / 10) - 21;
            dropdown.style.width = String(updMarg + 0.3) + "rem";
            dropdown.style.paddingRight = "0rem";
            dropdown.style.marginLeft = String(updMarg + 7) + "rem";
          } else {
            let updMarg =
              parseFloat(dropdownStyle.width.replace("px", "") / 10) - 21;

            dropdown.style.width = String(updMarg + 0.3) + "rem";
            dropdown.style.paddingRight = "0rem";
            dropdown.style.marginLeft = String(updMarg + 9) + "rem"; //19rem
          }
        }
      }

      if (x == scrW && y != scrW) {
        dropdown.style.marginLeft = "12rem";
        dropdown2.style.marginLeft = "7rem";
      }
      if (y == scrW) {
        dropdown.style.marginLeft = "9.5rem";
        dropdown2.style.marginLeft = "4.5rem";
      }
      clickedSpeciesSearch = true;
      clickedThePlant = true;
      arrow.style.display = "none";
      clickedLip[lip.textContent] = !clickedLip[lip.textContent];
      plantsDiv.forEach(function (plantDiv) {
        const plantForNames = plantDiv.firstChild.nextSibling;
        const nameOfAPlant = plantForNames.className
          .slice(plantForNames.className.indexOf(" "))
          .replaceAll("-", "")
          .trim();
        if (clickedLip[lip.textContent] == true) {
          if (plantsSpeciesInfo[nameOfAPlant] !== lip.textContent) {
            clickedLip[lip.textContent] = true;
            plantDiv.style.display = "none";
            lip.style.backgroundColor = "#666";
            document.getElementById("species-p").classList.remove("show");
            drpbt.style.display = "none";
            clear.style.display = "";
          }
        }
      });
    }
  });
});

li2.forEach(function (lip2) {
  lip2.addEventListener("click", function () {
    priceInput[0].disabled = true;
    rangeInput[0].disabled = true;
    priceInput[1].disabled = true;
    rangeInput[1].disabled = true;
    if (clickedSpeciesSearch == false) {
      if (getComputedStyle(priceRange).display != "block") {
        if (y < scrW && x != scrW) {
          if (dropRem == 1) {
            priceTillConv = parseFloat(priceAfterConv) + 12;
          } else {
            priceTillConv = parseFloat(priceAfterConv) + 15;
          }
          priceAfterConv = String(priceTillConv);
          priceStyleR = priceAfterConv + "rem";
          priceRange.style.marginLeft = priceStyleR;
        }
      } else {
        if (clearStyles.fontSize != "16px") {
          let updMarg =
            parseFloat(dropdownStyle.width.replace("px", "") / 10) - 18;

          dropdown2.style.width = String(updMarg) + "rem";
          dropdown2.style.paddingRight = "0rem";
          dropdown2.style.marginLeft = "22rem"; //19rem
          dropdown2.style.width = "8rem";
        } else if (clearStyles.fontSize == "16px") {
          if (plantsStyle.width == "180px" || plantsStyle.width == "170px") {
            let updMarg =
              parseFloat(dropdownStyle.width.replace("px", "") / 10) - 21;
            dropdown2.style.width = String(updMarg + +2.7 + 0.3) + "rem";
            dropdown2.style.paddingRight = "0rem";
            dropdown2.style.marginLeft = String(updMarg + +2.8 + 7) + "rem";
          } else {
            let updMarg =
              parseFloat(dropdownStyle.width.replace("px", "") / 10) - 21;

            dropdown2.style.width = String(updMarg + 2.8) + "rem";
            dropdown2.style.paddingRight = "0rem";
            dropdown2.style.marginLeft = String(updMarg + 2.8 + 9) + "rem"; //19rem
          }
        }
      }
      if (x == scrW && y != scrW) {
        dropdown2.style.marginLeft = "12rem";
        dropdown.style.marginLeft = "7rem";
      }
      if (y == scrW) {
        dropdown2.style.marginLeft = "9.5rem";
        dropdown.style.marginLeft = "4.5rem";
      }
      clickedNameSearch = true;
      arrow2.style.display = "none";
      clickedThePlant = true;
      clickedLip2[lip2.textContent] = !clickedLip2[lip2.textContent];
      plantsDiv.forEach(function (plantDiv) {
        const plantForNames2 = plantDiv.firstChild.nextSibling;
        const nameOfAPlant2 = plantForNames2.className
          .slice(plantForNames2.className.indexOf(" "))
          .replaceAll("-", "")
          .trim();
        if (clickedLip2[lip2.textContent] == true) {
          if (plantNames[nameOfAPlant2] !== lip2.textContent) {
            clickedLip2[lip2.textContent] = true;
            plantDiv.style.display = "none";
            lip2.style.backgroundColor = "#666";
            document.getElementById("species-pN").classList.remove("show");
            drpbt2.style.display = "none";
            clearNames.style.display = "";
          }
        }
      });
    }
  });
});

arrow.addEventListener("click", function () {
  document.getElementById("species-p").classList.remove("show");
  document.getElementById("search-input").disabled = false;
  arrow.style.display = "none";
  drpbt.style.borderBottomLeftRadius = "10px";
  drpbt.style.borderBottomRightRadius = "10px";
  drpbt.value = "";
  clickedSpeciesSearch = false;
  clickedSEARCHFAM = false;
  clickedThePlant = false;
  priceInput[0].disabled = false;
  rangeInput[0].disabled = false;
  priceInput[1].disabled = false;
  rangeInput[1].disabled = false;
  if (getComputedStyle(priceRange).display != "block") {
    if (y != scrW && x != scrW) {
      priceTillConv = parseFloat(priceAfterConv) + 3.2;
      priceAfterConv = String(priceTillConv);
      priceStyleR = priceAfterConv + "rem";
      priceRange.style.marginLeft = priceStyleR;
    }
  } else {
    dropdown.style.paddingRight = "14rem";
  }

  // if (x == scrW) {
  //   dropdown.style.marginLeft = "4.5rem";
  //   dropdown2.style.marginLeft = "4.5rem";
  // }
  if (x == scrW && y != scrW) {
    dropdown.style.marginLeft = "7rem";
    dropdown2.style.marginLeft = "7rem";
  }
  if (y == scrW) {
    dropdown.style.marginLeft = "4.5rem";
    dropdown2.style.marginLeft = "4.5rem";
  }
});

arrow2.addEventListener("click", function () {
  document.getElementById("species-pN").classList.remove("show");
  document.getElementById("input-species").disabled = false;
  arrow2.style.display = "none";
  drpbt2.value = "";
  drpbt2.style.borderBottomLeftRadius = "10px";
  drpbt2.style.borderBottomRightRadius = "10px";
  clickedNameSearch = false;
  clickedSpeciesSearch = false;
  clickedSEARCHNAMES = false;
  clickedThePlant = false;
  priceInput[0].disabled = false;
  rangeInput[0].disabled = false;
  priceInput[1].disabled = false;
  rangeInput[1].disabled = false;
  if (getComputedStyle(priceRange).display != "block") {
    if (y != scrW && x != scrW) {
      priceTillConv = parseFloat(priceAfterConv) + 3.2;
      priceAfterConv = String(priceTillConv);
      priceStyleR = priceAfterConv + "rem";
      priceRange.style.marginLeft = priceStyleR;
    }
  } else {
    dropdown2.style.paddingRight = "14rem";
  }
  // if (x == scrW) {
  //   dropdown.style.marginLeft = "4.5rem";
  //   dropdown2.style.marginLeft = "4.5rem";
  // }
  if (x == scrW && y != scrW) {
    dropdown.style.marginLeft = "7rem";
    dropdown2.style.marginLeft = "7rem";
  }
  if (y == scrW) {
    dropdown.style.marginLeft = "4.5rem";
    dropdown2.style.marginLeft = "4.5rem";
  }
});

const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const range = document.querySelector(".slider-price .progress");
let priceGap = 1;

range.style.right = 100 - (200 / rangeInput[1].max) * 100 + "%";
range.style.left = (10 / rangeInput[0].max) * 100 + "%";

priceInput.forEach((input) => {
  if (!clickedThePlant) {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
        plantsDiv.forEach(function (plantDiv) {
          const plantForNames = plantDiv.firstChild.nextSibling;
          const priceOfAPlant =
            plantsInfo[
              plantForNames.className
                .slice(plantForNames.className.indexOf(" "))
                .replaceAll("-", "")
                .trim()
            ];
          if (
            priceInput[0].value <= priceOfAPlant &&
            priceInput[1].value >= priceOfAPlant
          ) {
            plantDiv.style.display = "";
          } else {
            plantDiv.style.display = "none";
          }
        });
      }
    });
  }
});

rangeInput.forEach((input) => {
  if (!clickedThePlant) {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;

        plantsDiv.forEach(function (plantDiv) {
          const plantForNames = plantDiv.firstChild.nextSibling;
          const priceOfAPlant =
            plantsInfo[
              plantForNames.className
                .slice(plantForNames.className.indexOf(" "))
                .replaceAll("-", "")
                .trim()
            ];
          if (
            priceInput[0].value <= priceOfAPlant &&
            priceInput[1].value >= priceOfAPlant
          ) {
            plantDiv.style.display = "";
          } else {
            plantDiv.style.display = "none";
          }
        });
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  }
});

// if (min[lip.textContent] == true) {
//   if (plantsSpeciesInfo[nameOfAPlant] !== lip.textContent) {

// }
