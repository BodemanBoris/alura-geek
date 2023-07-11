const d = document,
  $formEnter = d.querySelector(".login__form"),
  $formCreate = d.querySelector(".create__form"),
  $inicioBtn = d.querySelector(".enter__acount"),
  $createBtn = d.querySelector(".create__acount"),
  $submitEnter = d.getElementById("enter__submit"),
  $submitCreate = d.getElementById("create__submit");
//console.log($submitEnter);

d.addEventListener("click", (e) => {
  if (e.target.matches(".enter__acount")) {
    let $title = d.querySelector(".tite__change");
    $title.textContent = e.target.textContent;
    $formEnter.classList.remove("not-show");
    $inicioBtn.classList.add("seleccion");
    $createBtn.classList.remove("seleccion");
    $formCreate.classList.add("not-show");
  }

  if (e.target.matches(".create__acount")) {
    let $title = d.querySelector(".tite__change");
    $title.textContent = e.target.textContent;
    $createBtn.classList.add("seleccion");
    $inicioBtn.classList.remove("seleccion");
    $formCreate.classList.remove("not-show");
    $formEnter.classList.add("not-show");
  }
});

function crearUsuario() {
  let $name = d.querySelector("#nombre__usuario").value;
  let $mail = d.querySelector("#email__usuario").value;
  let $password = d.querySelector("#password__usuario").value;

  const $users = JSON.parse(localStorage.getItem("users")) || [];
  const isUsersRegistred = $users.find((user) => user.email === $mail);

  if (isUsersRegistred) return alert("Usuario ya registrado");

  $users.push({ name: $name, email: $mail, password: $password });
  localStorage.setItem("users", JSON.stringify($users));
  alert("Registro exitoso. Ya podes iniciar sesion ");
  location.reload();
}
function iniciarSesion() {
  let $email = d.querySelector("#inicio__usuario").value;
  let $password = d.querySelector("#inicio__password").value;

  const $users = JSON.parse(localStorage.getItem("users")) || [];
  console.log($users);
  const validUsers = $users.find(
    (user) => user.email === $email && user.password === $password
  );

  if (!validUsers) {
    return alert("Usuario y/o contraseña mal ingresado");
  } else {
    alert(`Bienvenido ${validUsers.name}`);
    localStorage.setItem("usuario-abierto", validUsers.email);
    window.location.href = "product-add.html";
  }
}

d.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.matches("#create__submit")) {
    crearUsuario();
  }

  if (e.target.matches("#enter__submit")) {
    iniciarSesion();
  }
  if (e.target.matches(".sin__decoration *")) {
    window.location.href = "index.html";
  }
});
