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

    fetch(`https://backend-jahxr.vercel.app/dealers?email=${email}&password=${password}`, {
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
            console.log(error)
    });     
});
