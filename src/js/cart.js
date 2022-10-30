import { Storage, objExiste, incObj, cartDom, emptyCardDom, minusOne, plusOne, filter, remove } from "./utils.js";
const add_btns = document.querySelectorAll(".add");
const cart_btn = document.querySelector(".cart-btn");
const cart_details = document.querySelector(".cart-details");
const portion_btns = document.querySelectorAll(".portion-btn");

let cart_arr = Storage();//[]
let key = false;
cartDom(cart_details, cart_arr);
minusOne(cart_arr, cart_details);
plusOne(cart_arr, cart_details);
filter();
remove();

if(cart_arr.length !== 0)
    cart_btn.style.display = "unset";

const obj = {
    image: '',
    name: '',
    price: 0,
    type: '',
    qte: 1,
};
//foreach // for...of
for(let portion of portion_btns){
    //callback function
    portion.addEventListener("click", (e)=>{
        console.log(e.target.parentNode);
        for(let tmp of e.target.parentNode.childNodes){
            if(tmp.nodeType === 1)
                tmp.classList.remove("selected-portion");
        }
        e.target.classList.add("selected-portion");
    });
}

for(let btn of add_btns){
    cart_arr = Storage();
    obj.type = "";
    btn.addEventListener("click", (e)=>{
        let existe = false;
        let selected_btn;
        for(let tmp of e.target.parentNode.childNodes[5].childNodes){
            if(tmp.nodeType === 1 && tmp.classList[1] === "selected-portion"){
                selected_btn = tmp;
                existe = true;
                obj.type = tmp.attributes[1].nodeValue;
            }else{
                console.log("inside else");
            }
        }


        if(existe){
            obj.name = e.target.parentNode.childNodes[1].innerText;
            obj.image = e.target.parentNode.parentNode.childNodes[1].attributes[0].nodeValue;
            if(objExiste(cart_arr, obj))
                incObj(cart_arr, obj);
            else
                cart_arr.push({...obj});
            console.log(cart_arr);
            cart_btn.style.display = "unset";
            selected_btn.classList.remove("selected-portion");
            emptyCardDom(cart_details);
            cartDom(cart_details, cart_arr);
            window.localStorage.setItem("cart", JSON.stringify(cart_arr));
        }else{
            alert("please select a portion");
        }
    });
}

cart_btn.addEventListener("click", ()=>{
    key = !key;
    if(key)
        cart_details.style.display = "unset";
    else
        cart_details.style.display = "none";
});
