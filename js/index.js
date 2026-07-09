import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarCarousel = () => {
  const contenedor = document.getElementById("carousel-contenedor");

  fetch("./data/libros.json")
    .then((response) => response.json())
    .then((data) => {
      const destacados = data.slice(0, 4);

      destacados.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("product-card");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("product-image");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;
        imgDiv.appendChild(img);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("product-info");

        const titulo = document.createElement("h4");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("span");
        precio.classList.add("price");
        precio.textContent = `$${producto.precio.toLocaleString("es-AR")}.00`;

        const boton = document.createElement("button");
        boton.classList.add("btn-add");
        boton.textContent = "Agregar al carrito";
        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        infoDiv.appendChild(titulo);
        infoDiv.appendChild(precio);
        infoDiv.appendChild(boton);

        tarjeta.appendChild(imgDiv);
        tarjeta.appendChild(infoDiv);

        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => console.log(error));
};

const configurarCarousel = () => {
  const container = document.getElementById("carouselContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn && container) {
    prevBtn.addEventListener("click", () => {
      container.scrollBy({ left: -300, behavior: "smooth" });
    });
  }
  if (nextBtn && container) {
    nextBtn.addEventListener("click", () => {
      container.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarCarousel();
  configurarCarousel();
});
