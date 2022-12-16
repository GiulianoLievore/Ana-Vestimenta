

// Acceso a los campos de usuario
const nomUsuario = document.querySelector("#nombreUsuario");
const localUsuario = localStorage.getItem("Usuario");
const submit = document.querySelector("#submit");
const usuario = document.querySelector("#usuario");

// Interaccion con el usuario donde se le pide ingresar su nombre y posteriormente guardarlo
localUsuario === null ? 
Swal.fire(
    'Recuerda poner tu nombre de usuario',
    '',
    'info'
)
: 
nomUsuario.innerText = "Bienvenido " + localUsuario + " a la página oficial de ventas de Ana vestimenta";
nomUsuario.classList = "text-center";

submit.addEventListener("click", () =>{
    const value = usuario.value;

    value === "" ? 
    (Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Escribiste un caracter vacio'
    }), submit.value = "Reintenta escribir tu nombre")
    :
    Swal.fire({
        title: '¿Estas seguro de que quieres guardar este nombre?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload(); 
        }
      })  

    localStorage.setItem("Usuario", value);
})

// Productos hechos en objetos
let productos = [{
    producto: "pantalon",
    precio: 100000
    },
    {
    producto: "remeras",
    precio: 2000
    },
    {
    producto: "zapatilla",
    precio: 2500
    },
    {
    producto: "Sombrero",
    precio: 1500
    },
    {
    producto: "Pollera",
    precio: 3000
    },
    {
    producto: "Jean azul",
    precio: 2000
    },
    {
    producto: "Camisa leñadora",
    precio: 4000
    },
    {
    producto: "Buzo Rojo",
    precio: 5000
    },     
]

// const calcularIva = a => a * 0.21;

const productoInfo = document.querySelector('#productoInfo');
const precios = [];

// Creacion y renderizacion de Producto
for (const prenda of productos){
    const {producto, precio} = prenda;

    const div = document.createElement('div');
    div.className = 'card m-3'
    div.style = 'width: 18rem;'
    div.innerHTML = `
                <div class="card-body" >
                  <h5 class="card-title text-capitalize text-center text-danger">${producto}</h5>
                  <p class="card-text fs-5">Prendas especialmente hecha para vos con un unico precio de tan solo $${precio}.</p>
                </div>
    `

    precios.push(precio);

    productoInfo.append(div);
}

// Renderizacion de parrafos que muestran el producto mas caro y mas barato
const productoMaxMin = document.querySelector('#productoMaxMin');

const parrafo = document.createElement("p");
parrafo.className = "text-center fs-4 border border-secondary";
parrafo.innerText = "El producto mas caro de nuestras prendas tiene un valor de: $" + Math.max(...precios); 

productoMaxMin.append(parrafo);

const parrafoDos = document.createElement("p");
parrafoDos.className = "text-center fs-4 border border-secondary";
parrafoDos.innerText = "El producto mas barato de nuestras prendas tiene un valor de: $" + Math.min(...precios); 

productoMaxMin.append(parrafoDos);

// Api con fetch
const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');

// Fetch Exchange Rate api
function calculate(){
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[moneda_two];
       
       cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);
    } );
}

//Event listeners
monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

taza.addEventListener('click', () =>{
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    calculate();
} );

calculate();