// Navigation Menu
document.querySelector('.menu-bar').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('show');
  document.querySelector('.menu-bar').classList.toggle('close');
  document
    .querySelectorAll('.menu-btn')
    .forEach((btn) => btn.classList.toggle('close'));
});

// CART
// Update Notification Badge on Cart
function updateCartBadge() {
  let carts = document.querySelectorAll('tr.cart-row');
  let cartBadge = document.querySelector('.cart-badge');
  if (carts.length >= 1) {
    cartBadge.classList.add('show');
    cartBadge.innerHTML = carts.length;
  } else {
    cartBadge.classList.remove('show');
  }
}

// Remove Cart
function removingToCart(menuQty, id) {
  let menuQtyResetValue = menuQty.children[1];
  let addCartBtnShow = menuQty.parentElement.children[3];
  let cartRemoveBtn = document.querySelectorAll('.td-remove i');

  cartRemoveBtn.forEach((removeBtn) =>
    removeBtn.addEventListener('click', (e) => {
      let cartId = e.target.parentElement.parentElement.dataset.id;
      if (id == cartId) {
        menuQty.style.display = 'none';
        menuQtyResetValue.value = 1;
        addCartBtnShow.style.display = 'flex';
        removeCartUi(e);
      }
    })
  );
}

function removeCartUi(e) {
  let remove = e.target;
  remove.parentElement.parentElement.remove();
  updateCartBadge();
  updateCartTotal();
}

// Change Qty on Cart
function qtyChangeCart(qty, id) {
  let cartQty = document.querySelectorAll('.cart-qty');
  cartQty.forEach((cart) => {
    let cartQtyId = cart.parentElement.parentElement.dataset.id;
    if (cartQtyId == id) {
      cart.value = qty;
      updateCartTotal();
    }
  });
}

function updateCartTotal() {
  let cartItems = document.querySelector('.cart-items');
  let cartRows = cartItems.querySelectorAll('.cart-row');
  let total = 0;

  cartRows.forEach((row) => {
    let price = parseInt(
      row.querySelector('.td-price').textContent.replace('Rp', '')
    );
    let qty = row.querySelector('.cart-qty').value;
    total += price * qty;
  });
  document.querySelector('.price-total').lastChild.textContent = 'Rp' + total;
}

// 1. Add to Cart Button
function addCart(addCartBtn) {
  const addBtn = addCartBtn;
  addBtn.forEach((add) => {
    let menu = add.parentElement;
    let id = menu.dataset.id;
    let type = menu.dataset.type;
    let menuQty = menu.querySelector('.menu-qty');

    add.addEventListener('click', () => {
      add.style.display = 'none';
      menuQty.style.display = 'flex';
      changeQty(menuQty, id);
      addCartClicked(menu, menuQty, id, type);
      updateCartTotal();
    });
  });
}

// 2. Change Qty on Menu
function changeQty(menuQty, id) {
  const min = menuQty.querySelector('.qty-min');
  const plus = menuQty.querySelector('.qty-plus');
  let qtyValue = parseInt(menuQty.querySelector('.input-qty').value);

  min.addEventListener('click', () => {
    if (qtyValue <= 1) return (qtyValue = 1);
    else {
      qtyValue -= 1;
      menuQty.querySelector('.input-qty').value = qtyValue;
    }
    qtyChangeCart(qtyValue, id);
  });

  plus.addEventListener('click', () => {
    qtyValue += 1;
    menuQty.querySelector('.input-qty').value = qtyValue;
    qtyChangeCart(qtyValue, id);
  });
}

// 3. Add to cart
function addCartClicked(menu, menuQty, id, type) {
  let name = menu.children[1].textContent;
  let price = parseInt(menu.children[2].textContent.replace('Rp', ''));
  let imgSrc = menu.children[0].children[0].src;

  updateUiAddToCart(name, price, imgSrc, menuQty, id, type);
}

