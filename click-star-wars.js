const d = document;

export default async function clickStarWars() {
  const $form = d.getElementById("form");
  d.addEventListener("submit", async (e) => {
    if (e.target.matches) {
      e.preventDefault();
    }
    if (!e.target.id.value) {
      try {
        let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            nombre: e.target.nombre.value,
            categori: e.target.categorias.value,
            imgSrc: e.target.imgSrc.value,
            price: e.target.precio.value,
            description: e.target.description.value,
          }),
        };
        let seccion = e.target.categorias.value;
        console.log(seccion);
        let res = await fetch(
          `https://products-database.onrender.com/${seccion}`,
          options
        );
        let json = await res.json();
        if (!res.ok)
          throw {
            status: res.status,
            statusText: res.statusText,
          };
        location.reload();
      } catch (err) {
        let message =
          err.statusText || "Ocurrio un errror ASYNC DESDE EL EDITH";
        alert(`${err.status}: ${message}`);
      }
    } else {
      //console.log(e.target.id.value);
      try {
        let options = {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            nombre: e.target.nombre.value,
            categori: e.target.categorias.value,
            imgSrc: e.target.imgSrc.value,
            price: e.target.precio.value,
            description: e.target.description.value,
          }),
        };
        let seccion = e.target.categorias.value;
        console.log(seccion);
        let res = await fetch(
          `https://products-database.onrender.com/${seccion}/${e.target.id.value}`,
          options
        );
        let json = await res.json();
        if (!res.ok)
          throw {
            status: res.status,
            statusText: res.statusText,
          };
        //location.reload();
      } catch (err) {
        let message =
          err.statusText || "Ocurrio un errror ASYNC DESDE EL EDITH";
        alert(`${err.status}: ${message}`);
      }
    }
  });
}
