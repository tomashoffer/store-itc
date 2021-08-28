async function renderTable(){
    const getCurrentUser = await axios('/user/logIn');
    const data = getCurrentUser.data.cart;
    const role = getCurrentUser.data.role;
    console.log(role)

    const getAllUsers = await axios('/user/allUsers');
    const dataAllUsers = getAllUsers.data;

    const root = document.querySelector(".cart_row");
    let html = "";
    if(role === "admin"){
        dataAllUsers.forEach((user) =>{
            const allCarts = user.cart;
            allCarts.forEach((cart) =>{
                html += `<tr>
            <th scope="row"><img style="height: 6rem; width: 6rem;" src="${cart.productImage}" alt=""></th>
            <td>${cart.productName}</td>
            <td>${cart.size}</td>
            <td>${cart.quantity}</td>
            <td>${cart.productPrice}</td>
            <td>${cart.productPrice * cart.quantity}</td>
            </tr>`
            totalToPay(cart.productPrice * cart.quantity)
            })
           
        })
      }else{
        data.forEach((prod)=>{
            html += `<tr>
            <th scope="row"><img style="height: 6rem; width: 6rem;" src="${prod.productImage}" alt=""></th>
            <td>${prod.productName}</td>
            <td>${prod.size}</td>
            <td>${prod.quantity}</td>
            <td>${prod.productPrice}</td>
            <td>${prod.productPrice * prod.quantity}</td>
            </tr>`
            totalToPay(prod.productPrice * prod.quantity)
        });
      }
    root.innerHTML = html;
}

let currentTotal = 0;
async function totalToPay(totalToPay){
    const total = document.querySelector(".total");
    currentTotal = currentTotal + totalToPay;
    let html = `<p>${currentTotal}</p>`;
    total.innerHTML = html;
    

    const getCurrentUser = await axios('/user/logIn');
    const role = getCurrentUser.data.role;
    const paypal = document.querySelector(".paypal");
    if(role === "admin"){
        htmlPaypal = ``
    }else{
        htmlPaypal = `<button style="padding: 1rem; font-size: 2.5rem;" type="button" onclick='handleStock()' class="btn btn-warning btn_paypal">PAY WITH PAYPAL</button>`;
    }
    paypal.innerHTML = htmlPaypal;
}

async function handleStock(){
    const getCurrentUser = await axios('/user/logIn');
    const data = getCurrentUser.data.cart;
    data.forEach((prod)=>{
        console.log(prod.stock)
        console.log(prod.quantity)
        prod.stock = prod.stock - prod.quantity;
        const decreaseStock = axios.post('/product/updateStock', prod)
    })
}

// lOGOUT
async function logOut(){
    const logOut = await axios(`/user/logOut`);
   window.location.href = "http://localhost:3000/";
  }
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', logOut);











