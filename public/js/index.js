async function getAllProductos(){
    const getproductos = await axios('/product/getProducts') 
    const productos = getproductos.data;
    getLogInUser(productos)
}
async function getLogInUser(productos){
    const getLogIn = await axios('/user/logIn') 
    const getLogInData = getLogIn;
    console.log(getLogInData.data)
    const role = getLogInData.data.role;
    console.log(role);
    renderProducts(productos, role)
}

function renderProducts(productos, role){
    const root = document.querySelector(".grid");
    let html = "";
    const addLink = document.querySelector('.addNav');
    if(role === "admin"){
      addLink.style.display = 'inline'
      productos.forEach((prod) => {
        html += `   <div class="producto">
        <a href="producto.html" onclick='selectedProd("${prod.id}")'>
            <img class="producto__imagen" src="${prod.productImage}" alt="imagen camisa">
            <div class="producto__informacion">
                <p class="producto__nombre">${prod.productName}</p>
                <p class="producto__precio">Description: ${prod.productDescription}</p>
                <p class="producto__precio">$${prod.productPrice}</p>
                <p class="producto__precio">Stock: ${prod.stock}</p>
                <div class="producto_iconos">
                <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editProdId("${prod.id}")'><i class="edit_icon fas fa-edit"></i></a>
                <a href="" class="hola" onclick='deleteProdId("${prod.id}")'><i class="delete_icon fas fa-trash"></i></a>
                </div>
            </div>
        </a>
    </div> `;
      });
    }else{
      productos.forEach((prod) => {
        html += `   <div class="producto">
        <a href="producto.html" onclick='selectedProd("${prod.id}")'>
            <img class="producto__imagen" src="${prod.productImage}" alt="imagen camisa">
            <div class="producto__informacion">
                <p class="producto__nombre">${prod.productName}</p>
                <p class="producto__precio">Description: ${prod.productDescription}</p>
                <p class="producto__precio">$${prod.productPrice}</p>
                <p class="producto__precio">Stock: ${prod.stock}</p>
            </div>
        </a>
    </div> `;
      });
    }
    root.innerHTML = html;
  }  

  async function selectedProd(id){
    const postIdSelectedProd = axios.post(`/product/${id}`);
  }

function handleModal(e){
  e.preventDefault();
  const productName = e.target.elements.productModalName.value;
  const productDescription = e.target.elements.productModalDescription.value;
  const productImage = e.target.elements.productModalImage.value;
  const productPrice = e.target.elements.productModalPrice.value;
  const stock = e.target.elements.stockModal.value;
  const newProdData = {productName, productDescription, productImage, productPrice, stock}
  editProductData(newProdData)
}

async function editProductData(newProdData){
  const editId = axios.post(`/product/edit`, newProdData)
}

async function editProdId(id){
    const editId = axios.post(`/product/edit/${id}`)
}
async function deleteProdId(id){
    const deleteId = axios.post(`/product/delete/${id}`)
}

// <a class="navegacion__enlace" href="addProduct.html">Add Product</a>