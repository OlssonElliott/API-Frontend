console.log("meals importerad korrekt");

export function fetchMeals(){
    fetch("http://localhost:8080/meals")
    .then(res => res.json())
    .then(data => console.log(data));
}

export function findMeal(id){
fetch(`http://localhost:8080/find-meal?id=${id}`, {
        method: "GET",
        headers: {
        "Content-type": "application/json"
        },
    })
    .then(res => res.json())
    .then(data => console.log(data));
    console.log("Här är id:t jag sökte på:");
    
}

export function addMeal(id, source, comment, favorite){
    fetch("http://localhost:8080/add-meal", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            source: source,
            comment: comment,
            favorite: favorite
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.text())
    .then(data => console.log(data));
}

export function deleteMeal(id){
    fetch(`http://localhost:8080/delete-meal?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.text())
    .then(data => console.log(data));
}

export function favoriteMeal(id){
    fetch(`http://localhost:8080/favorite?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.text())
    .then(data => console.log(data));
}