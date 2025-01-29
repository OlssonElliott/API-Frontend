import { fetchRandomMeal } from "./mealApiFetch.mjs";
import { currentMealId } from "./script.mjs";
import { addMeal, fetchMeals } from "./backendApiFetch.mjs";

const generate = document.getElementById("generate");
const save = document.getElementById("save");
const mealCheckbox = document.getElementById("mealCheckbox");
const category = document.getElementById("category");
const letterInput = document.getElementById("letterInput");



export function generateRecipyButton(){
    generate.addEventListener("click", () =>{
        save.disabled = false;
        fetchRandomMeal();
    })
}

// Funktion som testar ifall id finns sparat redan, om id:t finns så görs spara knappen ocklickbar.
export function saveRecipyButton(){ 
    save.addEventListener("click", () =>{
        fetchMeals()
        .then(meals => {
            const testId = meals.some(meal => meal.id === currentMealId.id); //.some är en for-each som testar alla element i en array: https://www.w3schools.com/jsref/jsref_some.asp

            if (testId) {
                save.disabled = true;
            } else {
                addMeal(currentMealId.id, currentMealId.source, "", false);
                console.log("Recept sparat i databas!");
                save.disabled = true;
            }
        });   
    });
}
