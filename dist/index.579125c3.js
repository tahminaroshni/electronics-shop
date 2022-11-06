const productsContainer = document.querySelector(".products-container");
const modal = document.querySelector(".modal");
const crossBtn = document.querySelector(".close-modal");
const carts = document.querySelector(".carts");
const showCart = document.querySelector(".show-cart");
const productSelected = document.querySelector(".selected-product");
function fetchProducts() {
    fetch("http://localhost:8000/products").then((response)=>{
        if (!response.ok) throw new Error("Something is wrong!");
        return response.json();
    }).then((data)=>displayProducts(data)).catch((error)=>console.log(error));
}
fetchProducts();
function displayPrice(price) {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}
function addToCart(product) {
    const cartHtml = `
          <div
          class="cart w-5/6 h-44 bg-cyan-200 mx-auto py-10 grid grid-cols-4 gap-10 justify-items-start border-2 border-cyan-300 shadow-xl items-center rounded-lg">
                <div class="cart-img h-full w-5/6 overflow-hidden">
                    <img class="block h-full w-full" src="${product.image}"
                      alt="">
                </div>
                <div class="cart-info col-span-2 flex flex-col gap-8 w-96">
                    <h3 class="text-2xl font-semibold">${product.title}</h3>
                    <div class="price-section flex justify-between gap-20">
                      <h4 class="price text-2xl">Price: <span class="font-semibold">${displayPrice(product.price)}</span></h4>
                      <p class="flex gap-3 font-semibold text-2xl"><span
                          class="bg-cyan-50 px-3 rounded cursor-pointer">-</span><span>1</span><span
                          class="bg-cyan-50 px-3 rounded cursor-pointer">+</span>
                      </p>
                    </div>
                </div>
                <h3 class="cart-delete text-2xl cursor-pointer justify-self-center"><i class="fa-solid fa-trash-can"></i></h3>
          </div>
  `;
    carts.insertAdjacentHTML("beforeend", cartHtml);
}
function loadProductFromLocalStorage() {
    for(let i = 0; i < localStorage.length; i++){
        // console.log(localStorage.key(i));
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const parseValue = JSON.parse(value);
        addToCart(parseValue);
        // show selected product number
        productSelected.textContent = localStorage.length;
    }
}
loadProductFromLocalStorage();
function saveProductInLocalStorage(product) {
    if (localStorage.getItem(`item-${product.id}`)) return;
    localStorage.setItem(`item-${product.id}`, `${JSON.stringify(product)}`);
    // product selected
    let prevCount = Number(productSelected.textContent);
    prevCount++;
    productSelected.textContent = prevCount;
    console.log(prevCount);
    addToCart(product);
}
function fetchProduct(product) {
    fetch(`http://localhost:8000/products/${product}`).then((response)=>{
        if (!response.ok) throw new Error("Can't find your product!");
        return response.json();
    }).then((data)=>{
        return saveProductInLocalStorage(data);
    }).catch((error)=>console.log(error));
}
function displayProducts(products) {
    productsContainer.textContent = "";
    products.forEach((product)=>{
        const html = `
          <div class="product bg-white h-full p-5  shadow-xl rounded-lg">
                <div class="product-img w-full h-96 overflow-hidden rounded-lg">
                  <img class="block h-full w-full"
                    src="${product.image}"
                    alt="">
                </div>
                <h4 class="product-category text-2xl font-semibold text-cyan-500 uppercase tracking-tight pt-10">${product.category}</h4>
                <h3 class="product-title text-3xl font-semibold my-5 truncate">${product.title}</h3>
                <h4 class="product-price text-3xl font-semibold mb-8">Price: ${displayPrice(product.price)}</h4>
                <div class="flex justify-between">
                  <a href="#" data-id="${product.id}"
                    class="order-product bg-cyan-500 text-cyan-50 text-2xl font-semibold uppercase p-2 px-4 rounded hover:bg-cyan-600">Order
                    Now</a>
                  <a href="#"
                    class="details bg-cyan-500 bg-indigo-500 text-white text-2xl font-semibold p-2 px-6 tracking-wider uppercase rounded">Details</a>
                </div>
        </div>
    `;
        productsContainer.insertAdjacentHTML("beforeend", html);
    });
    const orderBtns = document.querySelectorAll(".order-product");
    orderBtns.forEach((orderBtn)=>{
        orderBtn.addEventListener("click", function(e) {
            e.preventDefault();
            modal.classList.remove("hidden");
            const productNumber = e.target.dataset.id;
            fetchProduct(productNumber);
        });
    });
    crossBtn.addEventListener("click", function() {
        modal.classList.add("hidden");
    });
}
showCart.addEventListener("click", function() {
    modal.classList.remove("hidden");
});

//# sourceMappingURL=index.579125c3.js.map
