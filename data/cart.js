import { saveToStorage } from "../scripts/utils/saveData.js";


export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[
    {
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'2'
    },{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:5,
      deliveryOptionId:'3'
    }];
  }


export function addToCart(productId){
    let matchingItem;
      
      cart.forEach((cartItem)=> {
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
      if(matchingItem){
        matchingItem.quantity++;
        
        
      }
      else{
        cart.push({
          productId:productId,
          quantity:1,
          deliveryOptionId:'1'
        });
        
        
      }
      saveToStorage(cart);
 }

 export function removeFromCart(productId){
  let newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
        newCart.push(cartItem);      
    }
  })
  cart=newCart;
  saveToStorage(cart);
 }

 export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
      
  cart.forEach((cartItem)=> {
    if(productId === cartItem.productId){
      matchingItem=cartItem;
    }
  });
  saveToStorage();
 }
