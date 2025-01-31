import {fetchRandomMeal} from "./mealApiFetch.mjs";
import { generateRecipeButton, saveOrDeleteButton, favoriteMealCheckbox, commentFunction, commentButton  } from "./buttonFunctions.mjs";
import { showModal, printSavedMeals  } from "./modalFunctions.mjs";

//Globalt objekt som innehåller värde för nuvarande meal. Alla variabler används inte i alla funktion men finns om dem skulle behövas i framtiden.
export var currentMealId = {
 id: null,
 source: null,
 comment: null,
 favorite: null,
 instructions: null
};



//DOMContentLoaded körs när hela sidan har laddats klart, fick buggar med att det inta laddats klart utan.
document.addEventListener("DOMContentLoaded", () => {
    fetchRandomMeal();
    generateRecipeButton();
    saveOrDeleteButton();
    favoriteMealCheckbox();
    showModal();
    printSavedMeals();
    commentFunction();
    commentButton();
});