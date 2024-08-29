document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments de langue et de monnaie
    const languageDropdown = document.querySelector('.language-dropdown');
    const currencyDropdown = document.querySelector('.currency-dropdown');

    // Fonction pour mettre à jour le texte du bouton avec l'option sélectionnée
    function updateButtonText(button, selectedItem) {
        button.innerText = selectedItem.innerText;
    }

    // Ajout d'un gestionnaire d'événements de clic pour les options de langue
    languageDropdown.querySelectorAll('.dropdown-content a').forEach(option => {
        option.addEventListener('click', function(event) {
            event.preventDefault();
            updateButtonText(languageDropdown.querySelector('.dropbtn'), option);
        });
    });

    // Ajout d'un gestionnaire d'événements de clic pour les options de monnaie
    currencyDropdown.querySelectorAll('.dropdown-content a').forEach(option => {
        option.addEventListener('click', function(event) {
            event.preventDefault();
            updateButtonText(currencyDropdown.querySelector('.dropbtn'), option);
        });
    });

    // Fonction pour afficher les produits en fonction de l'onglet sélectionné
    function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        tablinks = document.getElementsByClassName("tab-button");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        document.getElementById(tabName).style.display = "flex";
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");
    }

    // Par défaut, afficher le premier onglet
    document.getElementById("medicaments").style.display = "flex";
    document.getElementById("medicaments").classList.add("active");

    // Attacher les gestionnaires d'événements aux boutons d'onglets
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const tabName = button.getAttribute('data-tab');
            openTab(event, tabName);
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const productCategories = document.querySelectorAll('.product-category');

    // Masquer tous les produits sauf les premiers 7
    for (let i = 7; i < productCategories.length; i++) {
        productCategories[i].style.display = 'none';
    }

    // Bouton pour afficher plus de produits
    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = 'Voir plus de produits';
    showMoreButton.classList.add('show-more-button');
    document.querySelector('.product-section').appendChild(showMoreButton);

    showMoreButton.addEventListener('click', function() {
        for (let i = 7; i < productCategories.length; i++) {
            if (productCategories[i].style.display === 'none') {
                productCategories[i].style.display = 'block';
            }
        }
        showMoreButton.style.display = 'none'; // Cacher le bouton après affichage complet
    });
});

//NOUVEAU CODE
$(document).ready(function() {
    $('.flexslider').flexslider({
        animation: "slide",  // Animation "slide"
        controlNav: true,    // Affiche les points de navigation
        directionNav: true,  // Affiche les flèches de navigation
        pauseOnHover: true   // Met en pause le slider quand la souris est dessus
    });

    // Fonctionnalité des onglets
    $('.tab-button').on('click', function() {
        var tabId = $(this).data('tab');  // Récupère l'ID de l'onglet à activer
        $('.tab-button').removeClass('active');  // Supprime la classe active de tous les boutons
        $('.tab-content').removeClass('active');  // Masque tous les contenus
        $(this).addClass('active');  // Ajoute la classe active au bouton cliqué
        $('#' + tabId).addClass('active');  // Affiche le contenu de l'onglet cliqué
    });
});
