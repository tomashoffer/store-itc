async function selectedProd(){
    const getProdSelected = await axios(`/product`);
    
    renderProducts(getProdSelected.data)
  }

  function renderProducts(producto){
    const root = document.querySelector(".camisa");
    let html = "";
      html += `   <img class="camisa__imagen" src="${producto.productImage}" alt="Imagen del Producto">

      <div class="camisa__contenido">
          <h3>${producto.productName}</h3>
          <p>${producto.productDescription}</p>

          <form class="formulario">
              <select class="formulario__campo">
                  <option disabled selected>-- Seleccionar Talla --</option>
                  <option>Chica</option>
                  <option>Mediana</option>
                  <option>Grande</option>
              </select>
              <input class="formulario__campo" type="number" placeholder="Cantidad" min="1">
              <input class="formulario__submit" type="submit" value="Agregar al Carrito">
          </form>
      </div> `;
      root.innerHTML = html;
  }  
