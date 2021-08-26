function handleProd(e){
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