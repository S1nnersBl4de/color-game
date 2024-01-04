let rgbcode = document.querySelector(".rgbCode");
let reset = document.querySelector(".reset");
let squares = document.querySelectorAll(".square");
let h1 = document.querySelector("h1");
let hard = document.querySelector(".hardmode");
let easy = document.querySelector(".easymode");
let correctSquareIndex; // ცვლადი ინახავს სწორ ფერს რომელიც ემთხვევა rgb texts
let isHardMode = true; // ცვლადი რომელიც თვალყურს ადევნებს თამაშის რეჟიმს

// ფუნქცცია რომელიც აგენერირებს რანდომ rgbs
function randomrgb() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// ფუნქცია რომელიც არენდომებს რანდომ ტექსტს და ირჩევს ერთერთ კუბიკს რომელშიც ჩასეტავს სწორ rgbs
function updateRGBCode() {
  correctSquareIndex = Math.floor(Math.random() * squares.length);
  rgbcode.textContent = randomrgb();
}

// ფუნქცია რომელიც ყველა კუბიკს რანდომ rgb ფერს აძლევს და უზრუნველყოფს რომ ერთერთ სწორი იქნება
function resetSquareColors() {
  squares.forEach(function (square, index) {
    if (index === correctSquareIndex) {
      square.style.backgroundColor = rgbcode.textContent;
    } else {
      square.style.backgroundColor = randomrgb();
    }

    square.style.opacity = "1";
    square.style.transition = "";
  });
}

// ფუნქცია რომელიც ზემოქმედებს ჩვენ მიერ დაკლიკულ კუბიკზე
function handleSquareClick(event) {
  let clickedSquare = event.target;
  let clickedColor = clickedSquare.style.backgroundColor;

  if (clickedColor === rgbcode.textContent) {
    reset.innerHTML = "You guessed it! Play again?";
    document.body.style.backgroundColor = clickedColor;
    h1.style.backgroundColor = clickedColor;
  }

  clickedSquare.style.opacity = "0";
  clickedSquare.style.transition = "opacity 1s";
}

// ფუნქცია რომელიც რესეტის შემდგომ სტილს აძლევს თამაშს
function resetSquares() {
  reset.innerHTML = "New colors";
  h1.style.backgroundColor = "#232323";
  document.body.style.backgroundColor = "#232323";
  updateRGBCode();
  resetSquareColors();
}

// ფუნქცია რომელიც შეცვლის თამაშის რეჟიმს
function toggleMode() {
  isHardMode = !isHardMode;
  if (isHardMode) {
    // გადაყავს hard მოუდზე
    squares.forEach((square) => {
      square.style.display = "block";
    });
  } else {
    // გადაყავს easy მოუდზე
    squares.forEach((square, index) => {
      if (index > 2) {
        square.style.display = "none";
      } else {
        square.style.display = "block";
      }
    });
  }
  resetSquares(); // გამოვიძახე resetsquares ფუნქცია ამ ფუნქციის შიგნით რადგან მოუდის გადაცვლის დროს თამაში ხელახლა დაიწყოს
}

// eventlistener ბუთონისთვის და კუბიკებისთვის
reset.addEventListener("click", resetSquares);
hard.addEventListener("click", toggleMode);
easy.addEventListener("click", toggleMode);

squares.forEach(function (square) {
  square.addEventListener("click", handleSquareClick);
});

// გამოვიძახე შექმნილი ფუნქციები რადგან page ჩატვირთის დროს ეგრევე იმოქმედოს
updateRGBCode();
resetSquareColors();