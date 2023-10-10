//Reg Form
const regForm = document.forms["regForm"];
regForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = regForm.querySelector('input[name="name"]').value;
  const email = regForm.querySelector("input[name=email]").value;
  const password = regForm.querySelector("input[name=password]").value;
  const host = regForm.querySelector("input[name=domain]").value;
  const isFilled =
    name !== "" && email !== "" && password !== "" && host !== "";

  if (isFilled) {
    const data = JSON.stringify({ name, email, password, host });
    postDev("/api/developers/register", data, "POST");
  } else {
    console.log("fill all inputs");
  }
});

function postDev(endpoint, data, method) {
  let base_url = `http://localhost:4000${endpoint}`;
  let headers = new Headers();
  if (data) {
    headers.append("Content-Type", "application/json");
  }
  let req = new Request(base_url, {
    method,
    headers,
    body: data,
  });

  fetch(req)
    .then((res) => res.json())
    .then((data) => console.log("content: ", data)) //respoonse from server
    .catch((error) => console.error(error));
}
