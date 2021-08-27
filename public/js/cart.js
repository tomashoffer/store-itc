// async function getUser(){
//     const getUser = await axios('/user/logIn');
//     const data = getUser.data.cart;
//     const role = getUser.data.role;
//     renderTable(data);
// }

// function renderTable(data){
//     const root = document.querySelector(".cart_row");
//     let html = "";
//     data.forEach((prod)=>{
//         html += `<tr>
//         <th scope="row"><img style="height: 6rem; width: 6rem;" src="${prod.productImage}" alt=""></th>
//         <td>${prod.productName}</td>
//         <td>${prod.size}</td>
//         <td>${prod.quantity}</td>
//         <td>${prod.productPrice}</td>
//         <td>${prod.productPrice * prod.quantity}</td>
//         </tr>`
//         totalToPay(prod.productPrice * prod.quantity)
//     });
//     root.innerHTML = html;
// }

async function renderTable(){
    const getCurrentUser = await axios('/user/logIn');
    const data = getCurrentUser.data.cart;
    const role = getCurrentUser.data.role;
    console.log(role)

    const getAllUsers = await axios('/user/allUsers');
    const dataAllUsers = getAllUsers.data;
    // console.log(dataAllUsers)

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
function totalToPay(totalToPay){
    const total = document.querySelector(".total");
    currentTotal = currentTotal + totalToPay;
    let html = `<p>${currentTotal}</p>`;
    total.innerHTML = html;
    
    const paypal = document.querySelector(".paypal");
    let htmlPaypal = `<button style="padding: 1rem; font-size: 2.5rem;" type="button" class="btn btn-warning">PAY WITH PAYPAL</button>`;
    paypal.innerHTML = htmlPaypal;
}

// lOGOUT
async function logOut(){
    const logOut = await axios(`/user/logOut`);
   window.location.href = "http://localhost:3000/";
  }
  
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', logOut)











