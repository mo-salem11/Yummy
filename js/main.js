/// <reference types="../@types/jquery"/> 
// start media //
window.addEventListener('resize', function() {
    updatePadding();
  });
  
  function updatePadding() {
    var searchContainer = document.getElementById('searchContainer');
  
   
    if (window.innerWidth <= 767) {
      searchContainer.style.paddingLeft = '0';
    } else {
      searchContainer.style.paddingLeft = '70px';
    }
  }
  
  updatePadding();
  
// End media //
// Start loading//
$(
    searchByAll("").then(()=>{
            $(".loading").fadeOut(500,function(){
                $("body").css('overflow','auto');
                $(".inner-loading").fadeOut(500);
            });   })
    );

// End loading//
let row=document.getElementById("searchMealsRow");
let searchInputsRow=document.getElementById("searchInputsRow");
function closeSidenav(){
    let width=$('.nav-tab').outerWidth();
    $('.side-nav').animate({left:-width},500);
    $(".open-close-tab").addClass("fa-align-justify");
    $(".open-close-tab").removeClass("fa-x");
    for(let i=4;i>=0;--i){
        $(".nav-links li").eq(i).animate({top:'300px'},((i+10)*100)); 
    }
}
closeSidenav();
$('.side-nav i.open-close-tab').on('click',()=>{
    
    if($('.side-nav').css('left')=='0px'){
       closeSidenav();
    }
    else{
        $('.side-nav').animate({left:0},500);
        $(".open-close-tab").removeClass("fa-align-justify");
        $(".open-close-tab").addClass("fa-x");
        for(let i=4;i>=0;i--){
            $(".nav-links li").eq(i).animate({top:'0px'},((i+10)*100)); 
        }
        

    }
 
})
/////////////////////////////////////////// 
const navLinks = document.querySelectorAll(".navbar-bottom li");
navLinks.forEach(link => {
  link.addEventListener("click", function(event) {
   
    event.preventDefault();

   
    navLinks.forEach(link => {
      link.classList.remove("Active");
    });

   
    this.classList.add("Active");

  });
});

//////////////////////////////////////////////////////
async function searchByAll(value){
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
   response=await response.json(); 
   response.meals ? displayAllMeals(response.meals) : displayAllMeals([]);
}
function displayAllMeals(array){
    let container="";
    for(let i=0;i<array.length;i++){
        container+=`
        <div onclick="getMealDetails('${array[i].idMeal}')" class="col-lg-3 col-md-4 col-sm-6 cursor-pointer">
        <div class="meal text-center position-relative overflow-hidden">
            <img class="w-100 rounded-3" src='${array[i].strMealThumb}' alt="">
            <div class="meal-layer text-black position-absolute">
                <h3>${array[i].strMeal}</h3>
            </div>
            <div class="mobile-layer rounded-3">
                <h3>${array[i].strMeal.split(" ").slice(0,10).join(" ")}</h3>
            </div>
        </div>
    </div>
        `
    }
    row.innerHTML=container;
}


