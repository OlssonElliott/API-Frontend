import { fetchAllCategories, fetchRandomMeal, filterMealsByCategory } from "./mealApiFetch.mjs";
import { currentMealId } from "./script.mjs";
import { addMeal, deleteMeal, fetchMeals, findMeal, favoriteMeal, addComment } from "./backendApiFetch.mjs";

const generate = document.getElementById("generate");
const save = document.getElementById("save");
const mealCheckbox = document.getElementById("mealCheckbox");
const category = document.getElementById("category");
const commentField = document.getElementById("commentField");
const commentBtn = document.getElementById("commentBtn");

export let isMealSaved = false; //måste finnas för att säkerställa så fetchMeals hinner köras innan saveOrDeleteButton körs, error annars.

//Favoritmåltid kontroll
function isMealFavorite(){
        if (isMealSaved){
           findMeal(currentMealId.id)
           .then((testMeal) => {
           if (testMeal && typeof testMeal.favorite !== 'undefined'){
                mealCheckbox.checked = true;
              } else {
            mealCheckbox.checked = false;
            }
        })
    } else {(mealCheckbox.checked = false);}
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
        .then((newMeal) => {
            currentMealId.id = newMeal.idMeal; //idMeal är från API, id är från databasen. 2 timmars glädje innan jag såg detta.
            return adjustButtonIfSaved(false);
        })
        .then(() => {
            isMealFavorite();
        })
        .then(() => {        
            commentFunction();
        });
    });
}

// Spara eller ta bort recept från databas med knapp, kontrollerar om receptet redan är sparat
export function saveOrDeleteButton(){ 
    save.addEventListener("click", () =>{
        adjustButtonIfSaved(true);
    });
}

// Kontrollerar ifall recept är sparat och ändra spara knapp
function adjustButtonIfSaved(withAddAndDelete){
    return fetchMeals()
    .then((meals) => {    
        const testId = meals.some(meal => String(meal.id) === String(currentMealId.id)); //.some är en for-each som testar alla element i en array: https://www.w3schools.com/jsref/jsref_some.asp 
        isMealSaved = testId;   
        save.innerHTML = isMealSaved ? "Ta bort recept" : "Spara recept";
        if (withAddAndDelete){ //om man trycker på spara knapp
            if (!isMealSaved) {
                commentField.disabled = false;
                return addMeal(currentMealId.id, currentMealId.source, "", false)
                    .then(() => {                    
                        save.innerHTML = "Ta bort recept";
                        isMealSaved = true;
                        console.log(currentMealId.id + " id sparat");
                        if (mealCheckbox.checked){
                            return favoriteMeal(currentMealId.id)
                             .then(() => {
                                isMealFavorite();
                            });
                        }
                    });
            } else {
                return deleteMeal(currentMealId.id)
                .then(() => {                
                    save.innerHTML = "Spara recept";
                    const commentField = document.getElementById("commentField");
                    commentField.value = ""; commentField.disabled = true;
                });
            }
        }
    })
}

// Kontrollerar ifall recept är sparat och togglar kommentarsfältet
export function commentFunction(){
    commentField.value = "";
    if (!isMealSaved){
        commentField.disabled = true;
    } else {
        commentField.disabled = false;
    }
}

// Knappfunktion, Lägg till kommentar från kommentarsfältet till recept 
export function commentButton(){
    commentBtn.addEventListener("click", () => {
       if (isMealSaved){
           commentField.disabled = false;
           currentMealId.comment = commentField.value;
           addComment(currentMealId.id, currentMealId.comment)
       }
   });
}

// Sortera recept efter kategori-------------------------------------PÅBÖRJAD, MEN EJ KLAR
// export function fillCategoryFromApi() {
//     fetchAllCategories()
//     .then((data) => {
//         if (data.categories) {
//             category.innerHTML = `<option value="">Sortera efter kategori</option>`;
//             data.categories.forEach((cat) => {
//                 const option = document.createElement("option");
//                 option.value = cat.strCategory;
//                 option.textContent = cat.strCategory;
//                 category.appendChild(option);
//             });
//         }
//     });
// }
// export function categoryFilter(){
//     category.addEventListener("change", () => {
//         filterMealsByCategory(category.value);
//     });
// }