// ============ MAIN & DATA ============

// ✅ Prevent duplicate declaration
if (typeof Orders === "undefined") {
  var Orders = {
    get() {
      return JSON.parse(localStorage.getItem('nt_orders') || '[]');
    },
    add(order) {
      const orders = Orders.get();
      order.id = 'ORD-' + Date.now();
      order.date = new Date().toLocaleDateString('en-IN');
      order.status = 'Processing';
      orders.push(order);
      localStorage.setItem('nt_orders', JSON.stringify(orders));
      return order.id;
    }
  };
}

// ✅ PRODUCTS DATA
const PRODUCTS = [
  { id: 'p1', name: 'Eco Notebooks', category: 'stationery', price: 249, img: 'notebooks.jpg', img2: 'notebooks2.jpg', desc: 'Handcrafted notebooks from recycled natural fibres.', features: ['Recycled fibre covers', '100 acid-free pages'] },
  { id: 'p2', name: 'Paper Bags', category: 'packaging', price: 149, img: 'paperbag1.jpg', img2: 'paperbag2.jpg', desc: 'Sturdy kraft paper bags.', features: ['100% biodegradable', 'Multiple sizes'] },
  { id: 'p3', name: 'Seed Pencils', category: 'stationery', price: 199, img: 'pencils1.jpg', img2: 'pencils2.jpg', desc: 'Plantable pencils.', features: ['Seed capsule', 'Zero plastic'] },
  { id: 'p4', name: 'Plantable Calendar', category: 'stationery', price: 349, img: 'calender.jpg', img2: 'calender2.jpg', desc: 'Seed paper calendar.', features: ['Seed pages', 'Wooden stand'] },
  { id: 'p5', name: 'Thank You Cards', category: 'stationery', price: 99, img: 'thankyoucard.jpg', img2: 'thankyoucard.jpg', desc: 'Plantable cards.', features: ['Seed paper', 'Pack of 10'] },
  { id: 'p6', name: 'Garment Tags', category: 'packaging', price: 179, img: 'cards.jpg', img2: 'cards.jpg', desc: 'Eco tags.', features: ['Seed paper', 'Custom branding'] },
  { id: 'p7', name: 'Eco Combo Pack', category: 'combo', price: 549, img: 'everything1.jpg', img2: 'everything1.jpg', desc: 'Eco kit.', features: ['10+ products'] },
  { id: 'p8', name: 'Herb Lab Kit', category: 'combo', price: 699, img: 'everything2.jpg', img2: 'everything2.jpg', desc: 'Herb starter kit.', features: ['5 seeds'] },
];

// ✅ PRODUCT CARD
// function renderProductCard(p, basePath) {
//   basePath = basePath || getBasePath();

//   const imgSrc = basePath + 'images/' + p.img;
//   const checkoutHref = basePath + 'pages/checkout.html?id=' + p.id;
//   const safeName = p.name.replace(/'/g, "\\'");

//   return `
//   <div class="product-card animate-up">
//     <div class="product-img-wrap">
//       <img src="${imgSrc}" alt="${p.name}">
//       <div class="product-overlay">
//         <button onclick="quickView('${p.id}')">Quick View</button>
//       </div>
//     </div>
//     <div class="product-info">
//       <span>${p.category}</span>
//       <h3>${p.name}</h3>
//       <div>
//         ₹${p.price}
//         <button onclick="Cart.add({id:'${p.id}',name:'${safeName}',price:${p.price},img:'${imgSrc}',qty:1})">Cart</button>
//         <a href="${checkoutHref}">Buy</a>
//       </div>
//     </div>
//   </div>`;
// }

// function renderProductCard(p) {
//   const imgSrc = p.img && p.img.startsWith('http')
//     ? p.img
//     : '../images/' + p.img;

//   return `
//   <div class="product-card">

//     <div class="product-img">
//       <img src="${imgSrc}" alt="${p.name}" />

//       <div class="quick-view" onclick="quickView('${p.id}')">
//         Quick View
//       </div>
//     </div>

//     <div class="product-info">
//       <p>${p.category}</p>
//       <h3>${p.name}</h3>

//       <div class="product-price">₹${p.price}</div>

//       <div class="product-actions">
//         <button class="cart-btn"
//           onclick="Cart.add({id:'${p.id}',name:'${p.name}',price:${p.price},img:'${imgSrc}',qty:1})">
//           Cart
//         </button>

//         <a href="checkout.html?id=${p.id}" class="buy-btn">
//           Buy
//         </a>
//       </div>
//     </div>

//   </div>
//   `;
// }


function renderProductCard(p) {
  const imgSrc = p.img && p.img.startsWith('http')
    ? p.img
    : '/natures-touch/images/' + p.img;

  const checkoutHref = '/natures-touch/pages/checkout.html?id=' + p.id;

  return `
  <div class="product-card">
    <div class="product-img-wrap">
      <img src="${imgSrc}" alt="${p.name}" />
      <div class="product-overlay" onclick="quickView('${p.id}')">
        Quick View
      </div>
    </div>
    <div class="product-info">
      <span>${p.category}</span>
      <h3>${p.name}</h3>
      <div class="product-price">₹${p.price}</div>
      <div class="product-actions">
        <button class="cart-btn"
          onclick="Cart.add({id:'${p.id}',name:'${p.name}',price:${p.price},img:'${imgSrc}',qty:1})">
          Cart
        </button>
        <a href="${checkoutHref}" class="buy-btn">Buy</a>
      </div>
    </div>
  </div>
  `;
}



// ✅ INIT
document.addEventListener('DOMContentLoaded', () => {
  console.log("SESSION:", Auth.getSession());

  if (typeof initNav === "function") initNav();
  if (typeof initAnimations === "function") initAnimations();
});


const fileInput = document.getElementById("fileInput");

if (fileInput) {
  fileInput.addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/user/upload-photo", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        email: Auth.getSession() ? Auth.getSession().email : ""
      },
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById("profileImg").src = data.imageUrl;
      localStorage.setItem("profileImg", data.imageUrl);
    } else {
      alert("Upload failed");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {

  const savedImg = localStorage.getItem("profileImg");
  const img = document.getElementById("profileImg");

  if (!img) return;

  if (savedImg) {
    img.src = savedImg;
  } else {
    // ✅ DEFAULT IMAGE FIX
    img.src = window.location.pathname.includes('/pages/')
      ? '../images/default-avatar.png'
      : 'images/default-avatar.png';
  }

});