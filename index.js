

let cartItems = document.querySelector(".cart-items");
let parent = document.querySelector(".product-items");
let noProd = document.querySelector(".no-prod");

console.log(parent);

var cart = [];



// for page loading it will show all the products 
window.onload = () => {

    prodList.forEach((prod) => {
        let item = document.createElement("div");
        item.innerHTML = `
        <p>
        <img class="imgg" src=${prod.img}>
        </p>
        <p class="prodName">${prod.name}</p>
        <strong>${prod.price}</strong>
        <div class="quantity">
        <span class="pan sub">${prod.sub}</span>
        <span class="pan count">${prod.count}</span>
        <span class="pan add">${prod.add}</span>
        </div>
        `
        item.classList.add("product");
        parent.appendChild(item);
        noProd.style.display = "block";
    })

}



// by using event daligation we can add or sub products 
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("add")) {

        noProd.style.display = "none";
        // two ways to access the tags by using event daligation
        let prodName = e.target.parentNode.parentNode.children[1].innerText;
        let prodPrice = e.target.parentElement.parentElement.children[2].innerText;
        let prodCount = e.target.parentElement.children[2].innerText;
        // console.log(prodPrice);
        // console.log(prodCount);

        var existingProduct = cart.find(item => item.name === prodName);
        console.log(existingProduct);

        if (existingProduct) {
            existingProduct.count++;
        }
        else {
            cart.push({ name: prodName, price: prodPrice, count: 1 });
        }

        updateCart();
        // console.log(cart);

        let childcount = e.target.parentElement.children[1];
        // console.log(childcount);

        // parseInt() convert string into integer
        let currentcount = parseInt(childcount.innerText);
        let increasecount = currentcount + 1;

        childcount.innerText = increasecount;
    }

    else if (e.target.classList.contains("sub")) {
        let prodName = e.target.parentNode.parentNode.children[1].innerText;
        // console.log(prodName);

        let index = cart.findIndex((prod) => prod.name === prodName)

        if (index !== -1) {
            let existingProduct = cart[index];
            if (existingProduct.count > 1) {
                existingProduct.count--;
            }
            else {
                cart.splice(index, 1);
            }
        }

        let decreasecount = parseInt(e.target.parentElement.children[1].innerText);
        if (decreasecount > 0) {
            let decrease = decreasecount - 1;
            e.target.parentElement.children[1].innerText = decrease;
        }

        if(cart.length < 1){
            noProd.style.display = "block";
        }

        updateCart();
    }

});


function updateCart() {

    let totalEle = document.querySelector('#totalCount');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((prod) => {
        let div = document.createElement("div");
        div.classList.add("cart-div");
        div.innerHTML = `<span class="div-name">${prod.name}</span>
                <span class="div-count">${prod.count} x ${prod.price}</span>`;
        cartItems.appendChild(div);

        total += prod.price * prod.count;

    });

    totalEle.innerHTML = `Total : Rs. ${total}`;
}



