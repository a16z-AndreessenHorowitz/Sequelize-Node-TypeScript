// ảnh động slider của swiper 
var swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });

// ảnh động slider của swiper 



// cart 
const cart=localStorage.getItem("cart")
  // nếu chưa có giỏ hàng thì tạo giỏ hàng mới
if(!cart){
 localStorage.setItem("cart",JSON.stringify([]))//trong localStorgae luôn đưa chuỗi
}




// alert 
const alert=()=>{
  const alertAddCart=document.querySelector("[alert-add-cart-success]")
  if(alertAddCart){
    alertAddCart.classList.remove("alert-hidden")

    setTimeout(()=>{
    alertAddCart.classList.add("alert-hidden")
    },3000)
    const closeAlert=alertAddCart.querySelector("[close-alert]")
    closeAlert.addEventListener("click",()=>{
      alertAddCart.classList.add("alert-hidden")
    })
  }
}


//hiển thị số lượng sản phẩm vào mini-cart
const showMiniCart=()=>{
  const spanMiniCart=document.querySelector("[mini-cart]")
  if(spanMiniCart){
    const cart=JSON.parse(localStorage.getItem("cart"))
    const totalQuantity= cart.reduce((sum,item)=>sum+item.quantity,0)
    spanMiniCart.innerHTML=totalQuantity
  }
}
//gọi cho nó cập nhật lúc mới load wed
showMiniCart()



  // thêm tour vào giỏ hàng 
  const formAddToCart=document.querySelector("[form-add-to-cart]")
  if(formAddToCart){
    formAddToCart.addEventListener("submit",(e)=>{
      e.preventDefault()
      const quantity=parseInt(e.target.elements.quantity.value)
      const tourId=parseInt(formAddToCart.getAttribute("tour-id"))

      if(quantity>0 && tourId ){
        const cart=JSON.parse(localStorage.getItem("cart")) //trả vể mảng dạng json nên phải chuyển đổi

        //kiểm tra có tour dã dc đăng ký trước đó chưa để cộng vào còn ko có thì thêm mới
        const indexExistTour=cart.findIndex(item=>item.tourId==tourId)
        if(indexExistTour==-1){
          //thêm mới nếu ko có
          cart.push({
            tourId:tourId,
            quantity:quantity
          })
        }else{
          cart[indexExistTour].quantity=cart[indexExistTour].quantity+quantity
        }
        
        localStorage.setItem("cart",JSON.stringify(cart)) //update lại do cart mới push là mảng mới và phải chuyển đổi JSON

        //gọi đến alert
        alert()
        //update lại khi thêm vào giỏ hang
        showMiniCart()
      }
    })
  }
// end cart 

