
    // Récupérer les données
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('GET', 'movies.json');

    //Create a Table of movies
    
xhr.onload = function displayFilms() {
    var myObj = xhr.response;
    const tbody = document.querySelector("tbody");

    for (let xhr of myObj) {

        let festvUl = document.createElement('ul');

        for (const festivalList of xhr.Festivals) {

            let festvLi = document.createElement('li');
            festvLi.append(festivalList);
            festvUl.append(festvLi);
            
        }
        tbody.innerHTML += `
            <tr id="trtbody">
                <th> <img src='${xhr.Poster}' width=100px> </th>
                <td class="align-middle" id="tdTitre">${xhr.Titre}</td>
                <td class="align-middle">${xhr.Réalisateur}</td>
                <td class="align-middle">${xhr.Durée}</td>
                <td class="align-middle">${xhr.année}</td>
                <td class="align-middle">${festvUl.innerHTML}</td>
                <td class="align-middle">
                <ul><li>${xhr.Acteurs[0].Nom}</li>
                <li>${xhr.Acteurs[0].Prénom}</li>
                <li>${xhr.Acteurs[0].Nationalité}</li>
                </ul></td>
            </tr>
        `;
    }
    
};

xhr.send();

    // // Get the search term from the input element

function searchTable() {
    
    const searchTerm = document.getElementById('search').value;

    const rows = document.querySelectorAll('tbody tr');

    for (const row of rows) {

    const cells = Array.from(row.querySelectorAll('td'));
    let found = false;
        if (cells[0].textContent.toUpperCase().includes(searchTerm.toUpperCase())) {
        found = true;
        }
    
    if (found) {
        row.style.display = '';
    } else {
        row.style.display = 'none';
    }
    }
}
document.getElementById('search').addEventListener('keyup', searchTable);

// Sort asc/deasc un Tableau par Titre , Réalisateur , Durée et L'année

function sortTable(n) {
var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
table = document.getElementById("table");
switching = true;

dir = "asc"; 

while (switching) {

switching = false;
rows = table.rows;

for (i = 1; i < (rows.length - 1); i++) {
    
    shouldSwitch = false;
    
    x = rows[i].getElementsByTagName("TD")[n];
    y = rows[i + 1].getElementsByTagName("TD")[n];
    
    if (dir == "asc") {
    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        
        shouldSwitch= true;
        break;
    }
    } else if (dir == "desc") {
    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        
        shouldSwitch = true;
        break;
    }
    }
}
if (shouldSwitch) {
    
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
    
    switchcount ++;      
} else {
    
    if (switchcount == 0 && dir == "asc") {
    dir = "desc";
    switching = true;
    }
}
}
}

