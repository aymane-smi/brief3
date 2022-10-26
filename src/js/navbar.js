const humberger = document.querySelector(".fa-bars");
const menu = document.querySelector(".navbar-menu");
let key = true;


window.addEventListener("click", (e)=>{
    if(e.target.isEqualNode(humberger)){
        menu.classList.add("menu-active");
        document.body.style.overflowY = "hidden";
    }
    else{
        menu.classList.remove("menu-active");
        document.body.style.overflowY = "auto";
    }
});