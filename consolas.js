const d = document;

export default async function getAllConsolas() {
  let $consolasContainer = d.querySelector(".consolas__container");
  let $cardTemplate = d.getElementById("card__template").content;
  let $fragment = d.createDocumentFragment();

  try {
    let res = await fetch("http://localhost:3000/consolas"),
      json = await res.json();

    //console.log(json);
    json.forEach((el) => {
      $cardTemplate.querySelector(".card__img").src = el.imgSrc;
      $cardTemplate.querySelector(".card__title").textContent = el.nombre;
      $cardTemplate.querySelector(".card__price").textContent = el.price;
      $cardTemplate.querySelector(".card__description-hiden").textContent =
        el.description;

      $cardTemplate.querySelector(".trash__icon").dataset.id = el.id;

      $cardTemplate.querySelector(".pencil__icon").dataset.id = el.id;
      $cardTemplate.querySelector(".pencil__icon").dataset.nombre = el.nombre;
      $cardTemplate.querySelector(".pencil__icon").dataset.categorias =
        el.categori;
      $cardTemplate.querySelector(".pencil__icon").dataset.price = el.price;
      $cardTemplate.querySelector(".pencil__icon").dataset.imgSrc = el.imgSrc;
      $cardTemplate.querySelector(".pencil__icon").textContent = el.desciption;

      let $clone = d.importNode($cardTemplate, true);
      $fragment.appendChild($clone);
    });
    $consolasContainer.appendChild($fragment);

    /* <template id="card__template">
      <div class="card">
          <i class="fa-solid fa-trash card__icon"></i>
          <i class="fa-solid fa-pencil card__icon"></i>
          <img class="card__img" src="" alt="" />
          <div class="card__detail">
            <p class="card__title"></p>
            <p class="card__price"></p>
            <p class="card__description-hiden"></p>
          </div>
        </div>
      </template> */
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  } catch (err) {
    console.log(err);
  }
}
