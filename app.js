const btnSubmit = document.getElementById('submit');
const inputName = document.getElementById('name');
const inputAge = document.getElementById('age');
const inputEmail = document.getElementById('email');

const btnList = document.getElementById('btnList');

const tableBody = document.querySelector('table tbody');

//crear db con Pouch
const db = new PouchDB('persons');

btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const persona = {
        _id: new Date().toISOString(),
        name: inputName.value,
        age: inputAge.value,
        email: inputEmail.value,
        status: 'pending'
    };

    db.put(persona)
        .then((response) => {
            console.log(response);
            console.log('Person successfully saved');
            inputName.value = '';
            inputAge.value = '';
            inputEmail.value = '';
        }).catch(err => {
            console.error('Error saving person', err);
        });
})

btnList.addEventListener('click', () => {
    db.allDocs({ include_docs: true })
        .then((result) => {
            console.log('Persons:', result);

            tableBody.innerHTML = '';

            if (result.rows.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay personas registradas</td></tr>`;
                return;
            }

            result.rows.forEach((row, index) => {
                const persona = row.doc;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${persona.name}</td>
                    <td>${persona.email}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" data-id="${persona._id}">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });

            document.querySelectorAll('.btn-danger').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    deletePerson(id);
                });
            });

        })
        .catch((err) => {
            console.error("Error obteniendo personas:", err);
        });
});

function deletePerson(id) {
    db.get(id).then(doc => {
        return db.remove(doc);
    }).then(() => {
        console.log('Persona eliminada');
        btnList.click();
    }).catch(err => {
        console.error('Error eliminando persona:', err);
    });
}