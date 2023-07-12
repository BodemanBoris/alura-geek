const d = document;
const $fragment = d.createDocumentFragment();
const $fragmentMain = d.createDocumentFragment();
//const $templateMain = d.getElementById("main__template").content;
const $templateProduct = d.getElementById("card__template").content;
const $main = d.querySelector(".main__product");
const $insertProduct = d.querySelector(".product__insert");

const fillInfo = (e) => {
  let imagenTarget =
    e.target.parentElement.parentElement.querySelector(".img__product").dataset
      .link;
  let titleTarget =
    e.target.parentElement.parentElement.querySelector(
      ".item__name"
    ).textContent;
  let priceTarget =
    e.target.parentElement.parentElement.querySelector(
      ".item__price"
    ).textContent;
  let descriptionTarget =
    e.target.parentElement.parentElement.querySelector(".input__hiden").value;

  $main.querySelector(".main__product-imagen").src = imagenTarget;
  $main.querySelector(".main__product-title").textContent = titleTarget;
  $main.querySelector(".main__product-price").textContent = priceTarget;
  $main.querySelector(".main__product-description").textContent =
    descriptionTarget;
};

const ocultarMensaje = () => {
  const $mensaje = d.querySelector(".alert__time");
  setTimeout(() => {
    $mensaje.classList.add("not__show");
  }, 3000);
};

const generateProducts = () => {
  fetch("https://products-database.onrender.com/diversos")
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((json) => {
      console.log(json);
      json.forEach((el) => {
        $main.querySelector(".main__product-imagen").src = el.imgSrc;
        $main.querySelector(".main__product-title").textContent = el.nombre;
        $main.querySelector(".main__product-price").textContent = el.price;
        $main.querySelector(".main__product-description").textContent =
          el.description;
      });

      json.forEach((el) => {
        $templateProduct.querySelector(".img__product").src = el.imgSrc;
        $templateProduct.querySelector(".img__product").dataset.link =
          el.imgSrc;
        $templateProduct.querySelector(".item__name").innerText = el.nombre;
        $templateProduct.querySelector(".item__price").innerText = el.price;
        $templateProduct.querySelector(".input__hiden").value = el.description;

        let $clone = d.importNode($templateProduct, true);

        $fragment.appendChild($clone);
      });

      //$main.appendChild($templateMain);
      $insertProduct.appendChild($fragment);
    })

    .catch((err) => {
      let message = res.statusText || "Ocurrio el maldito Problema";
      $main.insertAdjacentHTML = `Error ${err.status}: ${message}`;
      console.log(err, message);
    })
    .finally(() => {
      console.log("Desde el final");
    });
};

d.addEventListener("DOMContentLoaded", (e) => {
  generateProducts();
  ocultarMensaje();
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".product__link")) {
    e.preventDefault();
    fillInfo(e);
  }
});
