export function saveToStorage(cart){
    localStorage.setItem('cart',JSON.stringify(cart));
  }