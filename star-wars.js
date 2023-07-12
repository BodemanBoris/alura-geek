const d = document;

export default async function getAllStarWars() {
  let $starWarsContainer = d.querySelector(".star-wars__container");
  let $cardTemplate = d.getElementById("card__template").content;
  let $fragment = d.createDocumentFragment();

  try {
    let res = await fetch("https://products-database.onrender.com/starwars"),
      json = await res.json();
    //console.log(json);

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
    $starWarsContainer.appendChild($fragment);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  } catch (err) {
    console.log(err);
  }
}
