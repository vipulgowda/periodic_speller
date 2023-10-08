var elements;

await loadPeriodicTable();

async function loadPeriodicTable() {
  elements = await fetch("periodic-table.json").then((response) =>
    response.json()
  );
}

function check(inputWord) {
  // TODO: determine if `inputWord` can be spelled
  // with periodic table symbols; return array with
  // them if so (empty array otherwise)
  const res = [];
  for (let el = 0; el < inputWord.length; el++) {
    if (elements.find((e) => e.symbol.toLowerCase()[0] === inputWord[el])) {
      res.push(inputWord[el]);
    }
  }
  if (res.length > 0) {
    return res;
  } else {
    return [];
  }
}

function lookup(elementSymbol) {
  // TODO: return the element entry based on specified
  // symbol (case-insensitive)
  const resultEl = elements.find(
    (el) => el.symbol.toLowerCase() === elementSymbol.toLowerCase()
  );
  debugger
  return resultEl;
}

export default { check, lookup }