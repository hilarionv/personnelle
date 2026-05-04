const produits = [
    { id: 1, nom: "Crêpe Nutella", prix: 500, image: "crêpe1.PNG", categorie: "crepes", description: "Lorem"},
    { id: 2, nom: "Crêpe Confiture", prix: 400, image: "crêpe2.PNG", categorie: "crepes", description: "Lorem"},
    { id: 3, nom: "Crêpe Nature", prix: 300, image: "crêpe3.PNG", categorie: "crepes", description: "Lorem"},
    { id: 4, nom: "Jus de Bissap", prix: 300, image: "jus1.PNG", categorie: "jus", description: "Lorem"},
    { id: 5, nom: "Jus de Gingembre", prix: 300, image: "Jus2.PNG", categorie: "jus", description: "Lorem"},
    { id: 6, nom: "Jus de Ditakh", prix: 300, image: "jus1.PNG", categorie: "jus", description: "Lorem"},
 ]
 
 function genererCards() {
    const listeCrepes = document.querySelector('.crêpes .splide__list');
    const listeJus = document.querySelector('.juslocaux .splide__list');
 
    produits.forEach(produit => {
        const li = document.createElement('li');
        li.classList.add('splide__slide');
 
        li.innerHTML = `
        <div class="product-card">
            <img src="${produit.image}" alt="${produit.nom}">
            <p class="produit">${produit.nom}</p>
            <p class="prix">${produit.prix} FCFA</p>
            <a href="panier.html?id=${produit.id}">Voir</a>
            <a href="javascript:void(0)" onclick="ajouterAuPanier(${produit.id})">Acheter</a>
        </div>
        `;
 
        if (produit.categorie === 'crepes') {
            listeCrepes.appendChild(li);
        } else {
            listeJus.appendChild(li);
        }
    });
 }
 
 // Charger le panier depuis LocalStorage
 let panierData = JSON.parse(localStorage.getItem('panier')) || [];
 
 // Mettre à jour le compteur au chargement
 let totalInitial = 0;
 panierData.forEach(p => totalInitial += p.quantite);
 if (document.getElementById('compteur')) {
    document.getElementById('compteur').textContent = totalInitial;
 }
 
 function ajouterAuPanier(id) {
    const produit = produits.find(p => p.id === id);
 
    let item = panierData.find(p => p.id === id);
 
    if (item) {
        item.quantite++;
    } else {
        panierData.push({
            id: id,
            quantite: 1
        });
    }
 
    // Sauvegarder APRÈS modification
    localStorage.setItem('panier', JSON.stringify(panierData));
 
    // Mettre à jour le compteur
    let total = 0;
    panierData.forEach(p => total += p.quantite);
    document.getElementById('compteur').textContent = total;
 }
 