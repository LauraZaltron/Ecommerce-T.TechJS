import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");
  const divResumen = document.getElementById("resumen-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";
  if (divResumen) divResumen.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito está vacío";

    contenedor.appendChild(mensaje);
    return;
  }

  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("product-card");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("product-image");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;
    imgDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const titulo = document.createElement("h4");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("span");
    precio.classList.add("price");
    precio.textContent = `$${producto.precio.toLocaleString("es-AR")}.00`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-add");
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });

    infoDiv.appendChild(titulo);
    infoDiv.appendChild(precio);
    infoDiv.appendChild(btnEliminar);

    tarjeta.appendChild(imgDiv);
    tarjeta.appendChild(infoDiv);

    contenedor.appendChild(tarjeta);
  });

  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  if (divResumen) {
    const totalP = document.createElement("p");
    totalP.classList.add("carrito-total");
    totalP.textContent = `Total: $${total.toLocaleString("es-AR")}.00`;
    divResumen.appendChild(totalP);
  }

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn-add");
  btnVaciar.classList.add("btn-vaciar");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
