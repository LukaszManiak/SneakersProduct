'use strict';

//elements
const navOpen = document.querySelector('.nav-open-btn');
const navClose = document.querySelector('.nav-close-btn');
const navWhiteBg = document.querySelector('.nav-white-bg');
const navDarkBg = document.querySelector('.nav-dark-bg');
const darkBg = document.querySelector('.dark-bg');

const addProductCount = document.querySelector('.add-count-button');
const removeProductCount = document.querySelector('.remove-count-button');

const productCount = document.querySelector('.count-p');

const cartContainer = document.querySelector('.cart-container');
const productCountAlert = document.querySelector('.product-count');
const addToCartBtn = document.querySelector('.add-to-cart-button');
const deleteFromCartBtn = document.querySelector('.delete-button');
const cartBtn = document.querySelector('.cart-button');

const thumbnailsContainer = document.querySelector(
  '.thumbnails-images-container'
);

const allThumbnails = document.querySelectorAll('.product-thumbnail');

const allProductImages = document.querySelectorAll('.product-image');
const allNextBtn = document.querySelectorAll('.next-btn');
const allPrevBtn = document.querySelectorAll('.prev-btn');

const mainImage = document.querySelector('.main-image');

const imagesModal = document.querySelector('.images-modal');
const closeModalBtn = document.querySelector('.close-modal-button');

// nav menu

//setting hidden class
navWhiteBg.classList.add('hidden');
navDarkBg.classList.add('hidden');
let isOpen = false;

//functions for closing/opening nav menu
const openNavMenu = function () {
  navWhiteBg.classList.remove('hidden');
  navDarkBg.classList.remove('hidden');

  isOpen = !isOpen;
};
const closeNavMenu = function () {
  navWhiteBg.classList.add('hidden');
  navDarkBg.classList.add('hidden');

  isOpen = !isOpen;
};

navOpen.addEventListener('click', openNavMenu);
navClose.addEventListener('click', closeNavMenu);

//setting product count
let count = 0;

addProductCount.addEventListener('click', function () {
  count++;
  productCount.innerText = count;
});

removeProductCount.addEventListener('click', function () {
  if (count == 0) return;

  count--;
  productCount.innerText = count;
});

//adding product to cart

//default parameters
let cartPrice;
let finalCount = 0;
cartContainer.insertAdjacentHTML('afterbegin', emptyCart());

//case1: returning html for empty cart

function emptyCart() {
  return `
    <h4>Cart</h4>
    <p class="empty-cart-p">Your cart is empty.</p>
    `;
}
//case2:returning html for product in cart
function productCart(count) {
  finalCount += +count;
  return `
  
<h4>Cart</h4>

  <div class="cart-item">
    <img class="" src="images/image-product-1.jpg" alt="" />
    <div>
      <p class="cart-item-product-title">Fall Limited Edition Sneakers</p>
      <p class="cart-item-product-price">$125.00 x ${+finalCount}<span> $${
    +finalCount * 125
  }</span></p>
    </div>
  <button onClick="deleteProduct" class="delete-button">
    <img src="images/icon-delete.svg" alt="" />
  </button>
  </div>
  <button class="orange-button">Checkout</button>
`;
}

addToCartBtn.addEventListener('click', function () {
  cartContainer.innerHTML = '';
  if (!+productCount.innerText) {
    cartContainer.insertAdjacentHTML('afterbegin', emptyCart());
  } else {
    cartContainer.insertAdjacentHTML('afterbegin', productCart(count));
    productCountAlert.innerText = finalCount;
    count = 0;
    productCount.innerText = count;
    productCountAlert.classList.remove('hidden');
  }
});

//delete product from cart
function deleteProduct() {
  cartContainer.innerHTML = '';
  cartContainer.insertAdjacentHTML('afterbegin', emptyCart());
  count = 0;
  finalCount = 0;
  productCountAlert.innerText = count;
  cartContainer.classList.toggle('hidden');
  productCountAlert.classList.add('hidden');
}

//show cart
cartBtn.addEventListener('click', function () {
  cartContainer.classList.toggle('hidden');
});

//showing selected image
let currentImage = 1;

//mobile view/modal window
allPrevBtn.forEach(btn => {
  btn.addEventListener('click', function () {
    if (currentImage == 1) return;
    currentImage--;
    allProductImages.forEach(
      e => (e.src = `images/image-product-${currentImage}.jpg`)
    );
    toggleFocus(currentImage);
    console.log(currentImage);
  });
});

allNextBtn.forEach(btn => {
  btn.addEventListener('click', function () {
    if (currentImage == 4) return;
    currentImage++;
    allProductImages.forEach(
      e => (e.src = `images/image-product-${currentImage}.jpg`)
    );
    console.log(currentImage);
    toggleFocus(currentImage);
  });
});

//full view
allThumbnails.forEach(e => {
  e.addEventListener('click', function () {
    currentImage = +e.dataset.thumbnail;
    allProductImages.forEach(
      e => (e.src = `images/image-product-${currentImage}.jpg`)
    );
    toggleFocus(currentImage);
  });
});

function toggleFocus(curNum) {
  allThumbnails.forEach(e => {
    curNum == +e.dataset.thumbnail
      ? e.classList.add('image-selected')
      : e.classList.remove('image-selected');
  });
}

//opening modal with images
mainImage.addEventListener('click', function () {
  imagesModal.classList.remove('hidden');
  darkBg.classList.remove('hidden');
});

//closing modal
function closeModal() {
  imagesModal.classList.add('hidden');
  darkBg.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    imagesModal.classList.add('hidden');
    darkBg.classList.add('hidden');
  }
});
