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
    //ensemble des achia2
    for(let tmp of cart){
        let div = document.createElement("div");
        div.classList.add("item-container");
        div.id = `${tmp.name}-container` 
        div.innerHTML = ` 
        <img src="${tmp.image}" class="cart-image"/>
        <div class="item-content">
            <p class="item-title">
                ${tmp.name}
                <span class="item-type">(${tmp.type})</span>
            </p>
            <div class="qte-selector">
                <span class="minus counter" id="${tmp.name}"> - </span>
                <span class="qte ${tmp.name}-qte">${tmp.qte}</span>
                <span class="plus counter" id="${tmp.name}"> + </span>
            </div>
        </div>
        <p>${tmp.price} $</p>
        `;
        dom.appendChild(div);
    }
    //dom.appendChild(document.createElement("p"));
    console.log(dom);
};

export const minusOne = (cart, dom)=>{
    console.log(dom);
    for(let btn of document.querySelectorAll(".minus")){
        btn.addEventListener("click", (e)=>{
            let value = Number.parseInt(document.querySelector(`.${e.target.attributes[1].nodeValue}-qte`).innerText);
            value--;
            document.querySelector(`.${e.target.attributes[1].nodeValue}-qte`).innerText = value;
            for(let i=0;i<cart.length;i++)
                if(cart[i].name === e.target.attributes[1].nodeValue)
                    if(cart[i].qte === 1){
                        console.log(e.target.attributes[1].nodeValue)
                        cart = cart.filter((item)=> item.name !== e.target.attributes[1].nodeValue);
                        console.log(cart);
                        dom.removeChild(document.querySelector(`#${e.target.attributes[1].nodeValue}-container`));
                    }
                    else
                        cart[i].qte--;
            window.localStorage.setItem("cart", JSON.stringify(cart));
        });
    }
};