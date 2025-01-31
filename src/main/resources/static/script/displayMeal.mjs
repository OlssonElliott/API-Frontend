const currentTitle = document.getElementById("currentTitle");
const currentCategory = document.getElementById("currentCategory");
const currentMealImg = document.getElementById("currentMealImg");
const currentIngredients = document.getElementById("currentIngredients");
const currentInstructions = document.getElementById("currentInstructions");

//hämtar meal data, loopar igenom all data och skriv ut på html, funktionen körs direkt i mealApiFetch.mjs istället för script.mjs
export function insertMealDetails(meal){
    currentIngredients.innerHTML = ""; //uppdaterar inte listan om jag inte sätter det till "" först.
    currentTitle.innerHTML = "";
    currentCategory.innerHTML = "";
    currentInstructions.innerHTML = "";

    currentTitle.textContent = meal.strMeal;
    currentCategory.textContent += " " + meal.strCategory;
    currentMealImg.src = meal.strMealThumb;
    currentInstructions.textContent = meal.strInstructions;

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