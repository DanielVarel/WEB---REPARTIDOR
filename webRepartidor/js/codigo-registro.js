const nombre = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phoneNumber = document.getElementById("phone-number");
const enviado = document.getElementById("enviado");
var usuarioRegistrados = [];

var localStorage = window.localStorage;

const form = document.getElementById("form");
const parrafo = document.getElementById("warninigs");

form.addEventListener("submit", e=>{
    e.preventDefault();
    let warninigs  = "";
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let entrar = false;

    parrafo.innerHTML = "";

    for(let i=0; i<usuarioRegistrados.length; i++){
        if(nombre.value == usuarioRegistrados[i].name){
            warninigs  += `The name is invalid <br>`;
            entrar = true;
        }
        if(email.value == usuarioRegistrados[i].email){
            warninigs  += `The mail is not valid <br>`;
            entrar = true;
        }
        if(phoneNumber.value == usuarioRegistrados[i].phoneNumber){
            warninigs  += `The phone number is not valid <br>`;
            entrar = true;
        }
    }

    
    if(nombre.value.length < 6){
        warninigs  += `The name is invalid <br>`;
        entrar = true;
    }

    if(!regexEmail.test(email.value)){
        warninigs  += `The mail is not valid <br>`;
        entrar = true;
    }

    if(password.value.length < 8){
        warninigs  += `The password is not valid <br>`;
        entrar = true;
    }

    if(phoneNumber.value.length < 8){
        warninigs  += `The phone number is not valid <br>`;
        entrar = true;
    }

    if(entrar==true){
        parrafo.innerHTML = warninigs;
    }else{

        let repartidor = {
            email: email.value,
            name:  nombre.value,
            password: password.value,
            phoneNumber: phoneNumber.value
        }


        fetch('http://localhost:3002/repartidores', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(repartidor)
        })
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log(datos)
            enviado.innerHTML = `<p>Enviado</p>`;
            enviado.style.display = "block";    
        })
        .catch(error =>{
            console.log('error al guardar'); 
            enviado.innerHTML = `<p>Error al enviar</p><br>
                                <p>Intente con otro correo</p>`;
            enviado.style.display = "block";
            enviado.style.background = "#FA0000";
        })
        
    }

   
});










