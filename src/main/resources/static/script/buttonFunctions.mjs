import { fetchAllCategories, fetchRandomMeal, filterMealsByCategory } from "./mealApiFetch.mjs";
import { currentMealId } from "./script.mjs";
import { addMeal, deleteMeal, fetchMeals, findMeal, favoriteMeal, addComment } from "./backendApiFetch.mjs";

const generate = document.getElementById("generate");
const save = document.getElementById("save");
const mealCheckbox = document.getElementById("mealCheckbox");
const category = document.getElementById("category");
const commentField = document.getElementById("commentField");
const commentBtn = document.getElementById("commentBtn");


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
            commentFunction();
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
                commentField.disabled = false;
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
// Modal funktioner (Ny ruta för att visa sparade recept)------------
// Referenslänk till hur jag började göra modal: https://www.w3schools.com/howto/howto_css_modals.asp
const savedMeals = document.getElementById("savedMeals");
export function showModal(){

    const savedModalBtn = document.getElementById("savedModalBtn");
    const myModal = document.getElementById("myModal");
    const close = document.getElementById("close");
    

        savedModalBtn.onclick = function() {
            myModal.style.display = "block";
            printSavedMeals();
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

        //funktion för att skriva ut sparade måltider i modal
        export function printSavedMeals(){
          fetchMeals()
          .then((meals) => {
              savedMeals.innerHTML = "";
              meals.forEach((meal) => {
                  const mealDiv = document.createElement("div");
                  mealDiv.className = "meal";
                  mealDiv.innerHTML = 
                    `<h3>ID: ${meal.id}</h3>
                    <h3>Favorit: ${meal.favorite}</h3>
                    <a href="${meal.source}" target="_blank">${meal.source}</a>
                    <p class="meal-comment">${meal.comment}</p>
                    <button class="editCommentBtn" data-id="${meal.id}">Redigera kommentar</button>
                    <textarea class="editCommentField" data-id="${meal.id}" style="display:none;">${meal.comment}</textarea>
                    <button class="saveCommentBtn" data-id="${meal.id}" style="display:none;">Spara Kommentar</button>

                    <button class="favoriteBtn" data-id="${meal.id}">
                    ${meal.favorite ? "Ta bort som favorit" : "Gör till favorit"} 
                    </button>

                    <button class="deleteBtn" data-id="${meal.id}">Ta bort</button>`;
                  savedMeals.appendChild(mealDiv);
              });
              deleteMealButton();
              editComment();
              saveComment();
              addFavoriteButtonListeners();
          });
        }

        function deleteMealButton(){
            const deleteButtons = document.querySelectorAll(".deleteBtn");
            deleteButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    deleteMeal(btn.dataset.id)
                    .then(() => {
                        printSavedMeals();
                    });
                });
            });
        }

        function addFavoriteButtonListeners(){
            const favoriteButtons = document.querySelectorAll(".favoriteBtn");
            favoriteButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const mealId = btn.dataset.id;
                    favoriteMeal(mealId)
                        .then(() => {
                            printSavedMeals(); // Uppdatera listan efter ändring
                        })
                        .catch((error) => {
                            console.error("Fel vid uppdatering av favorit:", error);
                        });
                });
            });
        }
        
        
        //Funktion för att kunna redigera kommentar i modal
        function editComment(){
            const editCommentBtns = document.querySelectorAll(".editCommentBtn");
            editCommentBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const mealId = btn.dataset.id;
                    const mealDiv = btn.parentElement;
                    const commentP = mealDiv.querySelector(".meal-comment");
                    const editField = mealDiv.querySelector(".editCommentField");
                    const saveBtn = mealDiv.querySelector(".saveCommentBtn");
        
                    // Dölj kommentar och knapp
                    commentP.style.display = "none";
                    btn.style.display = "none";
        
                    // Visa textfält och spara knapp
                    editField.style.display = "block";
                    saveBtn.style.display = "inline-block";
                });
            });
        }

        function saveComment(){
            const saveCommentBtns = document.querySelectorAll(".saveCommentBtn");
            saveCommentBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const mealId = btn.dataset.id;
                    const mealDiv = btn.parentElement;
                    const editField = mealDiv.querySelector(".editCommentField");
                    const newComment = editField.value;
        
                    // Uppdatera kommentaren till databasen
                    addComment(mealId, newComment)
                        .then(() => {
                            // Uppdatera modal sidan med kommentar
                            printSavedMeals();
                        });
                });
            });
        }

//-------------------------------------------------------------------
// Kommentar funktion------------------------------------------------

export function commentFunction(){
    commentField.value = "";
    if (!isMealSaved){
        commentField.disabled = true;
    }

    commentBtn.addEventListener("click", () => {
        if (isMealSaved){
            commentField.disabled = false;
            currentMealId.comment = commentField.value;
            console.log(currentMealId.comment);
            addComment(currentMealId.id, currentMealId.comment)
        }
        
    });
}



