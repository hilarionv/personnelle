// Mode paiement
function modePaiement(mode, bouton) {
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    bouton.classList.add('active');

    if (mode === 'online') {
        document.querySelector('.paiement').style.display = 'flex';
    } else {
        document.querySelector('.paiement').style.display = 'none';
    }
}

// Afficher le résumé
function afficherResume() {
    const resume = document.getElementById('resume');
    resume.innerHTML = "";

    let total = 0;

    panierData.forEach(item => {
        const produit = produits.find(p => p.id === item.id);
        const sousTotal = produit.prix * item.quantite;
        total += sousTotal;

        resume.innerHTML += `
            <div class="resume-item">
                <p>${produit.nom} x${item.quantite}</p>
                ${item.commentaire ? `<p class="commentaire">💬 ${item.commentaire}</p>` : ''}
                <p>${sousTotal} FCFA</p>
            </div>
        `;
    });

    resume.innerHTML += `<p class="total">Total : ${total} FCFA</p>`;
}

// Envoyer sur WhatsApp
function envoyerCommande() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const numero = document.getElementById('numero').value;
    const classe = document.getElementById('classe').value;
    const heure = document.getElementById('heure').value;

    if (!nom || !prenom || !numero || !classe) {
        alert('Veuillez remplir tous les champs !');
        return;
    }

    let message = `Bonjour, voici ma commande :\n\n`;

    let total = 0;
    panierData.forEach(item => {
        const produit = produits.find(p => p.id === item.id);
        const sousTotal = produit.prix * item.quantite;
        total += sousTotal;
        message += `- ${produit.nom} x${item.quantite} → ${sousTotal} FCFA`;
        if (item.commentaire) message += ` (${item.commentaire})`;
        message += `\n`;
    });

    message += `\nTotal : ${total} FCFA`;
    message += `\n\nNom : ${nom} ${prenom}`;
    message += `\nClasse : ${classe}`;
    message += `\nNuméro : ${numero}`;
    message += `\nHeure de récupération : ${heure}`;

    const url = `https://wa.me/33612345678?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Lancer l'affichage du résumé au chargement
afficherResume();
