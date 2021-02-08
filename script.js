// adding event listener to search button.
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
    const foodName = document.getElementById("food-input").value;
    loadData(foodName[0]);
    document.getElementById("food-details-container").style.display = "none";
});

// load food data from mealdb api that matches with first character of food name.
function loadData(firstChar) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstChar}`)
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch((error) => {
            showErrorMessage();
        });
}

// display all foods that matches with query.
function displayData(foodList) {
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = "";

    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";

    foodList.meals.forEach(food => {
        const singleFoodDiv = document.createElement("div");
        singleFoodDiv.className = "col";
        const foodInfo = `
            <div class="card pointer">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title food-name">${food.strMeal}</h5>
                </div>
            </div>
        `;
        singleFoodDiv.innerHTML = foodInfo;
        foodContainer.appendChild(singleFoodDiv);
        singleFoodDiv.addEventListener("click", function () {
            displayFoodDetails(`${food.idMeal}`);
        });
    });
}

// this function load details information about a food from food list using mealdb api and parameter is idMeal.
function displayFoodDetails(foodId) {
    const foodDetailContainer = document.getElementById("food-details-container");
    foodDetailContainer.style.display = "block";
    foodDetailContainer.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(response => response.json())
        .then(food => foodIngredientInfo(food.meals))
        .catch(error => {
            showErrorMessage();
        })
}

// this function displays details information of a food.
function foodIngredientInfo(foodInfo) {
    console.log(foodInfo);
    const foodDetailContainer = document.getElementById("food-details-container");
    foodInfo.forEach(food => {
        const url = food.strMealThumb;
        const name = food.strMeal;
        const ingredient1 = food.strMeasure1 + " " + food.strIngredient1;
        const ingredient2 = food.strMeasure2 + " " + food.strIngredient2;
        const ingredient3 = food.strMeasure3 + " " + food.strIngredient3;
        const ingredient4 = food.strMeasure4 + " " + food.strIngredient4;
        const ingredient5 = food.strMeasure5 + " " + food.strIngredient5;
        const foodDetailDiv = document.createElement("div");
        const foodInfo = `
        <div class="card" style="width: 100%; border: none";">
            <img src="${url}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6><b>Ingredients</b></h6>
            </div>
            <ul class="list-group list-group-flush mt-0 mb-0 pt-0 pb-0">
                <li class="list-group-item mt-0 pt-0" style="border: none";><i class="fas fa-check-circle list-color"></i> ${ingredient1}</li>
                <li class="list-group-item mt-0 pt-0" style="border: none";><i class="fas fa-check-circle list-color"></i> ${ingredient2}</li>
                <li class="list-group-item mt-0 pt-0" style="border: none";><i class="fas fa-check-circle list-color"></i> ${ingredient3}</li>
                <li class="list-group-item mt-0 pt-0" style="border: none";><i class="fas fa-check-circle list-color"></i> ${ingredient4}</li>
                <li class="list-group-item mt-0 pt-0" style="border: none";><i class="fas fa-check-circle list-color"></i> ${ingredient5}</li>
            </ul>
        </div>
        `;
        foodDetailDiv.innerHTML = foodInfo;
        foodDetailContainer.appendChild(foodDetailDiv);
    });
}

// this function display error message when any error occur during loading data from mealdb api
function showErrorMessage() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "<h3 class='text-danger'>Sorry,there is no such record found.</h3>";
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = "";
}