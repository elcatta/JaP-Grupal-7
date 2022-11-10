const USERS_API = "https://6363a49837f2167d6f7ed0ef.mockapi.io/users";
const CONTAINER = document.getElementById("results");


function getJSONData(url) {
  return fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      return result;
    });
}




async function createUser() {
  const data = {
    name: document.getElementById("inputPostNombre").value,
    lastname: document.getElementById("inputPostApellido").value,
  };

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  await fetch(USERS_API, settings).then((data) => {
    if (!data.ok) {
      throw Error(data.status);
    }
    return data.json();
  });

  console.log("Exito")
    userSearch()
}


async function getCurrentUser(){
    let id = document.getElementById("inputPutId").value;
    const user = await getJSONData(USERS_API + "/" + id);
    document.getElementById("inputPutNombre").value = user.name
    document.getElementById("inputPutApellido").value = user.lastname
}


async function modifyUser(){
    let id = document.getElementById("inputPutId").value;
    fetch(USERS_API + "/" + id, {
        method: 'PUT',
        body: JSON.stringify({
            name: document.getElementById("inputPutNombre").value,
            lastname: document.getElementById("inputPutApellido").value
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    userSearch()
}

async function deleteUser(){
    let id = document.getElementById("inputDelete").value;
    fetch(USERS_API + "/" + id, {
        method: 'DELETE',
    });
    userSearch()
}

async function userSearch() {
    CONTAINER.innerHTML = ""
    let id = document.getElementById("inputGet1Id").value;
    const users = await getJSONData(USERS_API + "/" + id);
    if (id == "") {
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            CONTAINER.innerHTML +=
                `
                    <li class="px-2 pb-1 border" style="color: #20C20E;"> 
                    ID: ` +
                user.id +
                ` <br>
                    NAME: ` +
                user.name +
                `<br>
                    LASTNAME: ` +
                user.lastname +
                `
                    </li>`;
        }
    } else {
        CONTAINER.innerHTML +=
            `
        <li class="px-2 pb-1 border" style="color: #20C20E;"> 
        ID: ` +
            users.id +
            ` <br>
        NAME: ` +
            users.name +
            `<br>
        LASTNAME: ` +
            users.lastname +
            `
        </li>`;
    }
}
let inputNombre = document.getElementById("inputPostNombre");
let inputApellido = document.getElementById("inputPostApellido");
let inputDelete = document.getElementById("inputDelete");
let inputPutId = document.getElementById("inputPutId")
function tieneAlgo(input, boton){
    if (input.value != "") {
        boton.classList.remove("disabled")
    } else{
       boton.classList.add("disabled")
    }
}


inputNombre.addEventListener("input",()=>{
    tieneAlgo(inputNombre, document.getElementById("btnPost"))
})

inputApellido.addEventListener("input",()=>{
    tieneAlgo(inputApellido, document.getElementById("btnPost"))
})

inputDelete.addEventListener("input",()=>{
    tieneAlgo(inputDelete, document.getElementById("btnDelete"))
})

inputPutId.addEventListener("input",()=>{
    tieneAlgo(inputPutId, document.getElementById("btnPut"))
})
