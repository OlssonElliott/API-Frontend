import { fetchMeals, deleteMeal, favoriteMeal, addComment } from "./backendApiFetch.mjs";
import { commentFunction, saveOrDeleteButton, isMealSaved } from "./buttonFunctions.mjs";

// Modal funktioner. Referenslänk till hur jag började göra modal: https://www.w3schools.com/howto/howto_css_modals.asp
const savedMeals = document.getElementById("savedMeals");

//Funktion för att visa modal när man trycker på knapp enligt länk.
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
            mealDiv.innerHTML = //Denna html syntaxen tog jag hjälp av chatGPT för att få fram då det var väldigt krångligt.
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

//Funktion för att ta bort måltid från modal med knapp
function deleteMealButton(){
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            deleteMeal(btn.dataset.id)
            .then(() => {
                printSavedMeals();
                saveOrDeleteButton(true);
                commentFunction();
            });
        });
    });
}

//Funktion för att göra måltid till favorit med knapp i modal
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

//Funktion för att spara kommentar i modal
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