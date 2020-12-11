document.getElementById('pizza').addEventListener('click', getPizza)
document.getElementById('all').addEventListener('click', getAll)
// document.getElementById('pizza').addEventListener('click', getPizza)

function getAll() {
    const navName = document.querySelectorAll('.nav-name');
    const activeNav = document.querySelector('.nav-name.active')
    const pizza = document.getElementById('all');
    
    navName.forEach(nav => {
        // if(nav )
        if (nav === activeNav) {
            nav.classList.remove('active')
        } else {all.classList.add('active')}
    })

    fetch('../json/menu.json')
    .then(res => res.json())
    .then(data => {
        const menuContent = document.getElementById('menu-content');
        const search = document.getElementById('search');
        let menu = data.menu;

        // Load Menu
        let output = '';
        menu.forEach(m => {
            output += 
            `<div class="menu menu-${m.id}">
                <div class="menu-img">
                    <img src="${m.img}" alt="">
                </div>
                <p class="menu-name">${m.name}</p>
                <p class="menu-price">Rp${m.price}</p>
                <div class="add-chart"><i class="fas fa-plus"></i></div>
            </div>`
        });
        menuContent.innerHTML = output;

        aos();
    })
}

function getPizza() {
    const navName = document.querySelectorAll('.nav-name');
    const activeNav = document.querySelector('.nav-name.active')
    const pizza = document.getElementById('pizza');
    
    navName.forEach(nav => {
        // if(nav )
        if (nav === activeNav) {
            nav.classList.remove('active')
        } else {pizza.classList.add('active')}
    })

    fetch('../json/menu.json')
        .then(res => res.json())
        .then(data => {
            let menus = data.menu
            const pizza = menus.filter(menu => menu.type === 'pizza')
            
        // Load Menu
        const menuContent = document.getElementById('menu-content');
        let output = '';
        pizza.forEach(m => {
            output += 
            `<div class="menu menu-${m.id}">
                <div class="menu-img">
                    <img src="${m.img}" alt="">
                </div>
                <p class="menu-name">${m.name}</p>
                <p class="menu-price">Rp${m.price}</p>
                <div class="add-chart"><i class="fas fa-plus"></i></div>
            </div>`
        });
        menuContent.innerHTML = output;

        aos();
        })
}

getAll();

// Animate On Scroll
function aos() {
    const animation = document.querySelectorAll('.menu');
    const options = { rootMargin: "-28px" }

    observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0) {
                entry.target.style.animation = `anim1 0.8s forwards ease`;
                observer.unobserve(entry.target)
            } else {
                entry.target.style.animation = 'none'
            }
        })
    }, options)

    animation.forEach(anim => observer.observe(anim))
}

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

// Navigation Menu
document.querySelector('.menu-bar').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('show')
    document.querySelector('.menu-bar').classList.toggle('close')
    document.querySelectorAll('.menu-btn').forEach((btn) => btn.classList.toggle('close'))
})