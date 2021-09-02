async function renderTable(){
    const getCurrentUser = await axios('/user/logIn');
    const data = getCurrentUser.data.cart;
    const role = getCurrentUser.data.role;
    const getAllUsers = await axios('/user/allUsers');
    const dataAllUsers = getAllUsers.data;

    const welcomeMessage = document.querySelector('#welcome');
    welcomeMessage.innerHTML = `Welcome, ${getCurrentUser.data.name}`

    const root = document.querySelector(".cart_row");
    let html = "";
    if(role === "admin"){
        dataAllUsers.forEach((user) =>{
            const allCarts = user.cart;
            allCarts.forEach((cart) =>{
                html += `<tr>
            <th scope="row"><img style="height: 6rem; width: 6rem;" src="images/${cart.productImage}" alt=""></th>
            <td>${cart.productName}</td>
            <td>${cart.size}</td>
            <td>${cart.quantity}</td>
            <td>${cart.productPrice}</td>
            <td>${cart.productPrice * cart.quantity}</td>
            <td>-</td>
            </tr>`
            totalToPay(cart.productPrice * cart.quantity)
            })
           
        })
      }else{
        data.forEach((prod)=>{
            html += `<tr>
            <th scope="row"><img style="height: 6rem; width: 6rem;" src="images/${cart.productImage}" alt=""></th>
            <td>${prod.productName}</td>
            <td>${prod.size}</td>
            <td>${prod.quantity}</td>
            <td>${prod.productPrice}</td>
            <td>${prod.productPrice * prod.quantity}</td>
            <td><a class="hola" onclick='deleteSell("${prod.id}")'><i class="delete_icon fas fa-trash"></i></a></td>
            </tr>`
            console.log(prod.id)
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
        htmlPaypal = `<button style="padding: 1rem; font-size: 2.5rem;" type="button" onclick='payment(${currentTotal})' class="btn btn-warning btn_paypal">PAY WITH PAYPAL</button>`;
    }
    paypal.innerHTML = htmlPaypal;
}

async function payment(currentTotal){
    try{

    axios.post(`/paypal/create-payment/${currentTotal}`).then(data=>{ redirectToPayment(data.data)})
    descreaseStock()
    }catch(e){
        console.log(e)
    }
}

async function descreaseStock(){
    // DECREASE STOCK
    const getCurrentUser = await axios.get('/user/logIn');
    const data = getCurrentUser.data.cart;
    data.forEach(async (prod)=>{
        prod.stock = prod.stock - prod.quantity;
        const decreaseStock =  await axios.post('/product/updateStock', prod)
    })
}

async function redirectToPayment(link){
    window.location.href = link;
}

async function deleteSell(id){
    const deleteId = await axios.post(`/cart/deleteOrder/${id}`);
    window.location.href = "http://localhost:3000/cart.html";
}


// lOGOUT
async function logOut(){
    const logOut = await axios(`/user/logOut`);
   window.location.href = "http://localhost:3000/";
  }
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', logOut);











