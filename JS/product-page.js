const grid = document.getElementById("productGrid");
const currentUser = localStorage.getItem("currentUser");
const cartKey = currentUser ? `cart_${currentUser}` : "cart";
const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.className = "product-img";

  const info = document.createElement("div");
  info.className = "product-info";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `$${product.price}`;

  const sizeOptions = document.createElement("div");
  sizeOptions.className = "size-options";

  let selectedVariant = null;
  let selectedBtn = null;

  product.variants.forEach(variant => {
    const btn = document.createElement("button");
    btn.textContent = variant.size;
    btn.setAttribute("data-id", variant.id);
    btn.disabled = variant.stock === 0;
    btn.title = variant.stock === 0 ? "Out of Stock" : `${variant.stock} in stock`;

    btn.addEventListener("click", () => {
      if (selectedBtn) selectedBtn.classList.remove("selected");
      btn.classList.add("selected");

      selectedVariant = variant;
      selectedBtn = btn;

      qtyInput.disabled = false;
      qtyInput.max = variant.stock;
      qtyInput.value = 1;
      addToCartBtn.disabled = false;
    });

    sizeOptions.appendChild(btn);
  });

  const qtyWrapper = document.createElement("div");
  qtyWrapper.className = "qty-wrapper";

  const qtyLabel = document.createElement("label");
  qtyLabel.textContent = "Quantity:";

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = 1;
  qtyInput.value = 1;
  qtyInput.disabled = true;
  qtyInput.className = "qty-input";

  qtyWrapper.appendChild(qtyLabel);
  qtyWrapper.appendChild(qtyInput);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to Cart";
  addToCartBtn.className = "add-to-cart";
  addToCartBtn.disabled = true;

  addToCartBtn.addEventListener("click", () => {
    if (!selectedVariant) return;

    const quantity = parseInt(qtyInput.value);
    for (let i = 0; i < quantity; i++) {
      cart.push(selectedVariant.id);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`${product.name} (${selectedVariant.size}) x${quantity} added to cart.`);
  });

  info.appendChild(title);
  info.appendChild(price);
  info.appendChild(sizeOptions);
  info.appendChild(qtyWrapper);
  info.appendChild(addToCartBtn);

  card.appendChild(img);
  card.appendChild(info);
  grid.appendChild(card);
});
