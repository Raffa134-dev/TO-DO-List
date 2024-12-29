let lista = document.getElementById("lista");
let aggiungi = document.getElementById("aggiungi");
let rimuovi = document.getElementById("rimuovi");
let attività = document.getElementById("attività");

// Carica le attività salvate al caricamento della pagina
document.addEventListener("DOMContentLoaded", caricaAttività);

// Aggiungi una nuova attività alla lista
aggiungi.addEventListener("click", () => {
  let testo = attività.value.trim();
  if (testo) {
    aggiungiAttività(testo);
    salvaAttivitàLocalStorage(testo); // Salva la nuova attività nel localStorage
    attività.value = ""; // Pulisci il campo di input
  }
});

// Rimuovi tutte le attività dalla lista
rimuovi.addEventListener("click", () => {
  let attività = lista.querySelectorAll("p"); // Seleziona solo i paragrafi
  attività.forEach((attività) => attività.remove()); // Rimuovi ciascun paragrafo
  localStorage.removeItem("attività"); // Elimina tutte le attività dal localStorage
});


// Funzione per aggiungere un'attività al DOM
function aggiungiAttività(testo) {
  let nuovo = document.createElement("p");
  nuovo.textContent = testo;

  // Aggiungi il comportamento di rimozione
  nuovo.addEventListener("click", () => {
    nuovo.remove();
    rimuoviAttivitàLocalStorage(testo); // Rimuovi l'attività dal localStorage
  });

  lista.appendChild(nuovo);
}

// Carica le attività dal localStorage
function caricaAttività() {
  let attivitàSalvate = JSON.parse(localStorage.getItem("attività")) || [];
  attivitàSalvate.forEach((testo) => aggiungiAttività(testo));
}

// Salva una nuova attività nel localStorage
function salvaAttivitàLocalStorage(testo) {
  let attivitàSalvate = JSON.parse(localStorage.getItem("attività")) || [];
  attivitàSalvate.push(testo);
  localStorage.setItem("attività", JSON.stringify(attivitàSalvate));
}

// Rimuovi un'attività specifica dal localStorage
function rimuoviAttivitàLocalStorage(testo) {
  let attivitàSalvate = JSON.parse(localStorage.getItem("attività")) || [];
  attivitàSalvate = attivitàSalvate.filter((item) => item !== testo);
  localStorage.setItem("attività", JSON.stringify(attivitàSalvate));
}
