import { insertMealDetails } from "./displayMeal.mjs";
import { currentMealId } from "./script.mjs";

export function fetchRandomMeal(){
    return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
        insertMealDetails(data.meals[0]); //lägger data från random meal i insertMealDetails metoden (displayMeals.mjs)
        currentMealId.id = data.meals[0].idMeal;
        currentMealId.source = data.meals[0].strSource;
    });
}

export function fetchMealById(id){
   return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => console.log(data));
}

export function filterMealsByFirstLetter(firstLetter){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then(res => res.json())
    .then(data => console.log(data));
}

export function filterMealsByCategory(category){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => console.log(data));
}

export function fetchAllCategories(){
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => console.log(data));
}



