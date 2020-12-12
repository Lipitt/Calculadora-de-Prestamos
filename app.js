//guardo en variables los elementos html que seran modificados
const formCalculo = document.querySelector("#prestamo-form");
const divResultado = document.querySelector("#resultados");
const loadingGif = document.querySelector("#loading");

//variables de la interfaz
const valorPrestamo = document.getElementById("prestamo");
const valorInteres = document.getElementById("interes");
const valorAños = document.getElementById("año-devol");
const valorPagoMensual = document.getElementById("pago-mensual");
const valorMontoAPagar = document.getElementById("monto-a-pagar");
const valorInteresTotal = document.getElementById("interes-total");

//seteo el event listener
formCalculo.addEventListener("submit", calcularPrestamo);

function calcularPrestamo(e) {
  e.preventDefault();
  //oculto el div resultado nuevamente en caso de que se este realizando un nuevo calculo
  divResultado.style.display = "none";
  //declado y asigno a variables los valores de los inputs pasados a valores con decimales usando parsefloat
  let prestamo = parseFloat(valorPrestamo.value);
  let interes = parseFloat(valorInteres.value);
  let meses = parseFloat(valorAños.value * 12);
  //hago el calculo de interes y lo divido por mes
  let prestamoConInteres = prestamo + (prestamo * interes) / 100;
  let pagoMensual = parseFloat(prestamoConInteres / meses);

  if (isFinite(pagoMensual)) {
    //muestro el gif de carga
    loadingGif.style.display = "block";
    //asigno los valores a los inputs de resultado usando toFixed para fijar la cantidad de decimales a 2
    valorPagoMensual.value = pagoMensual.toFixed(2);
    valorMontoAPagar.value = parseFloat(pagoMensual * meses).toFixed(2);
    valorInteresTotal.value = (prestamoConInteres - prestamo).toFixed(2);
    mostrarResultado();
  } else {
    mostrarError();
  }
}
function mostrarResultado() {
  //muestro el gif de carga durante un segundo, luego lo oculto nuevamente y muestro el resultado
  setTimeout(function() {
    loadingGif.style.display = "none";
    divResultado.style.display = "block";
  }, 1000);
}

function mostrarError() {
  //creo un div con un mensaje de error
  const tarjeta = document.getElementById("main-card");
  const divError = document.createElement("div");
  divError.className = "alert alert-danger";
  divError.innerText = "Revisa los numeros ingresados";
  //agrego el div creado como primer elemento del form principal usando prepend
  tarjeta.prepend(divError);
  //hago que el mensaje de error desaparezca despues de 3 segundos
  setTimeout(function() {
    divError.remove();
  }, 3000);
}
