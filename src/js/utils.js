export const Storage = ()=>{
    if(window.localStorage.getItem("cart") === null)
        window.localStorage.setItem("cart", JSON.stringify([]));

    return JSON.parse(window.localStorage.getItem("cart"));
};

export const objExiste = (cart, obj)=>{
    console.log("inside objExiste");
    let tmp1 = JSON.stringify(cart);
    let tmp2 = JSON.stringify(obj);

    return tmp1.includes(tmp2);
};

export const incObj = (cart, obj)=>{
    cart = cart.map((item)=>{
        if(item.type === obj.type && item.name === obj.name)
            item.qte++;
    });
}

export const emptyCardDom = (dom)=>{
    for(let tmp of dom.childNodes)
        dom.removeChild(tmp);
};

export const cartDom = (dom, cart)=>{
    console.log(dom);
    console.log(cart.length);
    const tmp = document.createElement("div");
    console.log(tmp.nodeType);
    console.log("=>", dom.nodeValue);
    for(let tmp of cart){
        tmp.innerHTML = `${tmp.name}-${tmp.type}`;
        dom.appendChild(tmp);
    }
};