async function getCetagories(){
    $('.inner-loading').fadeIn(500);
    searchInputsRow.innerHTML="";
    closeSidenav();
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response=await response.json();
    displayCetagories(response.categories);
    $('.inner-loading').fadeOut(500);
}
function displayCetagories(array){
    let container="";
    for(let i=0;i<array.length;i++){
        container+=`
        <div onclick="getCetagoriesMeals('${array[i].strCategory}')" class="col-lg-3 col-md-4 col-sm-6 mb-2 cursor-pointer">
          <div class="category position-relative overflow-hidden">
          <img class="w-100 rounded-3" src='${array[i].strCategoryThumb}' alt="image-cat-${i}-image">
          <div class="cat-layer p-2 text-center text-black position-absolute">
                <h3>${array[i].strCategory}</h3>
                <p class="pb-2">${array[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}.....</p>
            </div>
          </div>  
        </div>
        `
    }
    row.innerHTML=container;
}
async function getArea(){
    $('.inner-loading').fadeIn(500);
    searchInputsRow.innerHTML="";
    closeSidenav();
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response=await response.json();
    displayAreaMeals(response.meals);
    $('.inner-loading').fadeOut(500);
}
function displayAreaMeals(array){
  let container="";
  for(let i=0;i<array.length;i++){
    container+=`
    <div onclick="getAreaMeals('${array[i].strArea}')" class="col-lg-3 col-md-4 col-sm-6 border p-1">
       <div class="rounded-2 text-center cursor-pointer">
        <i class="fa-duotone fa-house-laptop fa-3x mt-2" style="--fa-primary-color: #e3c52b; --fa-secondary-color: #e3c52b;"></i>
        <h3>${array[i].strArea}</h3>
       </div>
    </div>
    `
  }
  row.innerHTML=container;
}
async function getIngredients(){
    $('.inner-loading').fadeIn(500);
    searchInputsRow.innerHTML="";
    closeSidenav();
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response=await response.json();
    displayIngredients(response.meals.slice(0, 20));
    $('.inner-loading').fadeOut(500);
}
function displayIngredients(array){
  let container="";
  for(let i=0;i<array.length;i++){
    container+=`
    <div onclick="getIngredientsMeals('${array[i].strIngredient}')" class="col-lg-3 col-md-4 col-sm-6 border">
       <div class="rounded-2 text-center cursor-pointer">
         <i class="fa-duotone fa-turkey mt-2 mb-2 fa-4x" style="--fa-primary-color: #d9c53f; --fa-secondary-color: #e5c110;"></i>
         <h3>${array[i].strIngredient}</h3>
         <p>${array[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
       </div>
    </div>
    `
  }
    document.getElementById("searchContainer").classList.add("padding-container-details");
  row.innerHTML=container;
}
async function getCetagoriesMeals(category){
    $('.inner-loading').fadeIn(500);
    closeSidenav();
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response=await response.json();
    
    displayAllMeals(response.meals.slice(0, 20));
    $('.inner-loading').fadeOut(500);
    
}
async function getAreaMeals(area){
    $('.inner-loading').fadeIn(500);
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response=await response.json();
    displayAllMeals(response.meals.slice(0, 20));
    $('.inner-loading').fadeOut(500);
}
async function getIngredientsMeals(gredient){
    $('.inner-loading').fadeIn(500);
    searchInputsRow.innerHTML="";
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${gredient}`);
    response=await response.json();
    displayAllMeals(response.meals.slice(0, 20));
    $('.inner-loading').fadeOut(500);
}
async function getMealDetails(id){
    $('.inner-loading').fadeIn(500); 
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  response=await response.json();
  displayMealDetails(response.meals[0]);
  $('.inner-loading').fadeOut(500);
}
function displayMealDetails(meal){
    searchInputsRow.innerHTML="";
    let Recipes =``;
    for (let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            Recipes+=` <li class="alert  alert-info p-1 m-2">${meal[`strMeasure${i}`]}</li>`
        }
    }
    let Tags = meal.strTags?.split(",");
    if(!Tags)Tags=[];
    let TagsStr=``;
    for(let i=0;i<Tags.length;i++){
        TagsStr += `
        <li class="alert alert-danger m-2 p-1">${Tags[i]}</li>`
    }

    let container=`
    <div class="row py-5 text-center text-md-start">
         <div class="col-md-4 ">
            <img class="w-100 rounded-3 mb-2" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
         <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3>Area :<span> ${meal.strArea}</span></h3> 
            <h3>Category :<span> ${meal.strCategory}</span></h3> 
            <h3>Recipes :</h3>
            <ul class="d-flex flex-wrap justify-content-center justify-content-md-start">
                ${Recipes}
            </ul>
            <h3>Tags :</h3>
            <ul class="d-flex flex-wrap justify-content-center justify-content-md-start">
                ${TagsStr}
            </ul> 
            <div class="buttons">
                <a target="_blank" class="btn btn-lg btn-success m-2" href="${meal.strSource}">Source</a>
                <a target="_blank" class="btn btn-lg btn-danger" href="${meal.strYoutube}">Youtube</a>
            </div>
        </div>
    
    `;
    row.innerHTML=container;
}
function displaySearchInputs(){

    closeSidenav();
    searchInputsRow.innerHTML=`
    <div class="row py-4 g-3 padding-container" >
        <div class="col-md-6">
                <input oninput="searchByName(this.value)" class="form-control bg-transparent  text-light" placeholder="Search By Name" type="text">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFirstLetter(this.value)"  maxlength="1" class="form-control bg-transparent text-light" placeholder="Search By First Letter" type="text">
            </div>
        </div>   
    `;
    row.innerHTML=``;
   
}
async function searchByName(name){
    $('.inner-loading').fadeIn(500);
    row.innerHTML="";
    searchByAll(name);
    $('.inner-loading').fadeOut(500);
}
async function searchByFirstLetter(letter){
   
    row.innerHTML="";
    if(!letter || letter===" ")letter=="a";
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    response=await response.json();
    response.meals ? displayAllMeals(response.meals) : displayAllMeals([]);
   
}
function displayContacts(){
    closeSidenav();
    searchInputsRow.innerHTML="";
    document.getElementById("searchContainer").classList.remove("padding-container");
    row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container  text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
submitBtn = document.getElementById("submitBtn")


document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
document.getElementById('Categories').addEventListener('click',function(){getCetagories()});
document.getElementById('Area').addEventListener('click',function(){getArea()});
document.getElementById('Ingredients').addEventListener('click',function(){getIngredients()});
document.getElementById('Search').addEventListener('click',function(){displaySearchInputs()});
document.getElementById('Contacts').addEventListener('click',function(){displayContacts()});
document.getElementById('Categories2').addEventListener('click',function(){getCetagories()});
document.getElementById('Area2').addEventListener('click',function(){getArea()});
document.getElementById('Ingredients2').addEventListener('click',function(){getIngredients()});
document.getElementById('Search2').addEventListener('click',function(){displaySearchInputs()});
document.getElementById('Contacts2').addEventListener('click',function(){displayContacts()});