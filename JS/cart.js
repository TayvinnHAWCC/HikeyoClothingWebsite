const cartItemsContainer = document.getElementById("cartItems");
const currentUser = localStorage.getItem("currentUser");
const cartKey = currentUser ? `cart_${currentUser}` : "cart";
const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const itemMap = {};
cart.forEach(id => {
  itemMap[id] = (itemMap[id] || 0) + 1;
});

const allVariants = products.flatMap(p =>
  p.variants.map(v => ({
    ...v,
    name: p.name,
    price: p.price
  }))
);

function renderCart() {
  cartItemsContainer.innerHTML = "";

  Object.keys(itemMap).forEach(variantId => {
    const quantity = itemMap[variantId];
    const variant = allVariants.find(v => v.id === variantId);
    if (!variant) return;

    const item = document.createElement("div");
    item.className = "cart-item";

    const title = document.createElement("h3");
    title.textContent = `${variant.name} (${variant.size})`;

    const qtyControl = document.createElement("input");
    qtyControl.type = "number";
    qtyControl.value = quantity;
    qtyControl.min = 1;
    qtyControl.className = "cart-qty";
    qtyControl.addEventListener("change", () => {
      const newQty = parseInt(qtyControl.value);
      itemMap[variantId] = newQty;
      updateLocalStorage();
      renderCart();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      delete itemMap[variantId];
      updateLocalStorage();
      renderCart();
    });

    item.appendChild(title);
    item.appendChild(qtyControl);
    item.appendChild(removeBtn);
    cartItemsContainer.appendChild(item);
  });
}

function updateLocalStorage() {
  const newCart = [];
  Object.entries(itemMap).forEach(([id, qty]) => {
    for (let i = 0; i < qty; i++) {
      newCart.push(id);
    }
  });
  localStorage.setItem(cartKey, JSON.stringify(newCart));
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  localStorage.removeItem(cartKey); 
  window.location.href = "thank-you.html";
}

renderCart();
