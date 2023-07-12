import getAllStarWars from "./star-wars.js";
import clickStarWars from "./click-star-wars.js";
import getAllConsolas from "./consolas.js";
import getAllDiversos from "./diversos.js";
const d = document;
const $form = d.getElementById("form");
const $cerrarSesion = d.getElementById("cerrar__sesion");

d.addEventListener("DOMContentLoaded", (e) => {
  getAllStarWars();
  clickStarWars();
  getAllConsolas();
  getAllDiversos();
});

$cerrarSesion.addEventListener("click", (e) => {
  alert("Hasta pronto");
  localStorage.removeItem("usuario-abierto");
  window.location.href = "inicio-sesion.html";
});

const sesionIniciada = localStorage.getItem("usuario-abierto") || false;

if (!sesionIniciada) {
  window.location.href = "inicio-sesion.html";
}

d.addEventListener("click", (e) => {
  if (e.target.matches(".pencil__icon")) {
    $form.nombre.value = e.target.dataset.nombre;
    $form.categorias.value = e.target.dataset.categorias;
    $form.precio.value = e.target.dataset.price;
    $form.imgSrc.value = e.target.dataset.imgSrc;
    $form.id.value = e.target.dataset.id;
    $form.description.value = e.target.parentElement
      .querySelector(".card__detail")
      .querySelector(".card__description-hiden").textContent;
  }
  if (e.target.matches(".trash__icon")) {
    let isDelete = confirm("Realmente desea eliminar este item?");

    if (isDelete) {
      try {
        let options = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
        };
        let res = fetch(
          `https://products-database.onrender.com/starwars/${e.target.dataset.id}`,
          options
        );
        let json = res.json();
        if (!res.ok)
          throw {
            status: res.status,
            statusText: res.statusText,
          };
        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrio un errror ASYNC";
        $table.innerHTML = `<p> style="color: red; font-family: sans-serif;"${err.status}: ${message}</p>`;
      }
    }
  }
});

/* <template id="card__template">
      <div class="card">
        <i class="fa-solid fa-trash card__icon trash__icon"></i>
        <i class="fa-solid fa-pencil card__icon pencil__icon"></i>
        <img class="card__img" src="" alt="" />
        <div class="card__detail">
          <p class="card__title"></p>
          <p class="card__price"></p>
          <p class="card__description-hiden"></p>
        </div>
      </div>
    </template> */
