const cards = document.querySelectorAll(".card");
let cardCheck = [];
let pairFounded = [];
let nbreCoups = 0;

window.addEventListener('load', () => {
  let orderArray = new Array(12).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
  cards.forEach((card, i) => {
    card.style.order = orderArray[i]
  })
})

const scoreDisplay = () => {
  document.querySelector('.score').textContent = `Nombre de coups : ${nbreCoups}`
}

const winDisplay = () => {
  document.querySelector('.advice').innerHTML = `Vous avez gagné en <b>${nbreCoups}</b> coups`
  return;
}

const reset = () => {
  console.log('reset')
  cards.forEach((card) => {
    card.querySelector(".double-face").classList.remove("active");
    card.style.pointerEvents = '';
    cardCheck = [];
    pairFounded = [];
    nbreCoups = 0;
    scoreDisplay()
  });
}

const clean = () => {
  cardCheck = [];
  cards.forEach((card) => {
    card.querySelector(".double-face").classList.remove("active");
    card.style.pointerEvents = '';
    for (let i = 0; i < pairFounded.length; i++) {
      if (pairFounded[i] == card.getAttribute("data-attr")) {
        card.querySelector(".double-face").classList.add("active");
        card.style.pointerEvents = 'none';
      }
    }
  });
};

const handleCardClick = (e) => {
  let cardAttr = e.target.getAttribute("data-attr");
  if (cardCheck.length <= 2) {
    cardCheck.push(cardAttr);
    e.target.querySelector(".double-face").classList.add("active");
    e.target.style.pointerEvents = 'none'
    if (cardCheck[0] === cardCheck[1]) {
      // Pair trouvée
      pairFounded.push(cardCheck[0]);
      cardCheck = [];
      nbreCoups++;
      scoreDisplay();
      if (pairFounded.length === 6) {
        winDisplay();
      }
    } else if (cardCheck.length === 2 && cardCheck[0] !== cardCheck[1]) {
      setTimeout(clean, 1000);
      nbreCoups++;
      scoreDisplay();
    }
  }
};

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
});

window.addEventListener('keyup', (e) => {
  if (e.code == "Space" || e.keyCode == 32) {
    reset()
  }
})