const d = document;
const $fragment = d.createDocumentFragment();
const $fragmentMain = d.createDocumentFragment();
const $templateMain = d.getElementById("main__template").content;
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
  fetch("http://localhost:3000/diversos")
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((json) => {
      json.forEach((el) => {
        $templateMain.querySelector(".main__product-imagen").src = el.imgSrc;
        $templateMain.querySelector(".main__product-title").textContent =
          el.nombre;
        $templateMain.querySelector(".main__product-price").textContent =
          el.price;
        $templateMain.querySelector(".main__product-description").textContent =
          el.description;
      });

      json.forEach((el) => {
        $templateProduct.querySelector(".img__product").src = el.imgSrc;
        $templateProduct.querySelector(".item__name").innerText = el.nombre;
        $templateProduct.querySelector(".item__price").innerText = el.price;
        $templateProduct.querySelector(".input__hiden").value = el.description;

        let $clone = d.importNode($templateProduct, true);

        $fragment.appendChild($clone);
      });

      json.forEach((el) => {
        $templateMain.querySelector(".main__product-imagen").src = el.imgSrc;
        $templateMain.querySelector(".main__product-title").textContent =
          el.nombre;
        $templateMain.querySelector(".main__product-price").textContent =
          el.price;
        $templateMain.querySelector(".main__product-description").textContent =
          el.description;
      });

      $main.appendChild($templateMain);
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
  if (e.target.matches(".img__product")) {
    console.log(e.target.src);
    $templateMain.innerText = "";
    let imagen = d.createElement("img");
    let title = d.createElement("p");

    imagen.src = e.target.src;
    title = e.target.src;

    $clone = d.importNode($templateMain, true);
    $templateMain.appendChild($clone);
  }
  if (e.target.matches(".product__link")) {
    e.preventDefault();
    fillInfo(e);
  }
});
