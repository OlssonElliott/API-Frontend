export function fetchMeals(){
    return fetch("http://localhost:8080/meals")
    .then(res => res.json())
}

export function findMeal(id){
return fetch(`http://localhost:8080/find-meal?id=${id}`, {
        method: "GET",
        headers: {
        "Content-type": "application/json"
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

export function addMeal(id, source, comment, favorite){
    return fetch("http://localhost:8080/add-meal", {
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
}

export function deleteMeal(id){
    return fetch(`http://localhost:8080/delete-meal?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res =>res.text());
}

export function favoriteMeal(id){
    return fetch(`http://localhost:8080/favorite?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.text())
    .then(data => console.log(data));
}

export function addComment(id, comment){
    return fetch(`http://localhost:8080/comment?id=${id}&comment=${comment}`, {
        method: "PUT",
    })
    .then(res => res.text())
    .then(data => console.log(data));
}

//behöver en funktion för att uppdatera kommentar
