let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       let menu = JSON.parse(xhttp.responseText).menu;

       let output = '';
       for (let i = 0; i < menu.length; i++) {
           output += 
            `<div class="menu menu-${menu[i].id}">
                <div class="menu-img">
                    <img src="${menu[i].img}" alt="">
                </div>
                <p class="menu-name">
                    ${menu[i].name}
                </p>
                <p class="menu-price">Rp${menu[i].price}</p>
                <div class="add-chart"><i class="fas fa-plus"></i></div>
            </div>`
       }
       document.getElementById('menu-content').innerHTML = output;

    }
};
xhttp.open("GET", "../json/menu.json", true);
xhttp.send();