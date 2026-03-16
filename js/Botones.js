const botones = document.querySelectorAll(".btn-tabla");
const modal = document.getElementById("modalTabla");
const imagen = document.getElementById("imagenTabla");
const cerrar = document.getElementById("cerrarModal");

// abrir modal
botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const rutaImagen = boton.getAttribute("data-img");
    imagen.src = rutaImagen;
    modal.style.display = "flex";
  });
});

// cerrar modal
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
  imagen.src = "";
});

// cerrar al hacer click fuera
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    imagen.src = "";
  }
});