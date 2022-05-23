function editNav() {
  let x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements -Éléments du DOM
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalCloseBtn = document.querySelectorAll('.close');
const form = document.getElementsByName('reserve');

// Lanacement l'événement du modal
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// lancer un formulaire modal
function launchModal() {
  modalbg.style.display = 'block';
}

//############################ Fermer le modal #################################//

// Fermer le formulaire modal
function closeModal() {
  modalbg.style.display = 'none';
}

//Fermer l'événement modal
modalCloseBtn[0].addEventListener('click', closeModal);

//############################ Formulaire #################################//

// Conserver les données du formulaire
form[0].addEventListener('submit', (e) => {
  e.preventDefault();
});

// Vérifier la validation de la condition fournie
function checkCondition(condition) {
  if (!condition) return false;
  else return true;
}

// Function pour envoyer un message d'erreur spécifique plutôt que "elementId" fourni
function getErrorMessage(elementId, message, inputAssociate) {
  if (elementId && message) {
    //prendre l'ID de champ concerné et afficher le message d'erreur
    document.getElementById(elementId).style.display = 'block';
    //prendre l'ID de champ concerné et envoyer le message d'erreur
    document.getElementById(elementId).innerText = message;
    // Ajouter aria invalide pour utilisation CSS
    if (inputAssociate) inputAssociate.setAttribute('aria-invalid', 'true');
  }
}

// 2eme "submit", cacher un champ valide précédent invlid
function hideErrorMessage(elementId, inputAssociate) {
  if (elementId) document.getElementById(elementId).style.display = 'none';
  // Remplacez "aria invalid" par "false" pour utiliser CSS
  if (inputAssociate) inputAssociate.setAttribute('aria-invalid', 'false');
}

/*Function pour vérifier la condition du formulaire après "submit", 
et appeler la fonction qui montre un message spécifique ou un champ valide.*/
function validate(form) {
  //Elements du DOM
  const firstName = document.getElementById('first');
  const lastName = document.getElementById('last');
  const email = document.getElementById('email');
  const birthdate = document.getElementById('birthdate');
  const quantity = document.getElementById('quantity');

  let firstNameValid =
    //le champ prénom doit être rensigner
    checkCondition(firstName.value) &&
    //Au moin deux caractères
    checkCondition(firstName.value.length >= 2) &&
    //le champ email respect bien la condition de regexp
    checkCondition(/^[A-Z][a-zA-Z]+$/.test(firstName.value));
  firstNameValid
    ? // Si "false" afficher la message d'erreur sous le champs
      hideErrorMessage('error-firstName', firstName)
    : // Si "false" afficher la message d'erreur sous le champs
      getErrorMessage(
        'error-firstName',
        'Veuillez entrer minimum 2 caractères.',
        firstName
      );
  //Variable
  let lastNameValid =
    //le champ nom doit être rensigner
    checkCondition(lastName.value) &&
    //Au moin deux caractères
    checkCondition(lastName.value.length >= 2) &&
    //le champ email respect bien la condition de regexp
    checkCondition(/^[A-Z][a-zA-Z]+$/.test(lastName.value));
  lastNameValid
    ? // Si "false" afficher la message d'erreur sous le champs
      hideErrorMessage('error-lastName', lastName)
    : // Si "false" afficher la message d'erreur sous le champs
      getErrorMessage(
        'error-lastName',
        'Veuillez entrer minimum 2 caractères.',
        lastName
      );

  // Variable
  let emailValid =
    //le champ est bien rensigné
    checkCondition(email.value) &&
    //le champ email respect bien la condition de regexp
    checkCondition(/[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email.value));
  emailValid
    ? // Si "false" afficher la message d'erreur sous le champs
      hideErrorMessage('error-email', email)
    : // Si "false" afficher la message d'erreur sous le champs
      getErrorMessage('error-email', 'Veuillez entrer un mail valide.', email);

  //Variable
  let birthdateValid =
    //le champ est bien rensigné
    checkCondition(birthdate.value) &&
    //le champ respect bien la condition de regexp
    checkCondition(
      /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(
        birthdate.value
      )
    );
  birthdateValid
    ? // Si "false" afficher la message d'erreur sous le champs
      hideErrorMessage('error-birthdate', birthdate)
    : // Si "false" afficher la message d'erreur sous le champs
      getErrorMessage(
        'error-birthdate',
        'Veuillez entrer le date de naissance.',
        birthdate
      );

  // si n'est pas un nombre return "false" sinon return "true"
  let qteTournamentValid =
    //le champs est bien rensigné
    checkCondition(quantity.value) &&
    //soit du nombre entre 0 et 10
    checkCondition(/^[0-9]+$/.test(quantity.value));
  qteTournamentValid
    ? // Si "true" Cacher la message d'erreur sous le champs
      hideErrorMessage('error-tournament', quantity)
    : // Si "false" afficher la message d'erreur sous le champs
      getErrorMessage(
        'error-tournament',
        'Veuillez entrer une valeur numérique.',
        quantity
      );

  //Au moin un button radio soit caucher
  let locationValid = checkCondition(form.location.value);
  locationValid
    ? // Si "true" Cacher la message d'erreur
      hideErrorMessage('error-location')
    : // Si "false" afficher la message d'erreur
      getErrorMessage('error-location', 'Veuillez sélectionner une ville.');

  //Il faut que le button CGU soit caucher
  let termsValid = checkCondition(form.terms.checked);
  termsValid
    ? // Si "true" Cacher la message d'erreur
      hideErrorMessage('error-terms')
    : // Si "false" afficher la message d'erreur
      getErrorMessage('error-terms', 'Veuillez acceptez les CGU.');

  // Vérifier le formulaire de confirmation et afficher un message de confirmation
  if (
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    birthdateValid &&
    qteTournamentValid &&
    locationValid &&
    termsValid
  ) {
    //Fermer la formulaire (modal-body)
    document.querySelector('.modal-body').style.display = 'none';
    //afficher la message de confirmation
    document.querySelector('.formConfirmation').style.display = 'block';
  }
}
