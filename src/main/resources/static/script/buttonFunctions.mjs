import { fetchRandomMeal } from "./mealApiFetch.mjs";
import { currentMealId } from "./script.mjs";
import { addMeal, deleteMeal, fetchMeals } from "./backendApiFetch.mjs";

const generate = document.getElementById("generate");
const save = document.getElementById("save");
const mealCheckbox = document.getElementById("mealCheckbox");
const category = document.getElementById("category");
const letterInput = document.getElementById("letterInput");


// Generera nytt recept med knapp
export function generateRecipeButton(){
    generate.addEventListener("click", () =>{
        fetchRandomMeal()
        .then(() => {
            adjustButtonIfSaved(false);
        });
    });
}

// Spara eller ta bort recept från databas med knapp, kontrollerar om receptet redan är sparat
export function saveOrDeleteButton(){ 
    save.addEventListener("click", () =>{
        adjustButtonIfSaved(true);
    });
}

// Kontrollera och ändra spara knapp
let isMealSaved = false; //måste finnas för att säkerställa så fetchMeals hinner köras innan saveOrDeleteButton körs, error annars.
function adjustButtonIfSaved(withAddAndDelete){
    fetchMeals()
    .then((meals) => {    
        const testId = meals.some(meal => meal.id === currentMealId.id); //.some är en for-each som testar alla element i en array: https://www.w3schools.com/jsref/jsref_some.asp 
        isMealSaved = testId;   
        save.innerHTML = isMealSaved ? "Ta bort recept" : "Spara recept";
        
        if (withAddAndDelete){ //om man trycker på save/delete knappen. (texten blir fel när man trycker på nytt recept utan detta)
            if (!isMealSaved) {
                addMeal(currentMealId.id, currentMealId.source, "", false)
                    .then(() => {                    
                        save.innerHTML = "Ta bort recept";
                        isMealSaved = true;
                    })

            } else {
                deleteMeal(currentMealId.id)
                .then(() => {                
                    save.innerHTML = "Spara recept";
                    isMealSaved = false;
                })
            }
        }
    })
}


