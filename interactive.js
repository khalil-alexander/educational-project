// Math section
const btn = document.querySelector(".math-block");
console.log(btn);
function mathClick(){
    console.log("Button works")
    window.location.href = "math/options-page/math-options.html";
}

btn.addEventListener("click", () => mathClick());



