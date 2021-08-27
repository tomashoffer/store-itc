async function getUser(){
    const getUser = await axios('/user/logIn');
    const data = getUser.data.cart;
    renderTable(data);
}

function renderTable(data){
    const root = document.querySelector(".cart_row");
    let html = "";
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