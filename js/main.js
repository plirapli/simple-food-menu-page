// Navigation Menu
document.querySelector('.menu-bar').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('show')
    document.querySelector('.menu-bar').classList.toggle('close')
    document.querySelectorAll('.menu-btn').forEach((btn) => btn.classList.toggle('close'))
})

const all = document.getElementById('all')
const pizza = document.getElementById('pizza')
const fries = document.getElementById('fries')
const chicken = document.getElementById('chicken')
const hamburger = document.getElementById('hamburger')
const noodle = document.getElementById('noodle')
const sushi = document.getElementById('sushi')

all.addEventListener('click', () => {
    let menuType = "all"
    getAllMenu(menuType)
})
pizza.addEventListener('click', () => {
    let menuType = "pizza"
    getAllMenu(menuType)
})
fries.addEventListener('click', () => {
    let menuType = "fries"
    getAllMenu(menuType)
})
chicken.addEventListener('click', () => {
    let menuType = "chicken"
    getAllMenu(menuType)
})
hamburger.addEventListener('click', () => {
    let menuType = "hamburger"
    getAllMenu(menuType)
})
noodle.addEventListener('click', () => {
    let menuType = "noodle"
    getAllMenu(menuType)
})
sushi.addEventListener('click', () => {
    let menuType = "sushi"
    getAllMenu(menuType)
})

async function getAllMenu(type) {
    let menuType = type;
    const navName = document.querySelectorAll('.nav-name');
    const activeNav = document.querySelector('.nav-name.active')

    const navType = document.getElementById(menuType)
    
    navName.forEach(nav => {
        if (nav === activeNav) {
            nav.classList.remove('active')
        } else {navType.classList.add('active')}
    })

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
            <div class="add-chart"><i class="fas fa-plus"></i></div>
            </div>`
    })
    menuContent.innerHTML = output;
    
    const menus = document.querySelectorAll('.menu');
    updateAos(menus)
}

function getPizza() {
    // let menus = data.menu
    // 
}

// Animate On Scroll
function updateAos(menu) {
    const data = menu;
    const options = { rootMargin: "-28px" };
    aos(data, options)
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

const modalCart = document.getElementById('modal-cart');

// document.getElementById('all').addEventListener('click', getAllMenu)

// Cart Button
document.getElementById('cart').addEventListener('click', () => {
    modalCart.style.display = 'block'
})
document.querySelector('.modal-header .close').addEventListener('click', () => modalCart.style.display = 'none')