let cart = [];
let pendingItem = null;

// LOAD
window.addEventListener("DOMContentLoaded", () => {

    // LOAD cart safely
    const saved = localStorage.getItem("myCart");

    try {
        cart = saved ? JSON.parse(saved) : [];
    } catch {
        cart = [];
    }

    updateCartCount();
    renderCart();

    // SLIDESHOW (SAFE)
    const slides = document.getElementById("slides");

    if (slides) {
        let index = 0;
        const total = slides.children.length;

        setInterval(() => {
            index++;
            if (index >= total) index = 0;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }, 3000);
    }
});

// ADD FLOW
function askConfirm(name, price, img){
    pendingItem = {name, price, img};

    document.getElementById("modal-msg").innerText =
        `Add "${name}" to cart?`;

    document.getElementById("qty-box").style.display = "none";
    document.getElementById("cart-modal").style.display = "flex";

    document.getElementById("modal-yes").onclick = () => {
        const box = document.getElementById("qty-box");

        if(box.style.display === "none"){
            document.getElementById("modal-msg").innerText = "How many?";
            box.style.display = "block";
        } else {
            finalizeAdd();
        }
    };

    document.getElementById("modal-no").onclick = closeModal;
}

// FINAL ADD
function finalizeAdd(){
    const qty = parseInt(document.getElementById("item-qty").value) || 1;

    let existing = cart.find(i => i.name === pendingItem.name);

    if(existing){
        existing.qty += qty;
    } else {
        cart.push({
            name: pendingItem.name,
            price: pendingItem.price,
            img: pendingItem.img,
            qty: qty
        });
    }

    saveCart();
    updateCartCount();
    closeModal();
    showToast(`Added ${qty} x ${pendingItem.name}`);
}

// CLOSE MODAL
function closeModal(){
    document.getElementById("cart-modal").style.display = "none";
    document.getElementById("item-qty").value = 1;
}

// TOAST
function showToast(msg){
    let toast = document.getElementById("toast");

    if(!toast){
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.innerText = msg;
    toast.style.display = "block";

    setTimeout(()=>toast.style.display="none", 2500);
}

// RENDER CART
function renderCart(){
    const container = document.getElementById("cart-items");
    if(!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, i)=>{
        const sub = item.price * item.qty;
        total += sub;

        container.innerHTML += `
        <div class="cart-item">
            <div class="product-info">
                <img src="${item.img}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₱${item.price}</p>
                </div>
            </div>

            <div class="qty-box">
                <button onclick="changeQty(${i},-1)">-</button>
                ${item.qty}
                <button onclick="changeQty(${i},1)">+</button>
            </div>

            <div>₱${sub}</div>

            <div>
                <span class="remove-btn" onclick="removeItem(${i})">❌</span>
            </div>
        </div>
        `;
    });

    const totalEl = document.getElementById("total-price");
    if(totalEl) totalEl.innerText = total;
}

// CHANGE QTY
function changeQty(i, val){
    cart[i].qty += val;
    if(cart[i].qty < 1) cart[i].qty = 1;

    saveCart();
    renderCart();
    updateCartCount();
}

// REMOVE
function removeItem(i){
    cart.splice(i,1);
    saveCart();
    renderCart();
    updateCartCount();
}

// SAVE
function saveCart(){
    localStorage.setItem("myCart", JSON.stringify(cart));
}

// COUNT
function updateCartCount(){
    let count = 0;

    cart.forEach(item => {
        count += Number(item.qty) || 0;
    });

    const el = document.getElementById("cart-count");
    if(el) el.innerText = count;
}