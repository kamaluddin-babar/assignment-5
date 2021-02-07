const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
    const foodName = document.getElementById("food-input").value;

    loadData(foodName[0]);

    document.getElementById("food-details-container").style.display = "none";
});


function loadData(firstChar) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstChar}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // console.log(typeof (data));
            displayData(data);
        })
        .catch((error) => {
            //console.error("got fucked");
            const errorMessage = document.getElementById("error-message");
            errorMessage.innerHTML = "<h3>Sorry,there is no such record found.</h3>";
            const foodContainer = document.getElementById("food-container");
            foodContainer.innerHTML = "";
          });
}
function displayData(foodList) {
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = "";
    
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";

    foodList.meals.forEach(food => {
        //console.log(food.strMeal, food.strMealThumb);
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
            // console.log("single food is clicked");
            displayFoodDetails(`${food.strMeal}`);
        });
    });
}

function displayFoodDetails(foodName) {
    //console.log(foodName);
    const foodDetailContainer = document.getElementById("food-details-container");
    foodDetailContainer.style.display = "block";
    foodDetailContainer.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(food => {
            const url = food.meals[0].strMealThumb;
            const name = food.meals[0].strMeal;
            const ingredient1 = food.meals[0].strMeasure1 + " " + food.meals[0].strIngredient1;
            const ingredient2 = food.meals[0].strMeasure2 + " " + food.meals[0].strIngredient2;
            const ingredient3 = food.meals[0].strMeasure3 + " " + food.meals[0].strIngredient3;
            const ingredient4 = food.meals[0].strMeasure4 + " " + food.meals[0].strIngredient4;
            const ingredient5 = food.meals[0].strMeasure5 + " " + food.meals[0].strIngredient5;
            // console.log(name, url, ingredient1,ingredient2,ingredient3,ingredient4,ingredient5);

            const foodDetailDiv = document.createElement("div");
            const foodInfo = `
                <div class="card" style="width: 100%; border: none";">
                    <img src="${url}" class="card-img-top p-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6><b>Ingredients</b></h6>
                    </div>
                    <ul class="list-group list-group-flush mt-0 mb-0 pt-0 pb-0">
                        <li class="list-group-item mt-0 pt-0" style="border: none";>${ingredient1}</li>
                        <li class="list-group-item mt-0 pt-0" style="border: none";>${ingredient2}</li>
                        <li class="list-group-item mt-0 pt-0" style="border: none";>${ingredient3}</li>
                        <li class="list-group-item mt-0 pt-0" style="border: none";>${ingredient4}</li>
                        <li class="list-group-item mt-0 pt-0" style="border: none";>${ingredient5}</li>
                    </ul>
                </div>
                `;
            foodDetailDiv.innerHTML = foodInfo;
            foodDetailContainer.appendChild(foodDetailDiv);
        })
}