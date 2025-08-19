let bagItemobj; 
let Convenience_fees =0;
onload();
function onload(){
    loadBagitems();
    showbagitems();
    showBagtotal();
}

//searching for product -->
function loadBagitems(){
    //map function
    bagItemobj = bagitems.map(itemid => {
        for(let i = 0; i<product.length; i++){

            if(itemid == product[i].id){
                return  product[i];
            }
        }
    })
   console.log(bagItemobj);
}

function showbagitems(){
    let boxElement = document.querySelector(".bag-items-box");
    let innerHTML = '';
    bagItemobj.forEach(bagitem => {
        innerHTML += createproducthtml(bagitem)
    });
    boxElement.innerHTML =  innerHTML;
}

function removeitem(itemid){
   bagitems = bagitems.filter(bagitemId => bagitemId != itemid);
   localStorage.setItem('bagitems', JSON.stringify(bagitems));
    loadBagitems();
    showbagitems();
    showbagicon();
    showBagtotal();
}

function createproducthtml(item){
      return `<div class="bag-item-box">
                    <div class="left-item-box">
                        <img src="${item.product_img}" alt="bagitemimg" class="bag-product-img">

                    </div>
                    <div class="right-item-box">
                        <div class="company-name">${item.company_name}</div>
                        <div class="item-name">${item.product_name}</div>
                        <!-- total prices -->
                         <div class="price-box">
                            <span class="new-price">${item.price}</span>
                            <span class="old-price">${item.old_price}</span>
                            <span class="discount-per">${item.discount}% OFF</span>
                            <!-- return period -->
                             <div class="return-time-box">
                                <span class="return-days">${item.return_period}days</span> return available
                             </div>
                             <!-- delivery info -->
                              <div class="delivery-info">
                                 delivery by <span class="delivery-date">${item.delivery_date}</span>
                              </div>
                              
                              <div class="remove-from-cart" onclick="removeitem(${item.id})">x</div>
                         </div>
                    </div>
                </div>`
 
}

function showBagtotal(){
    let Bagtotal = document.querySelector(".bag-summary");
    let totalItems =bagItemobj.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    let finalTotal = 0;

    bagItemobj.forEach(bagitem =>{
        totalMRP += bagitem.old_price;
        totalDiscount += bagitem.old_price-bagitem.price;
    });
    finalTotal = totalMRP - totalDiscount + Convenience_fees;

     Bagtotal.innerHTML = `
     <div class="bag-info-box">
                    <div class="price-header">price details ${totalItems} items</div>
                    <div class="product-price">
                        <span class="product-price-tag">MRP</span>
                        <span class="product-real-value">Rs ${totalMRP}</span>
                    </div>
                    <div class="product-price">
                        <span class="product-price-tag" id="disss">discount on MRP</span>
                         <span class="discount-value">Rs ${totalDiscount}</span>
                    </div>
                    
                    <div class="product-price">
                        <span class="product-price-tag">Convenience fee</span>
                        <span class="Convenience-value"> Rs ${Convenience_fees}</span>
                    </div>
                    <hr>
                    <div class="price-footer">
                        <span class="product-price-tag" class="total-amount">total amount</span>
                        <span class="total-value">Rs ${finalTotal} </span>
                    </div>
                </div>
                <button class="place-order">
                    <div class="your-order">place order</div>

                </button> `
}