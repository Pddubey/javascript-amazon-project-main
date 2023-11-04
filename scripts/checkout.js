import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { saveToStorage } from './utils/saveData.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOption.js';

var today=dayjs();
console.log(today.format('dddd, mmmm, D'));


let cartSummaryHTML='';
cart.forEach((cartItem) => {
    let matchingItem;
    
    products.forEach((Item) => {
        if(cartItem.productId===Item.id){
            matchingItem=Item;
        }
   });

   const deliveryOptionId=cartItem.deliveryOptionId;

  let deliveryOption;
  
  deliveryOptions.forEach((option)=>{
    if(option.id===deliveryOptionId){
      deliveryOption=option;
    }
  });
  const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');
  



  cartSummaryHTML+= 
 `<div class="cart-item-container js-cart-item-container-${matchingItem.productId}">
 <div class="delivery-date">
   Delivery date: ${dateString}
 </div>

 <div class="cart-item-details-grid">
   <img class="product-image"
     src= ${matchingItem.image}>

   <div class="cart-item-details">
     <div class="product-name">
      ${matchingItem.name} 
     </div>
     <div class="product-price">
       $${formatCurrency(matchingItem.priceCents)}
     </div>
     <div class="product-quantity">
       <span>
         Quantity: <span class="quantity-label">${cartItem.quantity}</span>
       </span>
       <span class="update-quantity-link link-primary">
         Update
       </span>
       <span class="delete-quantity-link link-primary js-delete-link" 
       data-product-id="${matchingItem.id}">
         Delete
       </span>
     </div>
   </div>

   <div class="delivery-options">
    ${deliveryOptionHTML(matchingItem,cartItem)}
   </div>
 </div>
</div>
`

});

document.querySelector('.js-order-summary').
 innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-link').
 forEach((link) => {
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removeFromCart(productId);
    console.log(cart);

    const itemContainer=document.querySelector(`.js-cart-item-container-${productId}`);
    itemContainer.remove();
    saveToStorage(cart);
    
    
  });
 });
 
 function deliveryOptionHTML(matchingItem,cartItem){

  let html='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');

    const priceString=deliveryOption.priceCents===0
    ?'FREE'
    :`$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked=deliveryOption.id===cartItem.deliveryOptionId;

    html+=
    `<div class="delivery-options">
     <div class="delivery-options-title">
       Choose a delivery option:
     </div>
     <div class="delivery-option">
       <input type="radio" ${isChecked?'checked':''}
         class="delivery-option-input"
         name="${matchingItem.id}">
       <div>
         <div class="delivery-option-date">
           ${dateString}
         </div>
         <div class="delivery-option-price">
           ${priceString} - Shipping
         </div>
       </div>
     </div>`
  });
  return html;
 }
 
