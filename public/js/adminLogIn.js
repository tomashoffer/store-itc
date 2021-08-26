function handleAdminLogin(){
    const emailDiv = document.querySelector('.form__email__admin');
    const passDiv = document.querySelector('.form__password__admin');

    const email = emailDiv.children[0].value;
    const password = passDiv.children[0].value;;
    console.log(email, password);
    const admin = {email, password}
    logInAdministrador(admin)
}

async function logInAdministrador(newUser){
    try{
        const response = await axios.post('/user/adminLogIn', newUser);
        console.log(response)
    }catch(error){
        console.log(error.response);
    }
}

const btnSub = document.querySelector('.btn-submit-admin');
btnSub.addEventListener('click', handleAdminLogin);