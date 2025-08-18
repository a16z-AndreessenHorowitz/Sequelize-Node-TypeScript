// đây là đang cấu hình cho các máy cùng LAN truy cập nội bộ
const host = window.location.hostname;
const port = 3000;

//Lấy data in ra giao diện
const drawListTour=()=>{

  fetch(`http://${host}:${port}/cart/list-json`,{
  method:"POST",
  headers: {
    "Content-Type":"application/json"
  },
  body:localStorage.getItem("cart")
})
  .then(res=>res.json())
  .then(data=>{
    //vẽ các thẻ tr inner vào html
    // console.log(data)
    const listTour=document.querySelector("[list-tour]")
    const htmlsArray=data.tour.map((item,index)=>{
      return `
      <tr>
        <td>${index+1}</td>
        <td><img src=${item.image} alt=${item.info.title} width="80px" /></td>
        <td><a href="/tours/detail/${item.info.slug}">${item.info.title}</a></td>
        <td>${item["price-special"].toLocaleString()}đ</td>
        <td><input type="number" name="quantity" value=${item.quantity} min="1" item-id=${item.tourId} style="width: 60px;" /></td>
        <td>${item.total.toLocaleString()}đ</td>
        <td><button class="btn btn-sm btn-danger" btn-delete=${item.tourId}>Xóa</button></td>
      </tr>
      `
    })
    listTour.innerHTML=htmlsArray.join("")

    //Tính tổng đơn hàng 
    const elementTotalPrice=document.querySelector("[total-price]")
    const totalPrice=data.tour.reduce((sum,item)=>sum+item.total,0)
    elementTotalPrice.innerHTML=totalPrice.toLocaleString()

    //vì khi vẽ ra giao diện thì mới có cái để mà xoá sản phẩm 
    deleteItemInCart()

    //update lại quantity, giá tiền
    updateQuantityInCart()
  })

}

//Xoá sản phẩm trong giỏ hàng
const deleteItemInCart=()=>{
  const listBtnDelete=document.querySelectorAll("[btn-delete]")
  listBtnDelete.forEach(button=>{
    button.addEventListener("click",()=>{
      const tourId=button.getAttribute("btn-delete")
           // console.log(tourId)

      //lấy ra cart
      const cart=JSON.parse(localStorage.getItem("cart"))
            // console.log(cart)

      //tạo mảng mới loại bỏ tourId đó hoặc là xoá theo findIndex và dùng splice
      const newCart=cart.filter(item=>item.tourId != tourId)
            // console.log(newCart)  
      
      //lưu vào localStorage
      localStorage.setItem("cart",JSON.stringify(newCart))

      //gọi để nó vẽ lại 
      drawListTour()
    })
  })
}
//Hết xoá sản phẩm

// update sản phẩm 
const updateQuantityInCart=()=>{
  const listInputUpdate=document.querySelectorAll("[list-tour] input[item-id]")
  listInputUpdate.forEach(input=>{
    input.addEventListener("change",()=>{
      const tourId=input.getAttribute("item-id")
      const quantity=input.value
      // console.log(tourId)
      // console.log(quantity)

      const cart=JSON.parse(localStorage.getItem("cart"))
      //hàm find không tạo ra bản sao của object trong mảng, mà nó trả về tham chiếu (reference) đến object đó trong cart.
      // thì thực chất bạn đang thay đổi trực tiếp object nằm trong mảng cart, vì tourUpdate và phần tử trong cart cùng trỏ đến một vùng nhớ.
      const tourUpdate=cart.find(item=>item.tourId==tourId)
      tourUpdate.quantity=parseInt(quantity)
      
        // console.log(cart)
      localStorage.setItem("cart",JSON.stringify(cart))

      drawListTour()
    })
  })
}
//end update sản phẩm 

//gọi hàm để nó vẽ khi mới load trang khi mới lần đầu vào
drawListTour()
