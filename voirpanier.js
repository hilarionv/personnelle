let panier = document.getElementById("panier");

function voirpanier () {

    panier.innerHTML = "";

    panierData.forEach((item, index) => {

        let produit = produits.find(p => p.id === item.id);

        panier.innerHTML += `
        <div class="pan"> 
            <div class="top">
                <div class="image">
                    <img src="${produit.image}">
                </div>
                <div class="details">
                    <h4>${produit.nom}</h4>
                    <p>${produit.prix} FCFA</p>
                </div>
            </div>

            <div class="bottom">
                <span class="countt">${item.quantite}</span>

                <button onclick="ajouter(${index})">+</button>
                <button onclick="supprimer(${index})">-</button>
            </div>
        </div>
        `;
    });
}

function ajouter(index) {
    panierData[index].quantite++;
    voirpanier();
}

function supprimer(index) {
    if (panierData[index].quantite > 1) {
        panierData[index].quantite--;
    } else {
        panierData.splice(index, 1);
    }
    voirpanier();
}