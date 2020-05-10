let apikey = "&apikey=a775aef2";
let titles = ["Game of Thrones", "Lost", "Breaking Bad", "Sense8", "Modern Family", "Boris", "Suits", "The Simpsons", "Futurama", "Vikings", "Titans", "Bojack Horseman", "Marseille", "Peaky Blinders", "Hunters", "NCIS", "CSI", "Dark", "Cobra 11", "Scrubs"];

let cardContanier = document.querySelector("#div-card");




function searchTitle() {

    let seriesContanier = document.querySelector("#series");
    seriesContanier.innerHTML = "";
    let bar = document.getElementById('bar').value
    var flag = false;
    titles.forEach(title => {
        if (title.toLowerCase() == bar.toLowerCase()) {
            loadTitles(bar).then(x => loadCards(x, seriesContanier));
            flag = true;
        }
    })



}

function checkVoid() {

    let bar = document.getElementById('bar').value

    if (bar == '') {
        loadInformation()
    }

}

function prevent(e)

{
    var form = document.getElementById("form");

    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);

}





async function loadTitles(titleId) {
    //get the serie for the given title
    let response = await fetch("http://www.omdbapi.com/?t=" + titleId + apikey);

    //transforms them into a javascript object
    let titleInfo = await response.json();
    //returns just the title inside of the data array
    return titleInfo;
}



async function loadInformation() {


    let seriesContanier = document.querySelector("#series");
    seriesContanier.innerHTML = "";

    titles.forEach(title => {



        loadTitles(title).then(tit => loadCards(tit, seriesContanier));



    })


}

function selected(id_poster) {
    sessionStorage.setItem("nome", id_poster)
}


async function loadCards(tit, seriesContanier) {


    seriesContanier.innerHTML += `<a href="plot.html" target="_blank"><img id= poster src = ${tit.Poster} alt = ${tit.Title} onclick="selected(this.alt)"><a>`;




}





function loadPlot() {
    var serie = sessionStorage.getItem("nome")
    cardContanier.innerHTML = ""
    loadTitles(serie).then(x => createCard(x))




}

function createCard(tit) {
    cardContanier.innerHTML += ` <div id="card-title"> <p> ${tit.Title} </div>
    <div id="card-poster"> <img src= ${tit.Poster}> </div>
    <div id="card-plot"><p> ${tit.Plot} </div>
    <div id="card-information"> <p> Imdb Rating: ${tit.imdbRating}<p>
    <p>Imdb Vote: ${tit.imdbVotes}
    <p>Seasons: ${tit.totalSeasons}`
}