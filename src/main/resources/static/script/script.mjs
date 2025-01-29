import { addMeal, deleteMeal, favoriteMeal, fetchMeals, findMeal } from "./backendApiFetch.mjs";
import {fetchAllCategories, fetchMealById, fetchRandomMeal, filterMealsByCategory, filterMealsByFirstLetter} from "./mealApiFetch.mjs";

//frontend, meal-api anrop:
fetchRandomMeal();
fetchMealById(52937);
filterMealsByFirstLetter("a");
filterMealsByCategory("Beef");
fetchAllCategories();


//Backend
fetchMeals();
findMeal(1);
//alla funktioner nedan fungerar, disabled för att slippa ändra saker varje gång jag ändrar sidan.

//addMeal(6, "frontendtest", "frontendtest", "false");
//deleteMeal(6);
//favoriteMeal(1);

