class Cliente {
    constructor(nombre, genero) {
    this.nombre = nombre;
    this.genero = genero.toLowerCase();
    }
}

let productos = [{
    producto: "pantalon",
    precio: 100000
    },
    {
    producto: "remeras",
    precio: 2000
    }
]

const calcularIva = a => a * 0.21;

//interaccion con el cliente

let cliente1 = new Cliente(prompt("Cual es tu nombre?"), prompt("Sos mujer u hombre?"));

if (cliente1.genero === "mujer") {
    console.log("Bienvenida " + cliente1.nombre + " " + "te mostraremos prendas de mujer");
} else {
    console.log("Bienvenido " + cliente1.nombre + " " + "te mostraremos prendas de hombre");
}

let comprar = prompt("¿Querés comprar remeras o pantalones?").toLowerCase();

if (comprar === "remeras" || comprar === "pantalon") {
    let cantidad = parseInt(prompt(`¿Cúantas ${comprar} querés?`));
    let subtotal = cantidad * productos.find((product) => product.producto === comprar).precio;
    let total = subtotal + calcularIva(subtotal);
    alert(total);
} else {
    alert("Elige solo entre remeras y pantalon");
}

let info = prompt("¿Querés mas info?").toLowerCase();

while(info === "si"){
    alert("Envianos un mensaje para descubrir mas sobre nuestra empresa");

    info = prompt("¿Necesitas algo mas?").toLowerCase();
}