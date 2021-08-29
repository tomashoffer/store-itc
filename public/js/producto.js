async function selectedProd(){
    const getProdSelected = await axios(`/product`);
    const data = getProdSelected.data;
    renderProducts(data);
  }

  function renderProducts(producto){
    const root = document.querySelector(".camisa");
    let html = "";
      html += `   <img class="camisa__imagen" src="${producto.productImage}" alt="Imagen del Producto">

      <div class="camisa__contenido">
          <h3>${producto.productName}</h3>
          <p>${producto.productDescription}</p>
          <h3>PRICE FOR EACH: $${producto.productPrice},-</h3>
          <h3>stock: ${producto.stock}</h3>

          <form class="formulario" onsubmit="handleProduct(event)">
              <select name="size" class="formulario__campo">
                  <option disabled selected>-- Select Size --</option>
                  <option value="XS" class="option_size">XS</option>
                  <option value="M" class="option_size">M</option>
                  <option value="L" class="option_size">L</option>
              </select>
              <input class="formulario__campo input_quantity" type="number" placeholder="Cantidad" min="1" name="quantity">
              <input class="formulario__submit" onclick="alertCart()" type="submit" value="Agregar al Carrito">
          </form>
      </div> `;
      root.innerHTML = html;
  }  
function handleProduct(e){
    e.preventDefault();
    const size = e.target.elements.size.value;
    const quantity = e.target.elements.quantity.value;
    const newOrder = {size, quantity};
    console.log(newOrder);
    postOrder(newOrder);
}

async function postOrder(newOrder) {
    const order = await axios.post('cart/postOrder', newOrder);
}

function alertCart(){
    swal("Good choice!!", "The item was added to the cart!", "success");
}

// lOGOUT
async function logOut(){
    const logOut = await axios(`/user/logOut`);
   window.location.href = "http://localhost:3000/";
  }
  
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', logOut)