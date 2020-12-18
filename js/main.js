// Navigation Menu
document.querySelector('.menu-bar').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('show')
    document.querySelector('.menu-bar').classList.toggle('close')
    document.querySelectorAll('.menu-btn').forEach((btn) => btn.classList.toggle('close'))
})

// Shopping Cart
// Remove Button
let cartRemoveBtn = document.querySelectorAll('.td-remove i');
cartRemoveBtn.forEach(removeBtn => {
    removeBtn.addEventListener('click', removeCart)
})

// CartQty
let cartQty = document.querySelectorAll('.cart-qty')
cartQty.forEach((qty) => {
    qty.addEventListener('change', qtyChange)
})

function removeCart(e) {
    let remove = e.target
    remove.parentElement.parentElement.remove();
    updateCartTotal()
}

function qtyChange(e) {
    let value = e.target.value
    if (isNaN(value) || value <= 0) {
        value = "1";
    }
    console.log(value)
    updateCartTotal()
}

function updateCartTotal() {
    let cartItems = document.querySelector('.cart-items')
    let cartRows = cartItems.querySelectorAll('.cart-row')

    let total = 0
    cartRows.forEach(row => {
        let price = parseInt(row.querySelector('.td-price').textContent.replace('Rp', ''))
        let qty = row.querySelector('.cart-qty').value
        total += price * qty
    })
    document.querySelector('.price-total').lastChild.textContent = "Rp" + total;
}

function addCart(addCartBtn) {
    const addBtn = addCartBtn;
    
    addBtn.forEach(add => {
        let menu = add.parentElement
        add.addEventListener('click', () => {
            add.style.display = 'none'
            addCartClicked(menu)
            updateCartTotal()
        })
    })
}

function addCartClicked(menu) {
    let name = menu.children[1].textContent
    let price = parseInt(menu.children[2].textContent.replace('Rp', ''))
    let imgSrc = menu.children[0].children[0].src

    updateUiAddToCart(name, price, imgSrc)
}

function updateUiAddToCart(name, price, imgSrc) {
    const cartTable = document.querySelector('.cart-items')
    const newRow = document.createElement('tr')
    newRow.classList.add('cart-row')

    productName = document.querySelectorAll('.product-name p')
    let updateUiRow = 
        `<td class="td-name">
            <img class="img-product" src="${imgSrc}" alt="">
            <div class="product-name">
                <p>${name}</p>
                <span>Hamburger</span>
            </div>
        </td>
        <td class="td-qty"><input type="number" class="cart-qty" value=1 min=1></td>
        <td class="td-price">Rp${price}</td>
        <td class="td-remove"><i class="fas fa-times"></i></td>`
    newRow.innerHTML = updateUiRow;
    cartTable.append(newRow)

    document.querySelector('.cart-qty').addEventListener('change', qtyChange)
    document.querySelector('.td-remove i').addEventListener('click', removeCart)
}

// Nav Menu
const navMenu = document.querySelectorAll('.nav-name')
navMenu.forEach((nav) => {
    let name = nav.firstElementChild.lastElementChild.textContent;
    nav.addEventListener('click', () => {
        let menuType = name
        console.log(menuType)
        getNav(menuType)
    })
})

function getNav(type) {
    let typeOfMenu = type;
    const navName = document.querySelectorAll('.nav-name');
    const activeNav = document.querySelector('.nav-name.active')

    const navType = document.getElementById(typeOfMenu)
    console.log(navType)
    
    navName.forEach(nav => {
        if (nav === activeNav) {
            nav.classList.remove('active')
        } else {navType.classList.add('active')}
    })

    getAllMenu(typeOfMenu)
}

// Fetch Menu from JSON
async function getAllMenu(type) {
    let menuType = type;

    const getData = await fetch('../json/menu.json');
    const res = await getData.json();
    let menus = await res.menu;

    if(menuType === "all") {
        updateUiMenu(menus);
    } else {
        let newType = menus.filter(menu => menu.type === menuType)
        updateUiMenu(newType);
    }
}

function updateUiMenu(data) {
    const menuContent = document.getElementById('menu-content');
    let output = '';
    
    data.forEach(m => {
        output += 
        `<div class="menu menu-${m.id}">
            <div class="menu-img">
                <img src="${m.img}" alt="">
            </div>
            <p class="menu-name">${m.name}</p>
            <p class="menu-price">Rp${m.price}</p>
            <div class="add-cart">
                <i class="fas fa-plus"></i>
            </div>
        </div>`
    })
    menuContent.innerHTML = output;

    // let menu = document.querySelectorAll('.menu')
    // let menuName = document.querySelectorAll('.menu-name')
    // let menuPrice = document.querySelectorAll('.menu-price')
    let addCartBtn = document.querySelectorAll('.add-cart')
    // let menuImg = document.querySelectorAll('.menu-img img')

    const menus = document.querySelectorAll('.menu');
    const options = { rootMargin: "-28px" };
    updateAos(menus, options)
    addCart(addCartBtn)
}

// Animate On Scroll
function updateAos(menu, option) {
    const data = menu;
    const opt = option
    aos(data, opt)
}

function aos(animate, option) {
    observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0) {
                entry.target.style.animation = `anim1 0.8s forwards ease`;
                observer.unobserve(entry.target)
            } else {
                entry.target.style.animation = 'none'
            }
        })
    }, option)

    animate.forEach(anim => observer.observe(anim))
}

getAllMenu("all");

//         // Search Filter
//         search.addEventListener('input', () => {
//             let value = document.getElementById('search').value.toUpperCase()
//             console.log(value)
//             let menu = document.querySelectorAll('.menu')

//             for (let i = 0; i < menu.length; i++) {
//                 let name = menu[i].getElementsByClassName('menu-name')[0]

//                 if (name.innerHTML.toUpperCase().indexOf(value) > -1) {
//                     menu[i].style.display = ''
//                 } else {
//                     menu[i].style.display = 'none'
//                 }
//             }

//         });

// Cart Button
const modalCart = document.getElementById('modal-cart');
document.getElementById('cart').addEventListener('click', () => {
    modalCart.style.display = "block"
})
document.querySelector('.modal-header .close').addEventListener('click', () => modalCart.style.display = 'none')