let btnAgregar = document.getElementById("btnAgregar");
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array();

function validarCantidad() {
    if (txtNumber.value.length <= 0) {
        return false;
    }
    if (isNaN(txtNumber.value)) {
        return false;
    }
    if (Number(txtNumber.value) <= 0) {
        return false;
    }
    return true;
}

function getPrecio() {
    return Math.round(Math.random() * 10000) / 100;
}

btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();
    let isValid = true;

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    if (txtName.value.length < 3) {
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML +=
            "<strong>El Nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (!validarCantidad()) {
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML +=
            "<br><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        cont += 1;
        let precio = getPrecio();
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;
        let elemento = { 
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio" : precio
        };
        datos.push(elemento);

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("contadorProductos", cont);
        localStorage.setItem("totalEnProductos", totalEnProductos);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
});

// Restaurar datos del localStorage al cargar la página
window.addEventListener("load", function(event) {
    if (localStorage.getItem("costoTotal") != null) {
        costoTotal = Number(localStorage.getItem("costoTotal"));
        cont = Number(localStorage.getItem("contadorProductos"));
        totalEnProductos = Number(localStorage.getItem("totalEnProductos"));

        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalEnProductos;
    }
});

// Definir y manejar el botón Clear
let btnClear = document.getElementById("btnClear");
btnClear.addEventListener("click", function(event) {
    event.preventDefault();
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
});
