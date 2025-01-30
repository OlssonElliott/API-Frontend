import { fetchAllCategories, fetchRandomMeal, filterMealsByCategory } from "./mealApiFetch.mjs";
import { currentMealId } from "./script.mjs";
import { addMeal, deleteMeal, fetchMeals, findMeal, favoriteMeal } from "./backendApiFetch.mjs";

const generate = document.getElementById("generate");
const save = document.getElementById("save");
const mealCheckbox = document.getElementById("mealCheckbox");
const category = document.getElementById("category");


let isMealSaved = false; //måste finnas för att säkerställa så fetchMeals hinner köras innan saveOrDeleteButton körs, error annars.

//Favoritmåltid-------------------------------------------------------------------
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

//-------------------------------------------------------------------
//Generera ny måltid-------------------------------------------------

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

//-------------------------------------------------------------------
//Funktioner till knapp för att spara eller ta bort recept-----------

// Spara eller ta bort recept från databas med knapp, kontrollerar om receptet redan är sparat
export function saveOrDeleteButton(){ 
    save.addEventListener("click", () =>{
        adjustButtonIfSaved(true);
    });
}

//-------------------------------------------------------------------
//Sök efter recept---------------------------------------------------

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
                        if (mealCheckbox.checked){
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
//-------------------------------------------------------------------
// Sortera recept efter kategori-------------------------------------
export function fillCategoryFromApi() {
    fetchAllCategories()
    .then((data) => {
        if (data.categories) {
            category.innerHTML = `<option value="">Sortera efter kategori</option>`;
            data.categories.forEach((cat) => {
                const option = document.createElement("option");
                option.value = cat.strCategory;
                option.textContent = cat.strCategory;
                category.appendChild(option);
            });
        }
    });
}

export function categoryFilter(){
    category.addEventListener("change", () => {
        filterMealsByCategory(category.value);
    });
}

//-------------------------------------------------------------------
// Ny ruta för att visa sparade recept-------------------------------
// Referenslänk till hur jag gjorde modal: https://www.w3schools.com/howto/howto_css_modals.asp
export function showModal(){

    const savedModalBtn = document.getElementById("savedModalBtn");
    const myModal = document.getElementById("myModal");
    const close = document.getElementById("close");
    const savedMeals = document.getElementById("savedMeals");

        savedModalBtn.onclick = function() {
            myModal.style.display = "block";
          }
        
          close.onclick = function() {
            myModal.style.display = "none";
          }
        
          myModal.onclick = function(event) {
            if (event.target == myModal) {
              myModal.style.display = "none";
            }
          }

        }

        export function printSavedMeals(){
          fetchMeals()
          .then((meals) => {
              savedMeals.innerHTML = "";
              meals.forEach((meal) => {
                  const mealDiv = document.createElement("div");
                  mealDiv.className = "meal";
                  mealDiv.innerHTML = `<h3>${meal.id}</h3>
                   <a href="${meal.source}" target="_blank">${meal.source}</a>
                  <p>${meal.comment}</p>
                  <button class="deleteBtn" data-id="${meal.id}">Ta bort</button>`;
                  savedMeals.appendChild(mealDiv);
              });
          });
        }





