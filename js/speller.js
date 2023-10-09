var elements;
var symbols = {};

await loadPeriodicTable();

async function loadPeriodicTable() {
  elements = await fetch("periodic-table.json").then((response) =>
    response.json()
  );
  for (let element of elements) {
    symbols[element.symbol.toLowerCase()] = element;
  }
}

function findCandidates(inputWord) {
  var oneLetterSymbols = [];
  var twoLetterSymbols = [];

  for (let i = 0; i < inputWord.length; i++) {
    // collect one letter symbol options
    if (inputWord[i] in symbols && !oneLetterSymbols.includes(inputWord[i])) {
      oneLetterSymbols.push(inputWord[i]);
    }

    // collect two letter symbol options
    if (i <= inputWord.length - 2) {
      let two = inputWord.slice(i, i + 2);
      if (two in symbols && !twoLetterSymbols.includes(two)) {
        twoLetterSymbols.push(two);
      }
    }
  }

  return [...twoLetterSymbols, ...oneLetterSymbols];
}

function spellWord(symbols, charsLeft) {
  if (charsLeft.length == 0) {
    return [];
  } else {
    if (charsLeft.length >= 2) {
      let doubleChar = charsLeft.slice(0, 2);
      let rest = charsLeft.slice(2);
      if (symbols.includes(doubleChar)) {
        if (rest != "") {
          let res = [doubleChar, ...spellWord(symbols, rest)];
          if (res.join("") === charsLeft) {
            return res;
          }
        } else {
          return [doubleChar];
        }
      }
    }
    if (charsLeft.length >= 1) {
      let singleChar = charsLeft[0];
      let rest = charsLeft.slice(1);
      if (symbols.includes(singleChar)) {
        if (rest != "") {
          let res = [singleChar, ...spellWord(symbols, rest)];
          if (res.join("") === charsLeft) {
            return res;
          }
        } else {
          return [singleChar];
        }
      }
    }
    return [];
  }
}

function check(inputWord) {
  const symbols = findCandidates(inputWord);
  console.log(symbols, inputWord)
  return spellWord(symbols, inputWord);
}

function lookup(elementSymbol) {
  return symbols[elementSymbol];
}

export default { check, lookup };
