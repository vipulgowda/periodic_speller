import Speller from "./speller.js";


if (/loading|interactive|complete/.test(document.readyState)) {
  ready();
} else {
  document.addEventListener("DOMContentLoaded", ready);
}

/***********************
 * Ready function
 ************************/

function ready() {
  let inputWordEl = document.getElementById("enter-word");
  let spellBtn = document.getElementById("spell-btn");
  let spellWrd = document.getElementById("word-spelling");

  inputWordEl.addEventListener("keydown", onkeydown, false);
  spellBtn.addEventListener("click", checkWord, false);

  /************/
  function onkeydown(evt) {
    if (evt.key == "Enter") {
      checkWord();
    }
  }

  function checkWord() {
    let inputWrd = inputWordEl.value.toLowerCase().trim();
    inputWordEl.value = inputWrd;
    //validate the input
    if (!/^[a-z]{3,}$/.test(inputWrd)) {
      alert("Enter a word at least 3 letters long!");
      return;
    }

    //attempt to spell word
    let symbols = Speller.check(inputWrd);
    if (symbols.length > 0) {
      inputWordEl.value = "";
      spellWords(symbols);
    } else {
      spellWrd.innerHTML = "<strong>-- couldn't spell it! --</strong>";
    }
  }
  /************/

  function spellWords(symbols) {
    spellWrd.innerHTML = "";

    for (let symbol of symbols) {
      let elementEntry = Speller.lookup(symbol);
      let elementDiv = document.createElement("div");
      elementDiv.className = "element";
      elementDiv.innerHTML = `
      <div class="number">${elementEntry.number}</div>
      <div class="symbol">${elementEntry.symbol}</div>
      <div class="name">${elementEntry.name}</div>
      `;
      spellWrd.appendChild(elementDiv);
    }
  }
}
