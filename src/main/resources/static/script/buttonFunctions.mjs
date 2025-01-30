import { fetchRandomMeal } from "./mealApiFetch.mjs";
import { currentMealId } from "./script.mjs";
import { addMeal, deleteMeal, fetchMeals, findMeal, favoriteMeal } from "./backendApiFetch.mjs";

const generate = document.getElementById("generate");
const save = document.getElementById("save");
const mealCheckbox = document.getElementById("mealCheckbox");
const category = document.getElementById("category");
const letterInput = document.getElementById("letterInput");



let isMealSaved = false; //måste finnas för att säkerställa så fetchMeals hinner köras innan saveOrDeleteButton körs, error annars.

//Favoritmåltid kontroll
function isMealFavorite(){
        if (isMealSaved){
           findMeal(currentMealId.id)
           .then((testMeal) => {
           if (testMeal.favorite){
                mealCheckbox.checked = true;
              }
            else {
            mealCheckbox.checked = false;
            }
        });
    }
}

//favoritmåltid klick på knapp
export function favoriteMealCheckbox(){
    isMealFavorite();
    mealCheckbox.addEventListener("change", () => {
        fetchMeals()
        .then((meals) => {    
            const testId = meals.some(meal => String(meal.id) === String(currentMealId.id)); //.some är en for-each som testar alla element i en array: https://www.w3schools.com/jsref/jsref_some.asp 
            isMealSaved = testId;  

            if (isMealSaved === true){
                favoriteMeal(currentMealId.id)
                .then(() => {
                    isMealFavorite();
                });
            }
        });

    });
}

// Generera nytt recept med knapp
export function generateRecipeButton(){
    generate.addEventListener("click", () =>{
        mealCheckbox.checked = false;
        fetchRandomMeal()
        .then(() => {
            adjustButtonIfSaved(false);
            isMealFavorite();
        });
    });
}

// Spara eller ta bort recept från databas med knapp, kontrollerar om receptet redan är sparat
export function saveOrDeleteButton(){ 
    save.addEventListener("click", () =>{
        adjustButtonIfSaved(true);
    });
}

// Kontrollera ifall recept är sparat och ändra spara knapp

function adjustButtonIfSaved(withAddAndDelete){
    fetchMeals()
    .then((meals) => {    
        const testId = meals.some(meal => String(meal.id) === String(currentMealId.id)); //.some är en for-each som testar alla element i en array: https://www.w3schools.com/jsref/jsref_some.asp 
        isMealSaved = testId;   
        save.innerHTML = isMealSaved ? "Ta bort recept" : "Spara recept";
        if (withAddAndDelete){ //om man trycker på spara knapp
            if (!isMealSaved) {
                addMeal(currentMealId.id, currentMealId.source, "", false)
                    .then(() => {                    
                        save.innerHTML = "Ta bort recept";
                        isMealSaved = true;
                        console.log(currentMealId.id + " id sparat");
                        if (mealCheckbox.checked === true){
                            favoriteMeal(currentMealId.id)
                            .then(() => {
                                isMealFavorite();
                            });
                        }
                    });
            } else {
                deleteMeal(currentMealId.id)
                .then(() => {                
                    save.innerHTML = "Spara recept";
                    isMealSaved = false;
                    console.log(currentMealId.id + " id borttaget");
                    
                })
            }
        }
    })
}


