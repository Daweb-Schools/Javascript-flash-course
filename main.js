// generate an api key from https://openweathermap.org/api and replace the xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx with your api key in the weatherAPIKey variable below
// make sure to enable geolocation in your browser for the weather to work ( you will get an alert asking for permission to access your location )

const weatherAPIKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${weatherAPIKey}&units=metric`;

const galleryImages = [
  {
    src: "./assets/gallery/img1.png",
    alt: "Image 1",
  },
  {
    src: "./assets/gallery/img1.png",
    alt: "Image 2",
  },
  {
    src: "./assets/gallery/img1.png",
    alt: "Image 3",
  },
];

const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

function navHandler() {
  const openNavBtn = document.querySelector("#open-nav-menu");
  const closeNavBtn = document.querySelector("#close-nav-menu");
  const wrapper = document.querySelector(".wrapper");

  openNavBtn.addEventListener("click", () => {
    wrapper.classList.toggle("nav-open");
  });

  closeNavBtn.addEventListener("click", () => {
    wrapper.classList.remove("nav-open");
  });

  wrapper.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      wrapper.classList.remove("nav-open");
    }
  });
}

function greetingHandler() {
  const greeting = document.querySelector("#greeting");
  const hourNow = new Date().getHours();
  let greetingText = "Welcome";

  if (hourNow > 18) {
    greetingText = "Good evening";
  } else if (hourNow > 12) {
    greetingText = "Good afternoon";
  } else if (hourNow > 0) {
    greetingText = "Good morning";
  }

  greeting.textContent = `${greetingText}!`;
}

// updates the time displayed on a webpage by updating the text content of elements with the class "local-time" and a "data-time" attribute. The function uses the built-in Date object to get the current hours, minutes, and seconds. It then selects all elements with the class "local-time" and a "data-time" attribute, and for each element it updates the text content based on the "data-time" attribute value. The value is converted to a string and padded with a leading zero if it is a single digit.
function localTimeHandler() {
  const localTime = document.querySelector(".local-time");
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  localTime.querySelectorAll("[data-time]").forEach((el) => {
    const timeUnit = el.dataset.time;
    let timeUnitValue;

    switch (timeUnit) {
      case "hours":
        timeUnitValue = hours;
        break;
      case "minutes":
        timeUnitValue = minutes;
        break;
      case "seconds":
        timeUnitValue = seconds;
        break;
    }

    timeUnitValue = timeUnitValue.toString().padStart(2, "0");

    el.textContent = timeUnitValue;
  });
}

function convertCelsiusToFahrenheit(celsius) {
  return Math.round(celsius * (9 / 5) + 32);
}

// retrieves the current weather data from an API using the user's geolocation, and updates the text content of an element with the id "weather" with the temperature in either Celsius or Fahrenheit based on the user's selection. The function uses the browser's built-in navigator.geolocation.getCurrentPosition() method to get the user's current latitude and longitude, and then uses these coordinates to create a URL for the weather API. The function then uses the fetch() method to retrieve the data from the API, and the resulting JSON data is used to update the text content of the "weather" element with the current weather and temperature. The function also adds an event listener to the element with the class "weather-group", so that when the user clicks on an input element, it will change the temperature units between Celsius and Fahrenheit.
function weatherHandler() {
  var weatherElm = document.querySelector("#weather");
  var weatherGroup = document.querySelector(".weather-group");
  let farnheit, celsius;

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const url = weatherAPIURL
      .replace("{lat}", latitude)
      .replace("{lon}", longitude);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        farnheit = `The weather is ${data.weather[0].description} in ${
          data.name
        } and it's ${convertCelsiusToFahrenheit(data.main.temp)}°F outside.`;
        celsius = `The weather is ${data.weather[0].description} in ${
          data.name
        } and it's ${Math.round(data.main.temp)}°C outside.`;

        weatherElm.textContent = celsius;
      })
      .catch((err) => {
        weatherElm.textContent = "Error getting weather data";
      });
  });

  weatherGroup.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {
      const id = e.target.id;

      if (id) {
        switch (id) {
          case "fahr":
            weatherElm.textContent = farnheit;
            break;
          case "celsius":
            weatherElm.textContent = celsius;
            break;
        }
      }
    }
  });
}

