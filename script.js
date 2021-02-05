//Variable Decleration
const container = $("#container");
const monitor = $("#monitor");
const ope = $("#ope");
let clicked = "";
let tmpResult = ";"
let tmpNum;
let curNum = "";
let operator = ["+", "-", "X", "/", "="];
let functionalKey = ["+/-", "BS", "CE", "AC"]
let flag = false;
let minus = false;

//Create cal View
//Left Table
let inside = 7;
let row = $("<tr></tr>");
for( let _ = 0; _ < 9; _ ++){
    row.append(`<td class="numb">${inside}</td>`);
    if (inside % 3 == 0){
        $("#left-table").append(row);
        inside -= 6;
        row = $(`<tr></tr>`);
    }
    inside++
}

$("td").click((e)=>{
    clicked = e.currentTarget.innerHTML;
    console.log(clicked);
    if(operator.includes(clicked)){ 
        if (!flag){
            //case: num1 + "op" + num2
            tmpNum = Number(curNum);
            curOp = clicked;
            curNum = "";
            flag = true;
            showOp(curOp);
       }else if(clicked !== "=") {
           //case: num1 + "op" + num2 + "op" 
            tmpResult = result(tmpNum, Number(curNum), curOp)
            output(tmpResult);
            tmpNum = Number(tmpResult);
            curNum = "";
            curOp = clicked;
            showOp(curOp);
       }else if (clicked === "="){
            tmpResult = result(tmpNum, Number(curNum), curOp)
            output(tmpResult);
            tmpNum = Number(tmpResult);
            curNum = "";
            flag = false;
            showOp("");
       }
    }else if(functionalKey.includes(clicked)){
        switch (clicked) {
            case "+/-":
                minus = !minus;
                if(minus){
                    curNum = "-" + curNum
                }else{
                    //create new string start from index 1
                    curNum = curNum.substring(1)
                }
                output(curNum)
                break;
        
            default:
                break;
        }
    }else{
        curNum += e.currentTarget.innerHTML;
        output(curNum)
    }
})

const output = (num) =>{
    monitor.html(num)
}
const showOp = (op) => {
    ope.html(op)
}
const result = (firstNum, secondNum, op) =>{
    switch (op) {
        case "+":
            return firstNum + secondNum;
        case "-":
            return firstNum - secondNum;
    
        case "X":
            return firstNum * secondNum;
        case "/":
            if(secondNum !== 0){
                return firstNum / secondNum;
            }else{
                alert("Can not Devide by Zero. Caculator is reseted to 0");
                return 0;
            }
        default:
            break;
    }
}