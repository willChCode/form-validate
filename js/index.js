const expresiones = {
  nombre: /^([a-zA-Z]{3,30})([a-zA-Z])?$/,
  lastNombre: /^([a-zA-Z]{2,30})([a-zA-Z])?$/,
  email:
    /(^[a-zA-Z]+[a-zA-Z-_./0-9]+?[@])[a-zA-Z]{1,8}[.]([a-z]{2,5})([.]([a-z]{2,5}))?$/,
  password: /(^[a-zA-Z0-9\S]{5,80})$/,
};
const campos = {
  name: false,
  lastName: false,
  email: false,
  password: false,
};
const inputs = document.querySelectorAll("#formulario input");
const enviarF = document.getElementById("formulario");
const limpiarF = document.getElementById("limpiarF");

//validacion de campos input
const funcionV = (expresion, valor, byID, queryID, campo) => {
  if (expresion.test(valor.value)) {
    document.getElementById(byID).classList.add("form-correcto");
    document.getElementById(byID).classList.remove("form-incorrecto");
    document.querySelector(`${queryID} i`).classList.remove("fa-circle-xmark");
    document.querySelector(`${queryID} i`).classList.add("fa-circle-check");
    document.querySelector(`${queryID} p`).classList.remove("active");
    campos[campo] = true;
  } else {
    document.getElementById(byID).classList.add("form-incorrecto");
    document.getElementById(byID).classList.remove("form-correcto");
    document.querySelector(`${queryID} i`).classList.add("fa-circle-xmark");
    document.querySelector(`${queryID} i`).classList.remove("fa-circle-check");
    document.querySelector(`${queryID} p`).classList.add("active");
    campos[campo] = false;
  }
};
//ver contraseña y ocultar
const verPassword = (expresion, valor) => {
  if (expresion.test(valor.value)) {
    document.querySelector("#gPassword i").classList.add("fa-eye");
    let valor = true;
    let verP = document.querySelector("#verP");
    let inputPass = document.querySelector("#verPass"); //hdp
    verP.addEventListener("click", () => {
      if (valor == true) {
        inputPass.type = "text";
        valor = false;
      } else if (valor == false) {
        inputPass.type = "password";
        valor = true;
      }
    });
  }
};
//limpiar datos
const inputsL = document.querySelectorAll(".limpiar"); //sdasda
const iconoL = document.querySelectorAll("#formulario i");
const parrafoL = document.querySelectorAll("#formulario p");
const limpiarDatos = () => {
  inputsL.forEach((inputL) => {
    inputL.value = "";
  });
  iconoL.forEach((icono) => {
    icono.classList.remove("fa-circle-check");
    icono.classList.remove("fa-circle-xmark");
    icono.classList.remove("fa-eye");
    if (campos.name && campos.lastName && campos.email && campos.password) {
      return (
        (campos.name = false),
        (campos.lastName = false),
        (campos.email = false),
        (campos.password = false)
      );
    }
  });
  parrafoL.forEach((parrafo) => {
    parrafo.classList.remove("active");
  });
};
//funcion de validacion danto datos a los parametros
const validarF = (e) => {
  switch (e.target.name) {
    case "name":
      funcionV(expresiones.nombre, e.target, "gNombre", "#gNombre", "name");
      break;
    case "lastName":
      funcionV(
        expresiones.lastNombre,
        e.target,
        "gLastName",
        "#gLastName",
        "lastName"
      );
      break;
    case "email":
      funcionV(expresiones.email, e.target, "gEmail", "#gEmail", "email");
      break;
    case "password":
      funcionV(
        expresiones.password,
        e.target,
        "gPassword",
        "#gPassword",
        "password"
      );
      verPassword(expresiones.password, e.target);
      break;
  }
};
//eventos
inputs.forEach((input) => {
  input.addEventListener("keyup", validarF);
  input.addEventListener("blur", validarF);
});
enviarF.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.name && campos.lastName && campos.email && campos.password) {
    document.querySelector("#pButton").classList.add("pActive");
    enviarF.reset();
    setTimeout(() => {
      document.querySelector("#pButton").classList.remove("pActive");
    }, 5000);
    limpiarDatos();
  } else {
    document.getElementById("advertencia").classList.add("aActive");
    setTimeout(() => {
      document.getElementById("advertencia").classList.remove("aActive");
    }, 3000);
    e.preventDefault();
  }
});
limpiarF.addEventListener("click", () => {
  limpiarDatos();
});

// if (inputsL[0].value == "") {
//   alert("rellena los campos del nombre");
//   e.preventDefault();
// } else if (inputsL[1].value == "") {
//   alert("rellena los campos del lastName");
//   e.preventDefault();
// } else if (inputsL[2].value == "") {
//   alert("rellena los campos del email");
//   e.preventDefault();
// } else if (inputsL[3].value == "") {
//   alert("rellena los campos del password");
//   e.preventDefault();
// } else {
//   alert("datos enviados correctamente");
// }
