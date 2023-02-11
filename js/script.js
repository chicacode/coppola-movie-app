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
let genresList = []
let movieListCopy = [];

const dataMovie = {
  title: "",
  name: "",
  original_language: "",
  overview: "",
  poster_path: "",
  release_date: "",
  genre_ids: []
}

const data = {
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}


const generateUI = (array) => {
  // console.log("que hay aqui parseado", array)
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
  return array.map(({ title, name, original_language, overview, poster_path, release_date, genre_ids }) => {
    return {
      title: title || name,
      overview: overview || 0,
      original_language: original_language,
      poster_path: `https://image.tmdb.org/t/p/original/${poster_path}` || "https://via.placeholder.com/300",
      release_date: release_date || 0,
      genre_ids: genre_ids
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



document.addEventListener("DOMContentLoaded", () => {
  getMoviesData(TRENDING_URL);

  // fillSelectByYear();
  fillSelectByGenre(data);
})

const fillSelectByYear = (movieList) => {
  let years = movieList.map(a => {
    if (a.release_date != 0) {
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


const fillSelectByGenre = (genres) => {
  genres.genres.forEach(element => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.name;
    selectGenre.appendChild(option)
  });
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
  dataMovie.genre_ids.push(Number(e.target.value));
  console.log("dataMovie.genre_ids ADD EVENT LISTENER", dataMovie.genre_ids)
  filterByGenre(movieList);
})

// Filters

const FilterMovie = () => {
  const result = movieList.filter(filterByName).filter(filterByYear)
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



// TODO FIX this
// Me tocara hacer un fetch de genres
const filterByGenre = (movie) => {
  const { genre_ids } = dataMovie;
  const [newGender ] = genre_ids
  console.log(" newGender",  newGender)
  if (genre_ids) {
  //  console.log(" movie",  movie)
   let newArray = movie.filter(function (el)
 
   {
    console.log(" EL ",  el.genre_ids)
     return el.genre_ids.includes(newGender)
   }
   );
   console.log(" newArray", newArray);
  //  return movie.map(({ title, name, original_language, overview, poster_path, release_date, genre_ids }) => {

  //    return genresList.push({
  //       title: title,
  //       overview: overview || 0,
  //       original_language: original_language,
  //       poster_path: `https://image.tmdb.org/t/p/original/${poster_path}` || "https://via.placeholder.com/300",
  //       release_date: release_date || 0,
  //       genre_ids: genre_ids
  //     })})
// Estoy mejorando

  generateUI(newArray)
  //   }

  //   console.log("genresList", genresList)
}
return movie

  }

  // console.log("Number(genre_ids)",  Number(genre_ids))
  // console.log("Que es mo en filter",  mo.genre_ids.includes(Number(genre_ids)))