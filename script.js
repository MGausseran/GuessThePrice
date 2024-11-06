// Étape 1 - Sélectionner nos éléments et créer les variables globales indispensables
let formulaire = document.querySelector('#formulaire');
let input = document.querySelector('#prix');
let error = document.querySelector('small');
let coups = 0;
let prixChoisi;
let randomNumber = Math.floor(Math.random() * 1000);
let rejouerButton;

// Étape 2 - Cacher l'erreur
error.style.display = 'none';

// Étape 3 - Créer le bouton "Rejouer"
function createRejouerButton() {
  rejouerButton = document.createElement('button');
  rejouerButton.textContent = 'Rejouer';
  rejouerButton.className = 'btn btn-success mt-3';
  rejouerButton.addEventListener('click', resetGame);
  formulaire.append(rejouerButton);
}

// Étape 4 - Vérifier que l'utilisateur donne bien un nombre
input.addEventListener('keyup', () => {
  if (isNaN(input.value) || input.value > 1000) {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
  }
});

// Étape 5 - Agir à l'envoi du formulaire
formulaire.addEventListener('submit', (e) => {
  e.preventDefault();

  if (isNaN(input.value) || input.value == '' || input.value > 1000) {
    input.style.borderColor = 'red';
  } else {
    input.style.borderColor = 'silver';
    coups++;
    prixChoisi = input.value;
    verifier(prixChoisi);
    input.value = '';
  }
});

// Étape 6 - Créer la fonction vérifier
function verifier(nombre) {
  let alerte = document.createElement('div');

  if (nombre < randomNumber) {
    alerte.textContent = "#" + coups + ' - ' + input.value + " C'est plus !";
    alerte.className = "instruction plus";
  } else if (nombre > randomNumber) {
    alerte.textContent = "#" + coups + ' - ' + input.value + " C'est moins !";
    alerte.className = "instruction moins";
  } else {
    alerte.textContent = "#" + coups + ' - ' + input.value + " C'est le juste prix ! Félicitations !";
    alerte.className = "instruction fini";
    input.disabled = true;
    createRejouerButton(); // Appeler la fonction pour créer le bouton "Rejouer"
  }

  // Ajouter l'alerte au formulaire
  formulaire.append(alerte);
}

// Étape 7 - Fonction pour réinitialiser le jeu
function resetGame() {
  coups = 0;
  prixChoisi = null;
  randomNumber = Math.floor(Math.random() * 1000);
  input.value = '';
  input.disabled = false;
  input.style.borderColor = 'silver';
  error.style.display = 'none';

  // Supprimer les messages précédents
  const instructions = document.querySelectorAll('.instruction');
  instructions.forEach(instruction => instruction.remove());

  // Supprimer le bouton "Rejouer"
  if (rejouerButton) {
    rejouerButton.remove();
  }
}
