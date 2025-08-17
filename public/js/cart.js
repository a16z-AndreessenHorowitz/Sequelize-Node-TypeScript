// Lấy ra data in ra giao diện 
fetch("http://localhost:3000/cart/list-json",{
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
        <td>${item.total}đ</td>
        <td><button class="btn btn-sm btn-danger" btn-delete=${item.tourId}>Xóa</button></td>
      </tr>
      `
    })
    listTour.innerHTML=htmlsArray.join("")

    //Tính tổng đơn hàng 
    const elementTotalPrice=document.querySelector("[total-price]")
    const totalPrice=data.tour.reduce((sum,item)=>sum+item.total,0)
    elementTotalPrice.innerHTML=totalPrice.toLocaleString()
  })