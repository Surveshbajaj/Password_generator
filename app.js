const gen = document.querySelector(".btn");
const upperCase = document.querySelector("#upper");
const lowerCase = document.querySelector("#lower");
const number = document.querySelector("#no");
const show = document.querySelector(".display");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const strength = document.querySelector(".indicator");
const clrBtn = document.querySelector(".clr-btn");
const sym = document.querySelector("#sym");
const range = document.querySelector("#range");
const symbol = ['!','@','#','$','%','^','&','*','(',')','{','}','/'];




let password = "";
let passLength = 8;
let checkCount = 0;

clrBtn.addEventListener("click", function clrBtn(){
    show.value="";
})

function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min )) + min; //The maximum is inclusive and the minimum
}
//Function to generate a random number between two numbers
function getRandomNumber(){
    return getRandomInteger(0,9);
}
function getUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function getLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function getSymbolCase(){
    const ran =  getRandomInteger(0,symbol.length);
    return symbol[ran];
}

// function length(){
//     passLength = range.value;

// }
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', ()=>{
        checkCount = 0;
        allCheckBox.forEach((checkbox)=>{
            if (checkbox.checked)
            checkCount++;

        })
    //    if(passwordLength<checkCount){
    //     passwordLength= checkCount;
    //     // handleSilder();
    //    }
    })



    
})







function shufflePassword(array){
    for(let i = array.length- 1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}

function setIndicator(color){
  if(color == "red"){
    strength.innerText = "Very Strong";
    strength.style.color = color;
  }
  else if(color == "green"){
    strength.innerText = "Strong";
    strength.style.color = color;
  }
   else if(color == "yellow"){
    strength.innerText = "Week";
    strength.style.color = color;
  }
}
function strt(){
    let ifUpper = false;
    let ifLower = false;
    let ifNum = false;
    let ifSym = false;
    if(upperCase.checked) ifUpper = true;
    if(lowerCase.checked) ifLower = true;
    if(number.checked) ifNum = true;
    if(sym.checked) ifSym = true;

    if(ifUpper && ifLower && ifNum && ifSym && (show.value.length> 10)){
        setIndicator("red");
    }
    else if((ifUpper || ifLower) && (ifNum || ifLower) && (ifNum || ifUpper ) && (ifSym) && ((show.value.length >= 8) && (show.value.length < 10)) ){
        setIndicator("green");
    }
    else if(ifUpper || ifLower || ifNum || ifSym){
        setIndicator("yellow");
    }
    
}



gen.addEventListener("click",()=>{
    // console.log("ck");

 
 

    
    if(checkCount == 0){
        alert("Select at least one box!");
        return;
    }
    
    
    password="";


    let arr = [];
    if(upperCase.checked){
        arr.push(getUpperCase);
       
    }
    if(lowerCase.checked) {
        arr.push(getLowerCase);
       
    }
    if(number.checked){
        arr.push(getRandomNumber);
        
    }
    if(sym.checked){
        arr.push(getSymbolCase);
        // console.log(arr);
    }

    for (let i = 0; i<arr.length; i++) {
        // console.log(arr[i]());
        password += arr[i]();
    }
    // length;
    let remainingLength = 0;
    if(range.value <8 ){
        // alert ("Password must be more than or equal to eight characters.");
         remainingLength = (8 - arr.length);
    } 
    else if(range.value>20){
        alert('password should be between 8 to 20 characters');
        remainingLength=12-(arr.length+4);  
    }
    else{
        remainingLength = (range.value - arr.length);
    }

    for (let i = 0; i< remainingLength; i++) {
        let randInx = getRandomInteger(0, arr.length); // Generate a valid random index
        
        password += arr[randInx]();
    }


    password=  shufflePassword(Array.from(password));

    show.value = password;
    strt();
})
