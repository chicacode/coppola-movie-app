const APY_KEY = "939b31d73609c6b75cb2f11788ba538c";
const BASE_URL = "https://api.themoviedb.org/3";
const TRENDING_URL = BASE_URL + "/trending/all/day?api_key=" + APY_KEY;
const SEARCH_URL = BASE_URL + '/search/movie?' + 'api_key=' + APY_KEY;
const search = document.getElementById("search");

// /genre/movie/list

let movieList = [];

let movieListCopy = [];
// let inputValue = document.querySelector("#search-input");
// console.log(inputValue.value)

const generateUI = (array) => {
    let container = document.querySelector('.box-container');
    container.innerHTML = "";
    console.log("que pasa aqui", array)
    array.forEach(({ poster_path, title, original_language, overview }) => {
        // Create an external div-container
        let divContainer = document.createElement('div');
        let img = document.createElement('img');
        let name = document.createElement('h2');
        let description = document.createElement('p');
        let textContainer = document.createElement('div');
        let language = document.createElement('span');

        img.src = poster_path;
        name.textContent = `Name: ${title}`;
        description.textContent = `Overview : ${overview}`
        language.textContent = `Language: ${original_language} `

        divContainer.appendChild(img);

        textContainer.appendChild(name);
        textContainer.appendChild(description);
        textContainer.appendChild(language);

        divContainer.appendChild(textContainer);

        container.appendChild(divContainer);

    })
}


const parseList = (array) => {

    return array.map(({ title, name, original_language, overview, poster_path }) => {
        return {
            title: title || name,
            overview: overview || 0,
            original_language: original_language,
            poster_path: `https://image.tmdb.org/t/p/original/${poster_path}` || "https://via.placeholder.com/300"
        }
    })

}
const getMoviesData = async (url) => {
    const data = await fetch(url);
    const response = await data.json();
    movieList = parseList(response.results);

    generateUI(movieList);
}

getMoviesData(TRENDING_URL);

const searchMovie = () => {

    let searchKeyword = document.getElementById('search-input');

    console.log("movieList 1", movieList);

    let moviesFiltered = movieList.filter((movie) => {

        if (movie.title.includes(searchKeyword.value)) {
            // console.log(" entra en true", movie.title)
            // return true;
            return movie.title
        }
    }) 

    movieList = moviesFiltered;
    console.log("que retorna moviesFiltered??? ", moviesFiltered)
    console.log("que retorna filter??? ", movieList)
    generateUI(movieList);

}

