//Variable Decleration
const container = $("#container");
const monitor = $("#monitor");
const ope = $("#ope");
let clicked = "";
let tmpResult = "";
let tmpNum;
let curNum = "";
let operator = ["+", "-", "X", "/", "="];
let functionalKey = ["+/-", "BS", "CE", "AC"];
let flag = false; //hasFirstNum
let minus = false;
let curOp = "";
let checkEqual = false;

//Create cal View
//Left Table
let inside = 7;
let row = $("<tr></tr>");
for (let _ = 0; _ < 9; _++) {
  row.append(`<td class="numb">${inside}</td>`);
  if (inside % 3 == 0) {
    $("#left-table").append(row);
    inside -= 6;
    row = $(`<tr></tr>`);
  }
  inside++;
}

$("td").click(function (e) {
  blink($(this));

  clicked = e.currentTarget.innerHTML;

  if (operator.includes(clicked)) {
    if (checkEqual && clicked !== "=") {
      curNum = tmpNum;
      // flag = true;
      checkEqual = false;
    }
    if (!flag && clicked !== "=") {
      //case: num1 + "op" + num2
      tmpNum = Number(curNum);
      curOp = clicked;
      curNum = "";
      flag = true;
      showOp(curOp);
    } else if (clicked !== "=") {
      //case: num1 + "op" + num2 + "op"

      tmpResult = result(tmpNum, Number(curNum), curOp);
      output(tmpResult);
      tmpNum = Number(tmpResult);
      curNum = "";
      curOp = clicked;
      showOp(curOp);
    } else if (clicked === "=" && curOp !== "") {
      tmpResult = result(tmpNum, Number(curNum), curOp);
      output(tmpResult);
      tmpNum = Number(tmpResult);
      curNum = "";
      flag = false;
      checkEqual = true;
      showOp("");
    }
  } else if (functionalKey.includes(clicked)) {
    switch (clicked) {
      case "+/-":
        minus = !minus;
        if (curNum == "") {
          curNum = "" + tmpResult;
        }
        if (minus) {
          curNum = "-" + curNum;
        } else {
          //create new string start from index 1
          //to clear the "-"
          curNum = curNum.substring(1);
        }
        output(curNum);
        break;
      case "BS":
        curNum = replaceIndex(curNum);
        // console.log(curNum)
        output(curNum);
        break;
      case "CE":
        curNum = "";
        output("0");
        break;
      case "AC":
        curNum = "";
        tmpNum = "";
        flag = false;
        curOp = "";
        showOp(curOp);
        output("0");
        break;
      default:
        break;
    }
  } else {
    checkEqual = false;
    curNum += e.currentTarget.innerHTML;
    output(curNum);
  }
});

const output = (num) => {
  monitor.html(num);
};

const showOp = (op) => {
  ope.html(op);
};

const result = (firstNum, secondNum, op) => {
  switch (op) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;

    case "X":
      return firstNum * secondNum;
    case "/":
      if (secondNum !== 0) {
        return firstNum / secondNum;
      } else {
        alert("Can not Devide by Zero. Caculator is reseted to 0");
        return 0;
      }
    default:
      break;
  }
};

const replaceIndex = (_str) => {
  let newStr = "";
  for (let i = 0; i < _str.length - 1; i++) {
    newStr += _str[i];
  }
  return newStr;
};

const blink = (box) => {};
