console.log("meals importerad korrekt");

export function fetchMeals(){
    fetch("http://localhost:8080/meals")
    .then(res => res.json())
    .then(data => console.log(data));
}

export function findMeal(id){
    fetch("http://localhost:8080/find-meal")
    .then(res => res.json())
    .then(data => console.log(data));
}

export function addMeal(){
    fetch("http://localhost:8080/add-meal")
    .then(res => res.json())
    .then(data => console.log(data));
}

export function deleteMeal(){
    fetch("http://localhost:8080/delete-meal")
    .then(res => res.json())
    .then(data => console.log(data));
}

export function favoriteMeal(){
    fetch("http://localhost:8080/favorite")
    .then(res => res.json())
    .then(data => console.log(data));
}