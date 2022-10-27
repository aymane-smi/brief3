const add_btns = document.querySelectorAll(".add");
const cart_btn = document.querySelector(".cart-btn");
const cart_details = document.querySelector(".cart-details");
const portion_btns = document.querySelectorAll(".portion-btn");
let key = false;
localStorage.setItem("cart", JSON.stringify([]));

const obj = {
    image: '',
    name: '',
    price: 0,
    type: '',
    qte: 1,
};
for(portion of portion_btns){
    portion.addEventListener("click", (e)=>{
        for(let tmp of e.target.parentNode.childNodes)
            if(tmp.nodeType === 1)
                tmp.classList.remove("selected-portion");
        e.target.classList.add("selected-portion");
    });
}
for(btn of add_btns){
    btn.addEventListener("click", (e)=>{
        let existe = false;
        console.log(e.target.parentNode.childNodes[5].childNodes);
        for(let tmp of e.target.parentNode.childNodes[5].childNodes){
            if(tmp.nodeType === 1 && tmp.attributes.class.nodeValue.includes("selected-portion"))
                existe = true;
        }
        //console.log(document.querySelector(".selected-portion").attributes[1].nodeValue);
        obj.name = e.target.parentNode.childNodes[1].innerText;
        //obj.type = document.querySelector(".selected-portion").attributes[1].nodeValue;
        obj.image = e.target.parentNode.parentNode.childNodes[1].attributes[0].nodeValue;
        console.log(obj);
        cart_btn.style.display = "unset";
    });
}

cart_btn.addEventListener("click", ()=>{
    key = !key;
    if(key)
        cart_details.style.display = "unset";
    else
        cart_details.style.display = "none";
});
