let rowData = document.getElementById('rowData')
let searchContainer = document.getElementById('searchContainer')
let submitBtn;

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();

  $(".side-nav-menu").animate({ left: -boxWidth }, 500);

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-xmark");

  $(".links li").animate({ top: 300 }, 300);
}
function openSideNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-xmark");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 7) * 100);
  }
}

closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});



async function searchByName(term) {
  let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  responce = await responce.json();

  responce.meals ? displayMeals(responce.meals) : displayMeals([])
}
async function searchByFLetter(term) {
    term == "" ? term = "a": "";
  let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  responce = await responce.json();

  responce.meals ? displayMeals(responce.meals) : displayMeals([])
}
function displayMeals(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-3">
                   <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
                       <img src="${arr[i].strMealThumb}" class="w-100">
                       <div class="meal-layer position-absolute d-flex align-items-center p-2">
                           <h2 class="fw-lighter">${arr[i].strMeal}</h2>
                       </div>
                   </div>
                </div>
        `
  }
  rowData.innerHTML = cartoona;
}
searchByName("");


async function getCategories(){
    searchContainer.innerHTML = ''
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    responce = await responce.json()
    displayCategories(responce.categories);
}
function displayCategories(arr){
    let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-3 shadow">
                   <div onclick="getCategoriesMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
                       <img src="${arr[i].strCategoryThumb}" class="w-100">
                       <div class="meal-layer position-absolute text-center p-1">
                           <h2>${arr[i].strCategory}</h2>
                           <p>${arr[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                       </div>
                   </div>
                </div>
        `
  }
  rowData.innerHTML = cartoona;
}

async function getArea(){
    searchContainer.innerHTML = ''
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    responce = await responce.json()
    displayArea(responce.meals);
}
function displayArea(arr){
    let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-3 shadow">
                   <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal text-center rounded-2">
                       <i class="fa-solid fa-city fa-3x"></i>
                       <h2 class="text-light fw-lighter mt-3">${arr[i].strArea}</h2>
                   </div>
                </div>
        `
  }
  rowData.innerHTML = cartoona;
}

async function getIngredients(){
    searchContainer.innerHTML = ''
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    responce = await responce.json()
    displayIngredients(responce.meals.slice(0,20));
}
function displayIngredients(arr){
    let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col-md-3 shadow">
                   <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="meal text-center rounded-2">
                       <i class="fa-solid fa-bowl-food fa-3x"></i>
                       <h2 class="text-light h3 fw-lighter my-3">${arr[i].strIngredient}</h2>
                       <p class="text-muted">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                   </div>
                </div>
        `
  }
  rowData.innerHTML = cartoona;
}

async function getCategoriesMeals(categorie){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
    responce = await responce.json()
    displayMeals(responce.meals.slice(0,20))
}

async function getAreaMeals(area){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    responce = await responce.json()
    displayMeals(responce.meals.slice(0,20))
}

async function getIngredientsMeals(ingredient){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    responce = await responce.json()
    displayMeals(responce.meals.slice(0,20))
}

async function getMealDetails(mealId) {
    responce = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    responce = await responce.json()
    displayMealDetails(responce.meals[0])
}
function displayMealDetails(meal){
    searchContainer.innerHTML = ''
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="btn btn-light p-1 m-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    } 

    let tags = meal.strTags?.split(',')
    if(!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="btn btn-info p-1 m-2">${tags[i]}</li>`
    } 


    let cartoona =`<div class="col-md-4">
    <img src="${meal.strMealThumb}" class="img-fluid" alt=""/>
    <h2 class="text-white mt-3" >${meal.strMeal}</h2>
  </div>
  <div class="col-md-8 text-white">
    <h3>Instructions</h3>
    <p class="text-white">${meal.strInstructions}</p>
    <h5>Area : <span class="fw-lighter">${meal.strArea}</span></h5>
    <h5>Category : <span class="fw-lighter">${meal.strCategory}</span></h5>

    <h4>Recipes : </h4>
    <ul class="list-unstyled d-flex flex-wrap">
        ${ingredients}
    </ul>
    <h4>Tags : </h4>
    <ul class="list-unstyled d-flex flex-wrap">
        ${tagsStr}
    </ul>

    <a target = "-blank" href="${meal.strSource}" class="btn btn-success">Source</a>
    <a target = "-blank" href="${meal.strYoutube}" class="btn btn-danger">Youtub</a>
  </div>`

  rowData.innerHTML = cartoona;
}

function showSearchInputs(){
    searchContainer.innerHTML = `<div class="row g-5">
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)" maxlength="1" type="text" class="form-control bg-transparent text-white" placeholder="Search By First Letter...">
    </div>
</div>`

rowData.innerHTML = ''
}


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center">
    <div class="container w-75 text-center">
        <h2 class="text-white mb-5">ContacUs...</h2>
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control bg-transparent text-white" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control bg-transparent text-white " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control bg-transparent text-white " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control bg-transparent text-white " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control bg-transparent text-white " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control bg-transparent text-white " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
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