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
const formData = document.querySelectorAll('.formData');
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

// Envoyer un message d'erreur spécifique plutôt que "elementId" fourni
// Ajouter aria invalide pour utilisation CSS
function getErrorMessage(elementId, message, inputAssociate) {
  if (elementId && message) {
    document.getElementById(elementId).style.display = 'block';
    document.getElementById(elementId).innerText = message;
    if (inputAssociate) inputAssociate.setAttribute('aria-invalid', 'true');
  } else throw new Error('Missing parameter for handler error message');
}

//2nd submit, hide a valid field previous invlid -2eme "submit", cacher un champ valide précédent invlid
// Remplacez "aria invalid" par "false" pour utiliser CSS
function hideErrorMessage(elementId, inputAssociate) {
  if (elementId) document.getElementById(elementId).style.display = 'none';
  if (inputAssociate) inputAssociate.setAttribute('aria-invalid', 'false');
}

//Check after submit form conditon, and call function who show specific message or a valid field
//Vérifier la condition du formulaire après "submit", et appeler la fonction qui montre un message spécifique ou un champ valide.
function validate(form) {
  //Elements du DOM
  const firstName = document.getElementById('first');
  const lastName = document.getElementById('last');
  const email = document.getElementById('email');
  const birthdate = document.getElementById('birthdate');
  const quantity = document.getElementById('quantity');

  let firstNameValid =
    checkCondition(firstName.value) &&
    checkCondition(firstName.value.length >= 2) &&
    checkCondition(/^[A-Z][a-zA-Z]+$/.test(firstName.value));
  firstNameValid
    ? hideErrorMessage('error-firstName', firstName)
    : getErrorMessage(
        'error-firstName',
        'Veuillez entrer minimum 2 caractères.',
        firstName
      );

  let lastNameValid =
    checkCondition(lastName.value) &&
    checkCondition(lastName.value.length >= 2) &&
    checkCondition(/^[A-Z][a-zA-Z]+$/.test(lastName.value));
  lastNameValid
    ? hideErrorMessage('error-lastName', lastName)
    : getErrorMessage(
        'error-lastName',
        'Veuillez entrer minimum 2 caractères.',
        lastName
      );

  let emailValid =
    checkCondition(email.value) &&
    checkCondition(/[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email.value));
  emailValid
    ? hideErrorMessage('error-email', email)
    : getErrorMessage('error-email', 'Veuillez entrer un mail valide.', email);

  let birthdateValid =
    checkCondition(birthdate.value) &&
    checkCondition(
      /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(
        birthdate.value
      )
    );

  birthdateValid
    ? hideErrorMessage('error-birthdate', birthdate)
    : getErrorMessage(
        'error-birthdate',
        'Veuillez entrer le date de naissance.',
        birthdate
      );

  //isNaN return false if is a number, true if not
  // si c'est un nombre return true sinon return false
  let qteTournamentValid =
    checkCondition(quantity.value) &&
    checkCondition(/^[0-9]+$/.test(quantity.value));
  qteTournamentValid
    ? hideErrorMessage('error-tournament', quantity)
    : getErrorMessage(
        'error-tournament',
        'Veuillez entrer une valeur numérique.',
        quantity
      );

  let locationValid = checkCondition(form.location.value);
  locationValid
    ? hideErrorMessage('error-location')
    : getErrorMessage('error-location', 'Veuillez sélectionner une ville.');

  let termsValid = checkCondition(form.terms.checked);
  termsValid
    ? hideErrorMessage('error-terms')
    : getErrorMessage('error-terms', 'Veuillez acceptez les CGU.');

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
    document.querySelector('.modal-body').style.display = 'none';
    document.querySelector('.formConfirmation').style.display = 'block';
  }
}
