let initialCartData = [];
let isSideBarOpen = false;

const addToCart = (item) => {
  const found = initialCartData.find((d) => d.name === item.name);
  if (!found) {
    initialCartData = [...initialCartData, { ...item, quantity: 1 }];
    document
      .getElementById(`add-to-cart-${item.id}`)
      .classList.add(`bg-gray-500`);
    document
      .getElementById(`add-to-cart-${item.id}`)
      .classList.add(`border-gray-500`);
  }
  loadCartItems();
  updateInfos();

  document.getElementById(`add-to-cart-${item.id}`).innerText = `Added to Cart`;
  if (!isSideBarOpen) {
    document.getElementById("sidebar").classList.remove("translate-x-[400px]");
    document.getElementById("sidebar").classList.remove("w-0");
    document.getElementById("sidebar").classList.add("w-[400px]");
  }
};

const incQuantity = (name) => {
  const item = initialCartData.find((item) => item.name === name);
  if (item) {
    item.quantity += 1;
  }
  loadCartItems();
  updateInfos();
};

const decQuantity = (name) => {
  const item = initialCartData.find((item) => item.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
  loadCartItems();
  updateInfos();
};

const deleteItem = (deletingItem) => {
  initialCartData = initialCartData.filter(
    (item) => item.name !== deletingItem.name
  );
  document
    .getElementById(`add-to-cart-${deletingItem.id}`)
    .classList.remove(`bg-gray-500`);
  document
    .getElementById(`add-to-cart-${deletingItem.id}`)
    .classList.remove(`border-gray-500`);
  loadCartItems();
  updateInfos();

  document.getElementById(
    `add-to-cart-${deletingItem.id}`
  ).innerText = `Add to Cart`;
};

function updateInfos() {
  const cartItems = initialCartData.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  const totalPrice = initialCartData.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  document.getElementById("nav-itemcount").innerText = cartItems;
  document.getElementById("sidebar-itemcount").innerText = cartItems;
  document.getElementById("sidebar-totalprice").innerText = totalPrice;
}

meals.forEach((item) => {
  const card = document.createElement("div");
  card.innerHTML = `
  <div class="relative">
      <div class="max-w-[320px] p-[15px] bg-[#ecedef] rounded">
          <img class="h-[180px] w-full object-cover" src="${
            item.imgUrl
          }" alt="">
          <h3 class="font-[600] mt-[15px]">${item.name}</h3>
          <p class="text-gray-700 font-[500]">${item.price}$/each</p>
          <p class="text-gray-600 mt-[15px]">${
            item.description.slice(0, 100) +
            (item.description.length > 100 ? "..." : "")
          }</p>
          <div id="card-cations-${
            item.id
          }" class="flex flex-col gap-[10px] mt-[18px]">
            <button id="add-to-cart-${
              item.id
            }" class="font-[500] border-[#ff5242] border-[2px] bg-[#ff5242] w-full rounded text-white px-[30px] py-[4px]">Add to Order</button>
            <button class="font-[500] border-[#ff5242] border-[2px] w-full rounded px-[30px] py-[4px] text-[#ff5242]">Customize</button>
          </div>
      </div>
      ${
        item.isNew
          ? `<div class="absolute bg-[#ff5242] text-white px-[20px] py-[5px] rounded-full font-[600] rotate-[-45deg] top-[-18px] left-[-33px] uppercase">New</div>`
          : ""
      }
  </div>
  `;
  document.getElementById("dish-container").appendChild(card);
  document
    .getElementById(`add-to-cart-${item.id}`)
    .addEventListener("click", () => {
      addToCart(item);
    });
});

const loadCartItems = () => {
  document.getElementById("sidebar-container").innerHTML = "";
  initialCartData.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="border text-white border-white p-[8px] rounded m-[8px] flex justify-between relative">
      <div class="flex gap-[15px]">
        <img class="object-cover h-[100px] w-[80px]" src="${
          item.imgUrl
        }" alt="">
        <div>
          <p class="font-[600]">${item.name}</p>
          <p>${item.price}$</p>
          <div class="flex items-center text-black mt-[10px]">
            <button id="quantity-dec-btn-${
              item.name
            }" class="bg-gray-200 px-2 py-[1px] rounded-sm mr-[-1px]">-</button>
            <p class="bg-white w-auto px-[15px]">${item.quantity}</p>
            <button id="quantity-inc-btn-${
              item.name
            }" class="bg-gray-200 px-2 py-[1px] rounded-sm ml-[-1px]">+</button>
          </div>
        </div>
      </div>
      <div class="self-end font-bold">${item.price * item.quantity}$</div>
      <div id="delete-cart-item-${
        item.name
      }" class="bg-white absolute top-[-5px] right-[-5px] p-1 rounded cursor-pointer">
        <img class="w-[15px] h-[15px]" src="./assests/bin.png" alt="">
      </div>
    </div>
    `;
    document.getElementById("sidebar-container").appendChild(card);

    document
      .getElementById(`quantity-inc-btn-${item.name}`)
      .addEventListener("click", () => incQuantity(item.name));
    document
      .getElementById(`quantity-dec-btn-${item.name}`)
      .addEventListener("click", () => decQuantity(item.name));
    document
      .getElementById(`delete-cart-item-${item.name}`)
      .addEventListener("click", () => deleteItem(item));
  });
};

loadCartItems();

// sidebar open
document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("translate-x-[400px]");
  document.getElementById("sidebar").classList.remove("w-0");
  document.getElementById("sidebar").classList.add("w-[400px]");
  isSideBarOpen(true);
});
// sidebar close
document.getElementById("sidebar-close").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("translate-x-[400px]");
  document.getElementById("sidebar").classList.remove("w-[400px]");
  document.getElementById("sidebar").classList.add("w-0");
  isSideBarOpen(false);
});
