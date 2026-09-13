/* =========================
   MOCHA RESTAURANT
   JAVASCRIPT
========================= */


/* =========================
   PRODUCTS
========================= */

const products = [

  {
    id: 1,
    name: "Truffle Mushroom Pasta",
    cat: "Pasta",
    price: 549,
    rating: "4.9",
    desc: "Creamy parmesan sauce, roasted garlic, herbs and truffle oil.",
    img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 2,
    name: "Smoked Margherita",
    cat: "Pizza",
    price: 399,
    rating: "4.8",
    desc: "Wood-fired crust, tomato, buffalo mozzarella and basil.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 3,
    name: "Mocha Classic Burger",
    cat: "Burgers",
    price: 449,
    rating: "4.9",
    desc: "Juicy grilled patty, caramelized onion, cheese and house sauce.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 4,
    name: "Butter Chicken",
    cat: "Indian",
    price: 499,
    rating: "4.8",
    desc: "Tender chicken in a silky tomato, butter and spice gravy.",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 5,
    name: "Avocado Garden Bowl",
    cat: "Salads",
    price: 329,
    rating: "4.7",
    desc: "Avocado, greens, cherry tomatoes, seeds and citrus dressing.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 6,
    name: "Iced Mocha",
    cat: "Beverages",
    price: 229,
    rating: "4.9",
    desc: "Cold-brew espresso, chocolate, milk and silky foam.",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 7,
    name: "Pistachio Tiramisu",
    cat: "Desserts",
    price: 299,
    rating: "4.9",
    desc: "Mascarpone, espresso, cocoa and roasted pistachio.",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 8,
    name: "Crispy Chili Paneer",
    cat: "Starters",
    price: 349,
    rating: "4.8",
    desc: "Crispy paneer, peppers, spring onion and sweet chili glaze.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 9,
    name: "Classic Cappuccino",
    cat: "Beverages",
    price: 199,
    rating: "4.9",
    desc: "Fresh espresso with steamed milk and silky microfoam.",
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 10,
    name: "Chocolate Lava Cake",
    cat: "Desserts",
    price: 279,
    rating: "5.0",
    desc: "Warm chocolate cake with a rich molten center.",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 11,
    name: "Paneer Tikka",
    cat: "Starters",
    price: 329,
    rating: "4.8",
    desc: "Char-grilled paneer with peppers and aromatic Indian spices.",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 12,
    name: "Chicken Biryani",
    cat: "Main Course",
    price: 449,
    rating: "4.9",
    desc: "Fragrant basmati rice layered with tender chicken and spices.",
    img: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85"
  }

];


/* =========================
   VARIABLES
========================= */

const categories = [
  "All",
  "Starters",
  "Main Course",
  "Pizza",
  "Burgers",
  "Pasta",
  "Indian",
  "Salads",
  "Beverages",
  "Desserts"
];

let activeCategory = "All";

