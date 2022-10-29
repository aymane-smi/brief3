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
    console.log("=>", dom);
    for(let tmp of cart){
        let div = document.createElement("div");
        div.classList.add("item-container");
        div.innerHTML = `
        <img src="${tmp.image}" class="item-image"/>
        <div class="item-content">
            <p class="item-title">${tmp.name}</p>
            <div class=""qte-selector>
                <span class="minus"> - </span>
                <span>${tmp.qte}</span>
                <span class="plus"> + </span>
            </div>
        </div>
        <p>${tmp.price}</p>
        `;
        dom.appendChild(div);
    }
    //dom.appendChild(document.createElement("p"));
    console.log(dom);
};