let productsContainer = document.querySelector(".products-container");
let innerHTML = '';
let bagitems;
onload(); 
function onload(){
    let bagitemstr = localStorage.getItem('bagitems');
    bagitems = bagitemstr ? JSON.parse(bagitemstr) : [];
    displayProduct();
    showbagicon();
}

//Addtobag function  -->
function addtoBag(itemid){
    bagitems.push(itemid)
    localStorage.setItem('bagitems', JSON.stringify(bagitems));
    showbagicon();
}

//Display  bagicon -->
function showbagicon(){
    let bagitemCount = document.querySelector(".bag_item_count");
    if(bagitems.length > 0){
        bagitemCount.innerText = bagitems.length;
        bagitemCount.style.visibility = "visible";
    }else{
        bagitemCount.style.visibility = "hidden";
    }
}

// Display product on home page -->
function displayProduct(){
    if(!productsContainer){
        return;
    }
// For each loop for individual item  
product.forEach((item) =>{
    innerHTML+= `<div class="product-container">
    <img src="${ item.product_img}" alt="product image"  class="product-img">
    <div class="company-name">${item.company_name}</div>
    <div class="product-name">${item.product_name}</div>
    <div class="price-container">
       <span class="price">Rs ${item.price}</span>
       <span class="old-price">Rs  ${item.old_price}</span>
       <span class="discount"> ${ item.discount}% off</span>
    </div>
    <button class="addtobag" onclick="addtoBag(${item.id})">Add to Bag</button>
    </div>`
    })
    
    productsContainer.innerHTML = innerHTML
}
 

