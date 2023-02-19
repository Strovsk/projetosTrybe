function calculateTotal() {
  const subtotalElm = document.getElementById('subtotal');
  const store = JSON.parse(localStorage.getItem('cart'));
  const items = Object.values(store);

  const finalPrice = items.reduce((cur, next) => cur += next.total, 0);
  const payElm = document.getElementById('pay');
  if (finalPrice === 0) payElm.disabled = true;
  else payElm.disabled = false;

  const formatedPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
  const formattedFinalPrice = formatedPrice.format(finalPrice);

  subtotalElm.innerText = `Subtotal: ${formattedFinalPrice}`;
  console.log('dados do carrinho', items);
}
window.calculateTotal = calculateTotal;
calculateTotal();
