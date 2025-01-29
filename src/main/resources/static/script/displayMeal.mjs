const currentTitle = document.getElementById("currentTitle");
const currentCategory = document.getElementById("currentCategory");
const currentMealImg = document.getElementById("currentMealImg");
const currentIngredients = document.getElementById("currentIngredients");


//hämtar meal data, loopar igenom all data och skriv ut på html.
export function insertMealDetails(meal){
    currentTitle.textContent = meal.strMeal;
    currentCategory.textContent += " " + meal.strCategory;
    currentMealImg.src = meal.strMealThumb;

    for (let i = 1; i <=20; i++){
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]

        if (ingredient !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = `${measure} ${ingredient}`;
            currentIngredients.appendChild(listItem);
        }
    }
    
    
    
}