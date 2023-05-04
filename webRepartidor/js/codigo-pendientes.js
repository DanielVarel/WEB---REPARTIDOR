var usuarioRegistrados = JSON.parse(localStorage.getItem('usuarioRegistrados'));

let pendiente = usuarioRegistrados[0].pendiente[0];

console.log(usuarioRegistrados[0]._id)

function mostrarPedio(pendiente) {

    let productos = "";
    
        for(let i=0; i<pendiente.envios.length;  i++){
          productos  += `<h4>${pendiente.envios[i].nombreProducto}<h4>
                        <p>${pendiente.envios[i].descripcion}</p>`;
      }
    

   
    document.getElementById("pedientes").innerHTML = `<h1>Delivery in process</h1>
                                                      <h3>Coordenadas: ${pendiente.direccion}<h3>
                                                      <div id="map" style="width: 300px; margin:auto;" class="imagen-mapa"></div>
                                                      <p>Distancia: ${pendiente.distancia}</p>
                                                      <p>${productos}</p>
                                                      <button class="entregado" onclick="pedidoEntregado()">Delivered</button>
                                                      `;
}

mostrarPedio(pendiente);
var coord2 = pendiente.mapa[0];

// para el mapa
function iniciarMap(ubiccacion2){
    var coord = {lat:14.104953 ,lng: -87.233900};
   

    let map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });

    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    var marker2 = new google.maps.Marker({
      position: coord2,
      map: map
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var request = {
      origin: { lat:14.104953 ,lng: -87.233900 },
      destination: coord2,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      }
    });

    directionsRenderer.setMap(map);
}

function pedidoEntregado(){

  const u = {
      _id: pendiente._id,
      empresa: pendiente.empresa,
      direccion: pendiente.direccion,
      distancia: pendiente.distancia,
      status: 2,
      mapa: pendiente.mapa[0],
      precio: pendiente.precio,
      envios: pendiente.envios,
      color: pendiente.color
  }

  let idOrden = pendiente._id;

  const a = {
    status: 2
  }

  fetch(`http://localhost:3002/ordenes/${idOrden}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},//j
        body: JSON.stringify(a)
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log('Se guardo correctamente', datos);
        fetch(`http://localhost:3002/repartidores/${usuarioRegistrados[0]._id}/cambiar`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(u)
        })
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log('Se guardo correctamente', datos);
            fetch(`http://localhost:3002/repartidores/${usuarioRegistrados[0]._id}/eliminar`, {
              method: 'PUT',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(u)
              })
              .then((respuesta) => respuesta.json())
              .then((datos) => {
                  console.log('Se elimino correctamente', datos);
                  recargarReparrtidor();
              })
              .catch(error => console.log(error));
             })
        .catch(error => console.log(error));   
    })
    .catch(error => console.log(error)); 
}


function recargarReparrtidor(){
  fetch(`http://localhost:3002/repartidores?email=${usuarioRegistrados[0].email}&password=${usuarioRegistrados[0].password}`, {
        method: 'get',
        headers: {"Content-Type": "application/json"},
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log(datos);
        localStorage.setItem('usuarioRegistrados', JSON.stringify(datos));
        location.reload(true);
    })
    .catch(error => {
            console.log(error)
    });  
}


// var pendiente = [
//     {
//         empresa: "Hugo",
//         direccion: "Tegucigalpa, Cerro Grande",
//         distancia: "20km",
//         mapa: "img/mapa.png",
//         color: "#8317CD",
//         precio: 400,
//         envios: [
//             {
//                 nombreProducto: "Producto 1",
//                 descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!"
//             },
//             {
//                 nombreProducto: "Producto 2",
//                 descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!"
//             }
//         ]
//     }
// ];

// toggleMenuElement.addEventListener('click', ()=>{
//     mainMenuElement.classList.toggle('mostrar-menu');
// });

// var pendiente = [];

// var localStorage = window.localStorage;

// if (localStorage.getItem('pendiente') == null) {
//     localStorage.setItem('pendiente', JSON.stringify(pendiente)); //de JSON a cadena
// }else{
//     pendiente = JSON.parse(localStorage.getItem('pendiente'));
// }



// function mostrarEntrega(){
//     pendientes.forEach(function (envio, i){
//         document.getElementById("lista").innerHTML += `<div class="contenedor abrir-modal" onclick="abrirModal();detallesEnvio(${i})"  style="background-color: ${envio.color}">
//                                                             <h2 class="empresa">${envio.empresa}</h2>
//                                                             <p class="direccion">Distancia: ${envio.distancia}</p>
//                                                             <p class="cantidad-envios">Cantidad de productos: ${envio.envios.length}</p>
//                                                         </div>`;
//                                                         i++;
//     });
//     localStorage.setItem('pendientes', JSON.stringify(pendientes))
// }

// function detallesEnvio(i) {
//     console.log("Numero de pedido", i);
//     let detallesActuales = pendientes[i];
//     document.getElementById("aja").innerHTML = `<h3>details...</h3>
//                                                                   <h3>${detallesActuales.empresa}</h3>
//                                                                   <p>${detallesActuales.distancia}</p>
//                                                                   <div id="closeModal" class="cerrar-modal">
//                                                                      <p>Cerrar</p>
//                                                                   </div>`;

// }

// mostrarEntrega();


// let openModal = document.querySelector(".abrir-modal");
// let cerrarModal = document.getElementById("closeModal");
// let modal = document.getElementById("modal");

// // Abrir modal
// function abrirModal(){  
//     modal.style.visibility = "visible";
// }

// // Cerar en ventana
// modal.onclick = function(){
//     modal.style.visibility = "hidden";
// }