function updateUiAddToCart(name, price, imgSrc, menuQty, id, type) {
  const cartTable = document.querySelector('.cart-items');
  const newRow = document.createElement('tr');

  newRow.classList.add('cart-row');
  newRow.dataset.id = id;

  let updateUiRow = `<td class="td-name">
            <img class="img-product" src="${imgSrc}" alt="">
            <div class="product-name">
                <p>${name}</p>
                <span>${type}</span>
            </div>
        </td>
        <td class="td-qty"><input readonly type="number" class="cart-qty" value=1 min=1></td>
        <td class="td-price">Rp${price}</td>
        <td class="td-remove"><i class="fas fa-times"></i></td>`;
  newRow.innerHTML = updateUiRow;
  cartTable.append(newRow);

  updateCartBadge();
  removingToCart(menuQty, id);
}

// Nav Menu
const navMenu = document.querySelectorAll('.nav-name');
navMenu.forEach((nav) => {
  let name = nav.firstElementChild.lastElementChild.textContent;
  nav.addEventListener('click', () => {
    let menuType = name;
    getNav(menuType);
  });
});

function getNav(type) {
  let typeOfMenu = type;
  const navName = document.querySelectorAll('.nav-name');
  const activeNav = document.querySelector('.nav-name.active');

  const navType = document.getElementById(typeOfMenu);

  navName.forEach((nav) => {
    if (nav === activeNav) {
      nav.classList.remove('active');
    } else {
      navType.classList.add('active');
    }
  });

  getAllMenu(typeOfMenu);
}

// Fetch Menu from JSON
async function getAllMenu(type) {
  let menuType = type;

  const getData = await fetch('../json/menu.json');
  const res = await getData.json();
  let menus = await res.menu;

  if (menuType === 'all') {
    updateUiMenu(menus);
  } else {
    let newType = menus.filter((menu) => menu.type === menuType);
    updateUiMenu(newType);
  }
}

function updateUiMenu(data) {
  const menuContent = document.getElementById('menu-content');
  let output = '';

  data.forEach((m) => {
    output += `
        <div class="menu" data-id=${m.id} data-type=${m.type}>
            <div class="menu-img">
                <img src="${m.img}" alt="">
            </div>
            <p class="menu-name">${m.name}</p>
            <p class="menu-price">Rp${m.price}</p>
            <div class="add-cart">
                <i class="fas fa-plus"></i>
            </div>
            <div class="menu-qty">
                <div class="qty-change qty-min">-</div>
                <input type="number" class="input-qty" readonly value=1 min=1>
                <div class="qty-change qty-plus">+</div>
            </div>
        </div>`;
  });
  menuContent.innerHTML = output;
  let addCartBtn = document.querySelectorAll('.add-cart');

  const menus = document.querySelectorAll('.menu');
  const options = { rootMargin: '-28px' };

  updateAos(menus, options);
  modalMenuHandler();
  addCart(addCartBtn);
}

// Animate On Scroll
function updateAos(menu, option) {
  const data = menu;
  const opt = option;
  aos(data, opt);
}

function aos(animate, option) {
  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('show-menu');
        observer.unobserve(entry.target);
      }
    });
  }, option);

  animate.forEach((anim) => observer.observe(anim));
}

getAllMenu('all');

// Search Filter
const search = document.querySelector('.search-bar');

search.addEventListener('input', () => {
  let value = search.value.toUpperCase();
  let menus = document.querySelectorAll('.menu');

  menus.forEach((menu) => {
    let name = menu.querySelector('.menu-name');
    if (name.innerHTML.toUpperCase().indexOf(value) > -1) {
      menu.style.display = '';
    } else {
      menu.style.display = 'none';
    }
  });
});

// Modal Menu
const modalHandler = (modal, modalBtn, modalClose) => {
  modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  modalClose.addEventListener('click', () => (modal.style.display = 'none'));
};

const modalMenuHandler = () => {
  let menus = document.querySelectorAll('.menu-img');
  let modalMenu = document.getElementById('modal-menu');
  let modalClose = document.querySelector('.modal-menu-close');

  menus.forEach((menuBtn) => modalHandler(modalMenu, menuBtn, modalClose));
};

// Modal Cart
const modalCart = document.querySelector('#modal-cart');
const cartBtn = document.querySelector('#cart');
const modalClose = document.querySelector('.modal-cart-close');

modalHandler(modalCart, cartBtn, modalClose);
