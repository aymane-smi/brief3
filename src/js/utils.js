export const Storage = ()=>{
    if(window.localStorage.getItem("cart") === null)
        window.localStorage.setItem("cart", JSON.stringify([]));

    return JSON.parse(window.localStorage.getItem("cart"));
};

export const objExiste = (cart, obj)=>{
    console.log(obj);
    for(let item of JSON.parse(window.localStorage.getItem("cart")))
        if(item.name === obj.name && item.type === obj.type){
            return true;
        }
        return false;
};

export const incObj = (cart, obj)=>{
    cart = cart.map((item)=>{
        if(item.type === obj.type && item.name === obj.name)
            item.qte++;
    });

    console.log(cart);
    window.localStorage.getItem("cart", JSON.stringify(cart));
}

export const emptyCardDom = (dom)=>{
    while(dom.firstChild)
        dom.removeChild(dom.firstChild);
};

export const cartDom = (dom, cart)=>{
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
            <span class="remove" id="${tmp.name}-${tmp.type}">remove</span>
        </div>
        <p>${tmp.price} $</p>
        `;
        dom.insertBefore(div, document.querySelector(".total"));
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
                        forceClose();
                    }
                    else
                        cart[i].qte--;
            window.localStorage.setItem("cart", JSON.stringify(cart));
        });
    }
};

export const plusOne = (cart, dom)=>{
    for(let btn of document.querySelectorAll(".plus")){
        btn.addEventListener("click", (e)=>{
            let value = Number.parseInt(document.querySelector(`.${e.target.attributes[1].nodeValue}-qte`).innerText);
            value++;
            document.querySelector(`.${e.target.attributes[1].nodeValue}-qte`).innerText = value;
            for(let i=0;i<cart.length;i++)
                if(cart[i].name === e.target.attributes[1].nodeValue)
                        cart[i].qte++;
            window.localStorage.setItem("cart", JSON.stringify(cart));
        });
    }
};


export const filter = ()=>{
    const filter_btns = document.querySelectorAll(".filter");
    for(let btn of filter_btns)
        btn.addEventListener("click", (e)=>{
            for(let tmp of e.target.parentNode.childNodes)
                if(tmp.nodeType === 1)
                    tmp.style.border = "2px solid black";
            e.target.style.border = "2px solid #FC0505";
            if(e.target.id === "all")
                for(let container of document.querySelectorAll(".container")){
                    console.log(container);
                    container.style.display = "flex";
                    container.style.flexWrap = "unset";
                    console.log(container.style.display, container.style.flexWrap);
                }
            else
                for(let container of document.querySelectorAll(".container")){
                if(container.classList[1] === e.target.id){
                    container.style.display = "flex";
                    container.style.flexWrap = "flex-wrap";
                }else{
                    container.style.display = "none";
                    container.style.flexWrap = "unset";
                }
            }
        });
}

export const remove = ()=>{
    const remove_btns = document.querySelectorAll(".remove");
    for(let btn of remove_btns)
        btn.addEventListener("click", (e)=>{
            const id = e.target.id.split("-");
            let cart = JSON.parse(window.localStorage.getItem("cart"));
            cart = cart.filter((item)=>item.name === id[0] && item.type === id[1]);
            window.localStorage.setItem("cart", JSON.stringify(cart));
            document.querySelector(".cart-details").removeChild(btn.parentNode.parentNode);
            forceClose();
        });
}

const forceClose = ()=>{
    if(document.querySelector(".cart-details").childNodes.length === 3){
        document.querySelector(".cart-details").style.display = "none";
        document.querySelector(".cart-btn").style.display = "none";
    }

}