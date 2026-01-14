let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
  search.classList.toggle('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
  navbar.classList.toggle('active');
  search.classList.toggle('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  search.classList.remove('active');
}

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
})

// ====== Tombol Kembali ke Atas ======
const scrollTopBtn = document.getElementById("scrollTopBtn");
// Tampilkan tombol saat halaman digulir ke bawah
window.addEventListener("scroll", () => {
if (window.scrollY > 200) {
scrollTopBtn.style.display = "block";
} else {
scrollTopBtn.style.display = "none";
}
});
// Saat tombol diklik, gulir ke atas dengan animasi halus
scrollTopBtn.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth",
});
});

// ====== Read More (Our History) ======
const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

readMoreBtn.addEventListener("click", () => {
  if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    readMoreBtn.textContent = "Sembunyikan";
  } else {
    moreText.style.display = "none";
    readMoreBtn.textContent = "Lihat Selengkapnya";
  }
});
// ====== Customer Slider ======
const slider = document.getElementById("customerSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});

// === SYSTEM KERANJANG ===
let cart = [];
const cartIcon = document.getElementById("cartIcon");
const cartDiv = document.getElementById("cart");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// toggle cart
cartIcon.addEventListener("click", () => {
  cartDiv.classList.toggle("active");
});

// tombol add ke cart
document.querySelectorAll(".products-container .box").forEach(box => {
  box.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    const name = box.querySelector("h3").innerText;
    const price = box.querySelector("span").innerText;
    const img = box.querySelector("img").src;

    addToCart(name, price, img);
  });
});

function addToCart(name, price, img) {
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let priceNum = parseInt(item.price.replace(/[^0-9]/g, ""));
    total += priceNum * item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div>
          <p>${item.name}</p>
          <p>${item.price} x ${item.qty}</p>
        </div>
      </div>
    `;
  });

  cartTotalEl.innerText = "Rp" + total.toLocaleString();
}

// checkout ke WhatsApp
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjangmu masih kosong der.");
    return;
  }

  let message = "Halo, saya mau pesan:%0A%0A";

  cart.forEach(item => {
    message += `- ${item.name} (${item.qty}x)%0A`;
  });

  message += `%0ATotal: ${cartTotalEl.innerText}%0A`;
  
  window.open("https://wa.me/6285928891721?text=" + message);
});
// ===== FORM HUBUNGI KAMI (WhatsApp) =====
document.getElementById("formHubungi").addEventListener("submit", function(e){
  e.preventDefault();

  let nama = document.getElementById("nama").value;
  let email = document.getElementById("email").value;
  let pesan = document.getElementById("pesan").value;

  let text = 
    `Halo, saya ingin menghubungi:%0A%0A` +
    `Nama: ${nama}%0A` +
    `Email: ${email}%0A` +
    `Pesan:%0A${pesan}`;

  window.open(`https://wa.me/6285928891721?text=${text}`);
});

// ===== LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => {
      loader.style.display = "none";
    }, 300);
  }, 600); // durasi loader tampil (ms)
});
