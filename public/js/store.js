window.onload = setTimeout(async function getAllProductos(){

  const getproductos = await axios('/product/getProducts');
  const productos = getproductos.data;
  const getLogIn = await axios('/user/logIn');
  const role = getLogIn.data.role;
  const welcomeMessage = document.querySelector('#welcome');
  welcomeMessage.innerHTML = `Welcome, ${getLogIn.data.name}`
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
            <img class="producto__imagen" src="images/${prod.productImage}" alt="imagen camisa">
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
            <img class="producto__imagen" src="images/${prod.productImage}" alt="imagen camisa">
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
 async function handleAddProd(ev){
    ev.preventDefault();
    
    let { productName, productDescription, productPrice, stock } = ev.target.elements;
     productName = productName.value.toUpperCase();
     productDescription = productDescription.value;
     productPrice = productPrice.value;
     stock = stock.value;
    
    const headersForFile = {
      'Content-Type': 'multipart/form-data'
    };
    const fd= new FormData();
    const inputImg = document.getElementById("image");
    const imgFile = inputImg.files[0];
    fd.append('productName', productName);
    fd.append('productDescription', productDescription);
    fd.append('productPrice', productPrice);
    fd.append('stock', stock);
    fd.append('image', imgFile, `${imgFile.name}`);
    console.log(fd)
   
    if (!productName || !productDescription || !productPrice || !stock)
    throw new Error("Please complete all the fields");
    
    const addProduct = await axios.post('/product/addProducts', fd, { headers: headersForFile });
    
    if (addProduct) {
      swal("Good job!", "success");
      ev.target.reset();

  }


}


// MODAL EDIT
async function handleEditModal(ev){
  ev.preventDefault();

  let { productName, productDescription, productPrice, stock } = ev.target.elements;
  productName = productName.value.toUpperCase();
  productDescription = productDescription.value;
  productPrice = productPrice.value;
  stock = stock.value;

  const headersForFile = {
    'Content-Type': 'multipart/form-data'
  };
  const fd= new FormData();
  const inputImagen = document.getElementById("imageEdit");
  const imgFiles = inputImagen.files[0];
  fd.append('productName', productName);
  fd.append('productDescription', productDescription);
  fd.append('productPrice', productPrice);
  fd.append('stock', stock);
  fd.append('image', imgFiles, `${imgFiles.name}`);
  console.log(fd)

  if (!productName || !productDescription || !productPrice || !stock)
  throw new Error("Please complete all the fields");

    
  const editProduct = await axios.post('/product/edit', fd, { headers: headersForFile });
  
  if (editProduct) {
    swal("Good job!", "success");
    ev.target.reset();

    }
}

async function editProductData(newProdData){
  swal({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success",
    button: "Aww yiss!",
  }).then(async ()=> {
    const editId = await axios.post(`/product/edit`, newProdData);
    refresh()
  })
 
}


async function editProdId(id){
    const editId = await axios.post(`/product/edit/${id}`);
}
async function deleteProdId(id){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this product!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your product has been deleted!", {
        icon: "success",
      })
      .then(async () => {
        await axios.post(`/product/delete/${id}`)
        refresh()})
    } else {
      swal("Your product is safe!");
    }
  });
    
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

function readURL(input){
  if (input.files && input.files[0]) {
      let reader= new FileReader();
      const prevImg = document.querySelector('.previewImage');
      reader.onload = (e) => {
          try {
            prevImg.style.display = 'block';
            prevImg.setAttribute("src", `${e.target.result}`);
          } catch (error) {
              console.error(error);
          }
          return e.target.result
      }
      reader.readAsDataURL(input.files[0]);
  }
}

function readURLAdd(input){
  if (input.files && input.files[0]) {
      let reader= new FileReader();
      const prevImg = document.querySelector('.previewImageAdd');
      reader.onload = (e) => {
          try {
            prevImg.style.display = 'block';
            prevImg.setAttribute("src", `${e.target.result}`);
          } catch (error) {
              console.error(error);
          }
          return e.target.result
      }
      reader.readAsDataURL(input.files[0]);
  }
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
          regExSurvey(searchBar.toUpperCase());
          console.log(searchBar.toUpperCase());
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