let cart =
  JSON.parse(localStorage.getItem("mochaCart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("mochaWishlist")) || [];

let currentModal = 0;


/* =========================
   HELPERS
========================= */

const $ = selector =>
  document.querySelector(selector);

function money(amount) {

  return "₹" +
    amount.toLocaleString("en-IN");

}


/* =========================
   CATEGORY BUTTONS
========================= */

function renderCategories() {

  const container =
    $("#categories");

  container.innerHTML =
    categories.map(category => {

      return `
        <button
          class="category ${category === activeCategory ? "active" : ""}"
          onclick="setCategory('${category}')"
        >
          ${category}
        </button>
      `;

    }).join("");

}


function setCategory(category) {

  activeCategory = category;

  renderCategories();

  renderProducts();

}


/* =========================
   PRODUCTS
========================= */

function renderProducts() {

  const grid =
    $("#productGrid");

  const search =
    $("#searchInput").value.toLowerCase();

  const filtered =
    products.filter(product => {

      const categoryMatch =
        activeCategory === "All" ||
        product.cat === activeCategory;

      const searchMatch =
        `${product.name} ${product.cat} ${product.desc}`
          .toLowerCase()
          .includes(search);

      return categoryMatch && searchMatch;

    });


  if (!filtered.length) {

    grid.innerHTML = `
      <p style="grid-column:1/-1;color:#999">
        No dishes found.
      </p>
    `;

    return;

  }


  grid.innerHTML =
    filtered.map(product => {

      const wished =
        wishlist.includes(product.id);

      return `

        <article class="product-card reveal visible">

          <div class="product-img">

            <img
              src="${product.img}"
              alt="${product.name}"
              loading="lazy"
            >

            <button
              class="wishlist ${wished ? "active" : ""}"
              onclick="toggleWishlist(${product.id})"
            >
              ${wished ? "♥" : "♡"}
            </button>

          </div>


          <div class="product-info">

            <h3>
              ${product.name}
            </h3>

            <p>
              ${product.desc}
            </p>


            <div class="product-meta">

              <span class="price">
                ${money(product.price)}
              </span>

              <span class="rating">
                ★ ${product.rating}
              </span>

            </div>


            <div class="mini-actions">

              <button
                onclick="openProduct(${product.id})"
              >
                View
              </button>

              <button
                onclick="addProduct(${product.id})"
              >
                Add +
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

}


/* =========================
   WISHLIST
========================= */

function toggleWishlist(id) {

  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(item => item !== id);

    showToast("Removed from wishlist");

  } else {

    wishlist.push(id);

    showToast("Added to wishlist");

  }

  localStorage.setItem(
    "mochaWishlist",
    JSON.stringify(wishlist)
  );

  renderProducts();

}


/* =========================
   CART
========================= */

function addProduct(id) {

  const product =
    products.find(item => item.id === id);

  const existing =
    cart.find(item => item.id === id);


  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }


  saveCart();

  showToast(
    product.name + " added to cart"
  );

}


function saveCart() {

  localStorage.setItem(
    "mochaCart",
    JSON.stringify(cart)
  );

  renderCart();

}


function renderCart() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.qty,
      0
    );


  $("#cartCount").textContent = count;

  $("#mobileCartCount").textContent = count;


  const cartItems =
    $("#cartItems");


  if (!cart.length) {

    cartItems.innerHTML = `
      <p style="padding:30px 0;color:#888">
        Your cart is empty.
      </p>
    `;

  } else {

    cartItems.innerHTML =
      cart.map(item => {

        const product =
          products.find(
            p => p.id === item.id
          );

        return `

          <div class="cart-item">

            <img
              src="${product.img}"
              alt="${product.name}"
            >

            <div>

              <h4>
                ${product.name}
              </h4>

              <small>
                ${money(product.price)}
              </small>

              <div class="qty">

                <button
                  onclick="changeQuantity(${product.id},-1)"
                >
                  −
                </button>

                <span>
                  ${item.qty}
                </span>

                <button
                  onclick="changeQuantity(${product.id},1)"
                >
                  +
                </button>

              </div>

            </div>

            <button
              class="remove"
              onclick="removeProduct(${product.id})"
            >
              ✕
            </button>

          </div>

        `;

      }).join("");

  }


  const total =
    cart.reduce(
      (sum, item) => {

        const product =
          products.find(
            p => p.id === item.id
          );

        return sum +
          product.price * item.qty;

      },
      0
    );


  $("#cartTotal").textContent =
    money(total);

}


function changeQuantity(id, amount) {

  const item =
    cart.find(product => product.id === id);

  if (!item) return;

  item.qty += amount;


  if (item.qty <= 0) {

    cart =
      cart.filter(
        product => product.id !== id
      );

  }


  saveCart();

}


function removeProduct(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();

}


/* =========================
   CART OPEN / CLOSE
========================= */

function openCart() {

  $("#cartDrawer")
    .classList.add("open");

  $("#overlay")
    .classList.add("show");

  document.body
    .classList.add("lock");

}


function closeCart() {

  $("#cartDrawer")
    .classList.remove("open");

  $("#overlay")
    .classList.remove("show");

  document.body
    .classList.remove("lock");

}


/* =========================
   PRODUCT MODAL
========================= */

function openProduct(id) {

  const product =
    products.find(
      item => item.id === id
    );

  currentModal = id;


  $("#modalImage").src =
    product.img;

  $("#modalImage").alt =
    product.name;

  $("#modalCategory").textContent =
    product.cat;

  $("#modalName").textContent =
    product.name;

  $("#modalDescription").textContent =
    product.desc;

  $("#modalPrice").textContent =
    money(product.price);


  $("#productModal")
    .classList.add("show");

}


function closeProduct() {

  $("#productModal")
    .classList.remove("show");

}


/* =========================
   WHATSAPP
========================= */

function orderWhatsApp(items = cart) {

  if (!items.length) {

    showToast(
      "Your cart is empty"
    );

    return;

  }


  const orderLines =
    items.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      return `
${product.name} x${item.qty}
— ${money(product.price * item.qty)}
`;

    });


  const total =
    items.reduce(
      (sum, item) => {

        const product =
          products.find(
            p => p.id === item.id
          );

        return sum +
          product.price * item.qty;

      },
      0
    );


  const message =
`Hello Mocha! 👋

I'd like to place an order:

${orderLines.join("\n")}

Total: ${money(total)}

Thank you!`;


  /*
    CHANGE THIS NUMBER
    TO YOUR REAL WHATSAPP NUMBER.
  */

  const phone =
    "919999999999";


  window.open(
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message),
    "_blank"
  );

}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    $("#toast");

  toast.textContent =
    message;

  toast.classList.add("show");


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2200);

}


/* =========================
   SEARCH
========================= */

$("#searchBtn").onclick = () => {

  $("#searchBox")
    .classList.toggle("show");

  $("#searchInput").focus();

};


$("#closeSearch").onclick = () => {

  $("#searchBox")
    .classList.remove("show");

  $("#searchInput").value = "";

  renderProducts();

};


$("#searchInput").oninput =
  renderProducts;


/* =========================
   CART BUTTONS
========================= */

$("#cartBtn").onclick =
  openCart;

$("#mobileCart").onclick =
  openCart;

$("#closeCart").onclick =
  closeCart;

$("#overlay").onclick =
  closeCart;

$("#orderCart").onclick =
  () => orderWhatsApp();


/* =========================
   MODAL BUTTONS
========================= */

$("#modalAdd").onclick = () => {

  addProduct(currentModal);

  closeProduct();

};


$(".modal-close").onclick =
  closeProduct;


/* =========================
   WHATSAPP BUTTON
========================= */

$("#whatsappBtn").onclick =
  () => orderWhatsApp();


/* =========================
   MOBILE MENU
========================= */

$("#menuToggle").onclick = () => {

  $("#nav")
    .classList.toggle("open");

};


document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.onclick = () => {

      $("#nav")
        .classList.remove("open");

    };

  });


/* =========================
   CONTACT FORM
========================= */

$("#contactForm").onsubmit = event => {

  event.preventDefault();

  showToast(
    "Thank you! Your enquiry has been received."
  );

  event.target.reset();

};


/* =========================
   TESTIMONIALS
========================= */

const reviews = [

  {
    name: "Aarav Sharma",
    role: "Weekend Guest",
    text:
      "Every detail feels intentional. The food, ambience and coffee were exceptional."
  },

  {
    name: "Meera Kapoor",
    role: "Food Lover",
    text:
      "Beautiful place, warm service and some of the best pasta we've had."
  },

  {
    name: "Rohan Verma",
    role: "Regular Guest",
    text:
      "The perfect balance of premium ambience and comfort food."
  }

];


let reviewIndex = 0;


function showReview() {

  const review =
    reviews[reviewIndex];

  $("#reviewName").textContent =
    review.name;

  $("#reviewRole").textContent =
    review.role;

  $("#reviewText").textContent =
    `"${review.text}"`;

}


$("#nextReview").onclick = () => {

  reviewIndex =
    (reviewIndex + 1) %
    reviews.length;

  showReview();

};


$("#prevReview").onclick = () => {

  reviewIndex =
    (reviewIndex - 1 + reviews.length) %
    reviews.length;

  showReview();

};


/* =========================
   GALLERY LIGHTBOX
========================= */

document
  .querySelectorAll(".gallery-item")
  .forEach(item => {

    item.onclick = () => {

      const image =
        item.querySelector("img");

      $("#lightboxImg").src =
        image.src;

      $("#lightbox")
        .classList.add("show");

    };

  });


$("#lightboxClose").onclick = () => {

  $("#lightbox")
    .classList.remove("show");

};


$("#lightbox").onclick = event => {

  if (
    event.target.id ===
    "lightbox"
  ) {

    $("#lightbox")
      .classList.remove("show");

  }

};


/* =========================
   SCROLL REVEAL
========================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target
            .classList.add("visible");

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });


/* =========================
   COUNTERS
========================= */

const counterObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting &&
          !entry.target.dataset.done
        ) {

          entry.target.dataset.done = "true";

          const target =
            Number(
              entry.target.dataset.target
            );

          let number = 0;

          const timer =
            setInterval(() => {

              number +=
                Math.ceil(
                  target / 30
                );

              if (number >= target) {

                number = target;

                clearInterval(timer);

              }

              if (target === 49) {

                entry.target.textContent =
                  (number / 10).toFixed(1) +
                  "★";

              } else {

                entry.target.textContent =
                  number + "+";

              }

            }, 35);

        }

      });

    },
    {
      threshold: .7
    }
  );


document
  .querySelectorAll(".stat strong")
  .forEach(counter => {

    counterObserver.observe(counter);

  });


/* =========================
   BACK TO TOP
========================= */

$("#backTop").onclick = () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};


window.addEventListener(
  "scroll",
  () => {

    $("#backTop")
      .classList.toggle(
        "show",
        window.scrollY > 500
      );

    $("#header")
      .classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

  }
);


/* =========================
   LOADER
========================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      $("#loader")
        .classList.add("hide");

    }, 600);

  }
);


/* =========================
   INITIALIZE
========================= */

renderCategories();

renderProducts();

renderCart();