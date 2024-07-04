/** @type { "+" | "-" | "*" | "/" } */
let operator = null;
let a = "";
let b = "";

function beautify(x) {
  const res = x.toFixed(10);
  console.log("beautify", res);
  let i = res.length - 1;
  while (res[i] === "0") {
    i -= 1;
  }
  if (res[i] === ".") {
    i -= 1;
  }
  return res.slice(0, i + 1);
}

function calculate() {
  const u = parseFloat(a);
  const v = parseFloat(b);
  let res;
  switch (operator) {
    case "+":
      res = u + v;
      break;

    case "-":
      res = u - v;
      break;

    case "*":
      res = u * v;
      break;

    case "/":
      res = u / v;
      break;

    default:
      throw new Error("unreachable code");
  }
  return beautify(res);
}

/**
 *
 * @param {number} x
 */
function appendNumber(x) {
  const s = x.toString();
  if (operator !== null) {
    b = b === "0" ? s : b + s;
    $("#result").html(b);
    console.log(a, operator, b);
  } else {
    a = a === "0" ? s : a + s;
    $("#result").html(a);
    console.log(a, operator, b);
  }
}

function appendDecimalPoint() {
  if (a.length === 0) {
    a = "0.";
    $("#result").html(a);
    return;
  }
  if (b.length === 0) {
    if (a.indexOf(".") === -1) {
      a = a + ".";
    } else if (a[a.length - 1] === ".") {
      a = a.slice(0, a.length - 1);
    }
    $("#result").html(a);
    return;
  }
  if (b.indexOf(".") === -1) {
    b = b + ".";
  } else if (b[b.length - 1] === ".") {
    b = b.slice(0, b.length - 1);
  }
  $("#result").html(b);
}

function add() {
  if (a.length === 0) {
    return;
  }
  if (b.length === 0) {
    operator = "+";
    return;
  }
  a = calculate();
  b = "";
  operator = "+";
}

function subtract() {
  if (a.length === 0) {
    return;
  }
  if (b.length === 0) {
    operator = "-";
    return;
  }
  a = calculate();
  b = "";
  operator = "-";
}

function multiply() {
  if (a.length === 0) {
    return;
  }
  if (b.length === 0) {
    operator = "*";
    return;
  }
  a = calculate();
  b = "";
  operator = "*";
}

function getDivided() {
  if (a.length === 0) {
    return;
  }
  if (b.length === 0) {
    operator = "/";
    return;
  }
  a = calculate();
  b = "";
  operator = "/";
}

function changeSign() {
  if (a.length === 0) {
    return;
  }
  if (b.length === 0) {
    a = (-parseFloat(a)).toString();
    $("#result").html(a);
    return;
  }
  b = (-parseFloat(b)).toString();
  $("#result").html(b);
}

function getDividedBy100() {
  if (a.length === 0) {
    return;
  }
  if (b.length === 0) {
    a = beautify(parseFloat(a) / 100.0);
    $("#result").html(a);
    return;
  }
  b = beautify(parseFloat(b) / 100.0);
  $("#result").html(b);
}

function getResult() {
  if (a.length === 0) {
    $("#result").html("0");
    return;
  }
  if (b.length === 0) {
    $("#result").html(a);
    return;
  }
  const res = calculate();
  a = res;
  b = "";
  operator = null;
  $("#result").html(res);
}

function clear() {
  a = "";
  b = "";
  operator = null;
  $("#result").html("");
}

for (let i = 0; i <= 9; i += 1) {
  $(`td#button${i}`).on("click", () => appendNumber(i));
}
$("td#point").on("click", appendDecimalPoint);
$("td#add").on("click", add);
$("td#sub").on("click", subtract);
$("td#mul").on("click", multiply);
$("td#div").on("click", getDivided);
$("td#pm").on("click", changeSign);
$("td#percent").on("click", getDividedBy100);
$("td#eq").on("click", getResult);
$("td#c").on("click", clear);

$(document).on("keydown", (ev) => {
  const key = ev.key.toLowerCase();
  for (let i = 0; i <= 9; i += 1) {
    if (i.toString() === key) {
      appendNumber(i);
      ev.preventDefault();
      return;
    }
  }
  switch (key) {
    case ".":
      appendDecimalPoint();
      break;

    case "+":
      add();
      break;

    case "-":
      subtract();
      break;

    case "*":
      multiply();
      break;

    case "/":
      getDivided();
      break;

    case "%":
      getDividedBy100();
      break;

    case "s":
      changeSign();
      break;

    case "=":
    case "enter":
      getResult();
      break;

    case "c":
      clear();
      break;

    default:
      return;
  }
  ev.preventDefault();
});
