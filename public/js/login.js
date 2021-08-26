function handleLogin(){
    const emailDiv = document.querySelector('.form__email');
    const passDiv = document.querySelector('.form__password');

    const email = emailDiv.children[0].value;
    const password = passDiv.children[0].value;;
    console.log(email, password);
    const userLogIn = {email, password};
    logIn(userLogIn)

}



const btnSub = document.querySelector('.btn-submit');
btnSub.addEventListener('click', handleLogin);

async function logIn(userLogIn){
    try{
        const response = await axios.post('/user/logIn', userLogIn);
       window.location.href = "/index.html";
    }catch(error){
        console.log(error.response);
    }
}