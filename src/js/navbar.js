const humberger = document.querySelector(".fa-bars");
const menu = document.querySelector(".navbar-menu");


window.addEventListener("click", (e)=>{
    if(e.target.isEqualNode(humberger)){
        menu.classList.add("menu-active");
        menu.style.height = window.outerHeight+"px";
        document.body.style.overflowY = "hidden";
        document.body.classList.add("focused-navbar");
    }
    else{
        menu.classList.remove("menu-active");
        document.body.style.overflowY = "auto";
        document.body.classList.remove("focused-navbar");
    }
});