// creates a gallery of images on a webpage and selects the first image element in the element with the class "gallery-section" and sets its source and alt attributes to the first element of the "galleryImages" array. It then creates an img element for each item in the "galleryImages" array, sets its src, alt, and data-array-index attributes, and appends it to the element with the class "thumbnails". It also adds an event listener to each img element so that when an image is clicked, the source and alt attributes of the first image element are updated to the corresponding values of the clicked image, and the data-selected attribute of all img elements is set to false except the one that was clicked.
function galleryHandler() {
  var firstImage = document.querySelector(".gallery-section img");
  var thumbnails = document.querySelector(".gallery-section .thumbnails");

  firstImage.src = galleryImages[0].src;
  firstImage.alt = galleryImages[0].alt;

  galleryImages.forEach((image, index) => {
    var img = document.createElement("img");
    img.src = image.src;
    img.alt = `Thumbnail ${image.alt}`;
    img.dataset.arrayIndex = index;
    img.dataset.selected = index === 0 ? true : false;

    img.addEventListener("click", (e) => {
      var selectedIndex = e.target.dataset.arrayIndex;
      var selectedImage = galleryImages[selectedIndex];

      firstImage.src = selectedImage.src;
      firstImage.alt = selectedImage.alt;
      thumbnails.querySelectorAll("img").forEach((img) => {
        img.dataset.selected = false;
      });
      e.target.dataset.selected = true;
    });

    thumbnails.appendChild(img);
  });
}

// filters an array of products based on the provided filter parameter. The function takes a filter parameter and it returns a new filtered array of products. It uses the Array.prototype.filter() method to filter the products array based on the filter parameter. The filter parameter can be "all", "paid" or "free". If the filter parameter is "all", it returns all the products in the array. If the filter parameter is "paid", it returns the products that have a price greater than zero. If the filter parameter is "free", it returns the products that have a price equal to zero.
function filterProducts(filter) {
  return products.filter((product) => {
    switch (filter) {
      case "all":
        return true;
      case "paid":
        return product.price > 0;
      case "free":
        return product.price === 0;
    }
  });
}

// populates a webpage with product information by creating and appending HTML elements to the element with the class "products-area". The function takes an optional filter parameter with a default value of "all" which is passed to the "filterProducts" function to filter the products that are displayed. It first clears the contents of the "products-area" element using innerHTML = ""; Then for each product in the filtered array it creates a "div" element with class "product-item" and appends it to the "products-area" element. Then it creates an "img" element to display the product image, and a "div" element with class "product-details" to hold the product title, author and price. it creates "h3","p" elements for title, author and price respectively and then it appends the created elements to the "div" element with class "product-details" , then the image and the details to the "product-item" element and finally it appends the "product-item" element to the "products-area"
function populateProducts(filter = "all") {
  const productsElm = document.querySelector(".products-area");
  productsElm.innerHTML = "";

  filterProducts(filter).forEach((product) => {
    const productElm = document.createElement("div");
    productElm.classList.add("product-item");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;

    const productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = product.author;

    const productPriceTitle = document.createElement("p");
    productPriceTitle.classList.add("price-title");
    productPriceTitle.textContent = "Price";

    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent =
      product.price > 0 ? `$ ${product.price.toFixed(2)}` : "Free";

    productDetails.appendChild(productTitle);
    productDetails.appendChild(productAuthor);
    productDetails.appendChild(productPriceTitle);
    productDetails.appendChild(productPrice);

    productElm.appendChild(productImage);
    productElm.appendChild(productDetails);

    productsElm.appendChild(productElm);
  });
}

// handles the product list filtering and updating the number of products under each filter. It selects all the input elements with the name "products" and adds an event listener to each one so that when clicked, it calls the "populateProducts" function with the id of the clicked element as a parameter, which is used to filter the products. It also selects all the label elements with the class "products-filter" and for each one, it gets the "for" attribute to filter the products, selects the element with the class "product-amount" under the label, and sets its text content to the length of the filtered products.
function productListHandler() {
  const productsFilter = document.querySelectorAll("input[name='products']");

  productsFilter.forEach((product) => {
    product.addEventListener("click", (e) => {
      populateProducts(e.target.id);
    });
  });

  // populate product amounts in each label
  const filterLabels = document.querySelectorAll(".products-filter label");

  filterLabels.forEach((label) => {
    const filter = label.getAttribute("for");
    const amountElm = label.querySelector(".product-amount");

    amountElm.textContent = filterProducts(filter).length;
  });
}

function footerHandler() {
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();

  footer.textContent = `Ⓒ ${currentYear} - All rights reserved`;
}

function init() {
  // navigation handler
  navHandler();

  // hero section handlers
  greetingHandler();
  localTimeHandler();
  setInterval(localTimeHandler, 1000);
  weatherHandler();

  // image gallery handler
  galleryHandler();

  // products handler
  populateProducts();
  productListHandler();

  // footer handler
  footerHandler();
}

init();
