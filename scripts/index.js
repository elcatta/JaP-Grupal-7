const USERS_API = "https://6363a49837f2167d6f7ed0ef.mockapi.io/users";
const CONTAINER = document.getElementById("results");
const inputName = document.getElementById("inputPostNombre");
const inputLastname = document.getElementById("inputPostApellido");
const inputDelete = document.getElementById("inputDelete");
const inputPutId = document.getElementById("inputPutId")

var modifyModal = new bootstrap.Modal(document.getElementById('dataModal'), {
    keyboard: false
})

// CREATE USER

async function createUser() {
    await fetch(USERS_API, {
        method: "POST",
        body: JSON.stringify({
            name: inputName.value,
            lastname: inputLastname.value
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert('Error de solicitud')
        }
    })
    userSearch()
}

// MODIFY USER INFO

async function getCurrentUser() {
    let id = document.getElementById("inputPutId").value;
    const user = await fetch(USERS_API + "/" + id).then((response) => {
        if (response.ok) {
            modifyModal.show()
            return response.json();
        } else {
            alert('Error de solicitud')
        }
    })

    document.getElementById("inputPutNombre").value = user.name
    document.getElementById("inputPutApellido").value = user.lastname   
}

async function modifyUser() {
    let id = document.getElementById("inputPutId").value;
    await fetch(USERS_API + "/" + id, {
        method: 'PUT',
        body: JSON.stringify({
            name: inputName.value,
            lastname: inputLastname.value
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
        alert('Error de solicitud')
        }
    })
    userSearch()
}

// DELETE USER

async function deleteUser() {
    let id = inputDelete.value;
    await fetch(USERS_API + "/" + id, {
        method: 'DELETE',
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
        alert('Error de solicitud')
        }
    })
    userSearch()
}


// USER SEARCH

async function userSearch() {
    CONTAINER.innerHTML = ""
    let id = document.getElementById("inputGet1Id").value;
    const users = await fetch(USERS_API + "/" + id).then((response) => {
        if (response.ok) {
            return response.json();
        }  else {
            alert('Error de solicitud')
        }
    });
    
    if (id == "") {
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            CONTAINER.innerHTML +=
                `<li class="px-2 pb-1 border" style="color: #20C20E;"> 
                ID: ${user.id} <br>
                NAME: ${user.name} <br>
                LASTNAME: ${user.lastname}
            </li>`;
        }
    } else {
        CONTAINER.innerHTML +=
            `<li class="px-2 pb-1 border" style="color: #20C20E;"> 
            ID: ${users.id} <br>
            NAME: ${users.name} <br>
            LASTNAME: ${users.lastname}
            </li>`;
    }

    document.getElementById("inputGet1Id").value = "";
}

function tieneAlgo(input, boton) {
    console.log("eaaaa");
    if (input.value != "") {
        boton.classList.remove("disabled")
    } else {
        boton.classList.add("disabled")
    }
}


inputName.addEventListener("input", () => {
    tieneAlgo(inputName, document.getElementById("btnPost"))
    tieneAlgo(inputLastname, document.getElementById("btnPost"))
})

inputLastname.addEventListener("input", () => {
    tieneAlgo(inputLastname, document.getElementById("btnPost"))
    tieneAlgo(inputName, document.getElementById("btnPost"))
})

inputDelete.addEventListener("input", () => {
    tieneAlgo(inputDelete, document.getElementById("btnDelete"))
})

inputPutId.addEventListener("input", () => {
    tieneAlgo(inputPutId, document.getElementById("btnPut"))
})



