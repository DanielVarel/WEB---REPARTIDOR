const email = document.getElementById("email");
const password = document.getElementById("password");
const boton = document.getElementById("boton");

const form = document.getElementById("form");
const parrafo = document.getElementById("warninigs");

form.addEventListener("submit", e=>{
    e.preventDefault();
    let encontrado = true;

    parrafo.innerHTML = "";

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(`http://localhost:3002/repartidores?email=${email}&password=${password}`, {
        method: 'get',
        headers: {"Content-Type": "application/json"},
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log(datos);
        if(datos.length !== 0){
            window.location.href = "/webRepartidor/index3.html";
            localStorage.setItem('usuarioRegistrados', JSON.stringify(datos));
        }else{
            parrafo.innerHTML = `The mail is not valid <br>
                                or the password is wrong`;
        }
    })
    .catch(error => {
            
    });     
});



  // for(let i=0; i<usuarioRegistrados.length; i++){
    //     if(email.value != usuarioRegistrados[i].email){
    //         encontrado = false;
    //     }
    //     else if(password.value != usuarioRegistrados[i].password){
    //         encontrado = false;
    //     }
    //     else if(password.value == usuarioRegistrados[i].password && email.value == usuarioRegistrados[i].email){
    //         encontrado = true;
    //         console.log("es correcto",encontrado)
    //         boton =  location.href = "index3.html";
    //     }
    // }