import { addMeal, deleteMeal, favoriteMeal, fetchMeals, findMeal } from "./backendApiFetch.mjs";
import {fetchAllCategories, fetchMealById, fetchRandomMeal, filterMealsByCategory, filterMealsByFirstLetter} from "./mealApiFetch.mjs";
import{ insertMealDetails } from "./displayMeal.mjs";
import { generateRecipeButton, saveOrDeleteButton} from "./buttonFunctions.mjs";

//Funktion/Objekt för globalt värde för nuvarande meal.
export const currentMealId = {
 id: null,
 source: null,
 comment: null,
 favorite: null
};



//display meal
fetchRandomMeal();
generateRecipeButton();
saveOrDeleteButton();



//frontend, meal-api anrop:
//fetchRandomMeal();
//fetchMealById(52937);
//filterMealsByFirstLetter("a");
//filterMealsByCategory("Beef");
//fetchAllCategories();


//Backend
//fetchMeals();
//findMeal(1);f
//alla funktioner nedan fungerar, disabled för att slippa ändra saker varje gång jag ändrar sidan.

//addMeal(6, "frontendtest", "frontendtest", "false");
//deleteMeal(6);
//favoriteMeal(1);

