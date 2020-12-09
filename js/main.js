let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        let menu = JSON.parse(xhttp.responseText).menu;
        let mainMenu = menu.slice(0, 8);

        document.getElementById('loadMore').addEventListener('click', () => {mainMenu = menu})

        let output = '';
        mainMenu.forEach(m => {
           output += 
            `<div class="menu menu-${m.id}">
                <div class="menu-img">
                    <img src="${m.img}" alt="">
                </div>
                <p class="menu-name">
                    ${m.name}
                </p>
                <p class="menu-price">Rp${m.price}</p>
                <div class="add-chart"><i class="fas fa-plus"></i></div>
            </div>`
       });
       document.getElementById('menu-content').innerHTML = output;
    }
};
xhttp.open("GET", "../json/menu.json", true);
xhttp.send();

// Navigation Menu
document.querySelector('.menu-bar').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('show')
    document.querySelector('.menu-bar').classList.toggle('close')
    document.querySelectorAll('.menu-btn').forEach((btn) => btn.classList.toggle('close'))
})