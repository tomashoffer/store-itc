window.onload = setTimeout(async function getAllProductos(){

  const getproductos = await axios('/product/getProducts');
  const productos = getproductos.data;
  const getLogIn = await axios('/user/logIn');
  const role = getLogIn.data.role;
 renderProducts(productos, role);
}, 670)

async function renderProducts(productos, role){
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
              
                <p class="producto__precio">$${prod.productPrice}</p>
                <p class="producto__precio">Stock: ${prod.stock}</p>
                <div class="producto_iconos">
                <a  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editProdId("${prod.id}")'><i onclick='editProdId("${prod.id}")' class="edit_icon fas fa-edit"></i></a>
               <i onclick='deleteProdId("${prod.id}")' style="cursor:pointer" class="delete_icon fas fa-trash"></i>
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
    const postIdSelectedProd = await axios.post(`/product/${id}`);
  }
  
// MODAL ADD
  function handleAddProd(e){
    e.preventDefault();
    const productName = e.target.elements.productName.value;
    const productDescription = e.target.elements.productDescription.value;
    const productImage = e.target.elements.productImage.value;
    const productPrice = e.target.elements.productPrice.value;
    const stock = e.target.elements.stock.value;
    const newProd = {productName, productDescription, productImage, productPrice, stock}
    postProd(newProd);
}

async function postProd(newProd){
    const response = await axios.post('/product/addProducts', newProd);
    console.log(response);
}

// MODAL EDIT
function handleEditModal(e){
  e.preventDefault();
  const productName = e.target.elements.productModalName.value;
  const productDescription = e.target.elements.productModalDescription.value;
  const productImage = e.target.elements.productModalImage.value;
  const productPrice = e.target.elements.productModalPrice.value;
  const stock = e.target.elements.stockModal.value;
  const newProdData = {productName, productDescription, productImage, productPrice, stock};
  editProductData(newProdData);
}

async function editProductData(newProdData){
  const editId = await axios.post(`/product/edit`, newProdData);
  refresh()
}


async function editProdId(id){
    const editId = await axios.post(`/product/edit/${id}`);
}
async function deleteProdId(id){
    await axios.post(`/product/delete/${id}`)
    refresh()
    }

const btnSubmit = document.querySelector('.btnSubmit');
btnSubmit.addEventListener('click', async () => {
  window.location.reload();})

const btnSubmitAdd = document.querySelector('.btnSubmitAdd');
btnSubmitAdd.addEventListener('click', async() => {
  refresh();});

async function refresh() {
  window.location.reload();
}

// SEARCH BAR
  async function regExSurvey(searchBar){
    try {
      const getproductos = await axios('/product/getProducts');
      const productos = getproductos.data;
      const getLogIn = await axios('/user/logIn');
      const role = getLogIn.data.role;

      let newArray = [];
      for(let i = 0; i < productos.length; i++){
        const regExp = `^${searchBar}`;
        const searchTermReg= new RegExp(regExp, 'g');  
        newArray = productos.filter(elem => searchTermReg.test(elem.productName));
  
      }
      renderProducts(newArray, role);
    } catch (e) {
        console.error(e)
    }
  }
  
  const searchProduct = (ev) => {
      try {
          ev.preventDefault();
          const searchBar = ev.target.parentElement.elements.searchBar.value;
          regExSurvey(searchBar);
      } catch (e) {
          console.error(e)
      }
  }
  // EVENTLISTENERS
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', searchProduct);


  // LOGOUT
  async function logOut(){
    const logOut = await axios(`/user/logOut`);
   window.location.href = "http://localhost:3000/";
  }
  
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', logOut)


