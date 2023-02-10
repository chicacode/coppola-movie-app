const APY_KEY = "939b31d73609c6b75cb2f11788ba538c";
const BASE_URL = "https://api.themoviedb.org/3";
const TRENDING_URL = BASE_URL + "/trending/all/day?api_key=" + APY_KEY;
const SEARCH_URL = BASE_URL + '/search/movie?' + 'api_key=' + APY_KEY;
const search = document.getElementById("search");

const searchKeyword = document.getElementById('search-input');
const selectYear = document.getElementById("select-year");
const selectGenre = document.getElementById("select-genre");
// /genre/movie/list

let movieList = [];

let movieListCopy = [];

const dataMovie = {
    title: "",
    name: "",
    original_language: "",
    overview: "",
    poster_path: "",
    release_date: ""
}

const generateUI = (array) => {
    let container = document.querySelector('.box-container');
    container.innerHTML = '';
    array.forEach(({ poster_path, title, original_language, overview, release_date }) => {

        let divContainer = document.createElement('div');
        let img = document.createElement('img');
        let name = document.createElement('h2');
        let description = document.createElement('p');
        let textContainer = document.createElement('div');
        let language = document.createElement('span');
        let date = document.createElement('span');

        img.src = poster_path;
        name.textContent = `Name: ${title}`;
        description.textContent = `Overview : ${overview}`
        language.textContent = `Language: ${original_language} `
        date.textContent = `Release date: ${release_date}`
        divContainer.appendChild(img);

        textContainer.appendChild(name);
        textContainer.appendChild(description);
        textContainer.appendChild(language);
        textContainer.appendChild(date);

        divContainer.appendChild(textContainer);

        container.appendChild(divContainer);

    })
}


const parseList = (array) => {
    return array.map(({ title, name, original_language, overview, poster_path, release_date  }) => {
        return {
            title: title || name,
            overview: overview || 0,
            original_language: original_language,
            poster_path: `https://image.tmdb.org/t/p/original/${poster_path}` || "https://via.placeholder.com/300",
            release_date: release_date || 0
        }
    })

}
const getMoviesData = async (url) => {
    const data = await fetch(url);
    const response = await data.json();
    movieList = parseList(response.results);
    generateUI(movieList);
    fillSelectByYear(movieList);
}



document.addEventListener("DOMContentLoaded", () =>{
    getMoviesData(TRENDING_URL);

    fillSelectByYear()
    
})

const fillSelectByYear = (movieList) =>{
    let years = movieList.map(a => {
        if(a.release_date != 0){
            return a.release_date;
        }
        return "2022-11-09";
        
    });

    for (let index = 0; index < years.length; index++) {
        const option = document.createElement("option");
        option.value = years[index];
        option.textContent = years[index];
        
        selectYear.appendChild(option);
    }
}

// Events:

searchKeyword.addEventListener("keyup", e => {
    dataMovie.title = e.target.value;
    dataMovie.name = e.target.value;
    FilterMovie();
})

selectYear.addEventListener("change", e => {
    dataMovie.release_date = e.target.value;
    FilterMovie();
})

selectGenre.addEventListener("change", e => {
    // dataMovie.release_date = e.target.value;
    // FilterMovie();
})

const FilterMovie = () => {
    const result = movieList.filter(filterByName).filter(filterByYear);
    console.log("result",result)
    return generateUI(result);
}

const filterByName = (movie) => {

    const { title } = dataMovie;
    if (title) {
        return movie.title.toLowerCase().includes(title);
    }
    return movie;
}

const filterByYear = (movie) => {

    const { release_date } = dataMovie;
    if (release_date) {
        return movie.release_date === release_date;
    }
    return movie;
}
