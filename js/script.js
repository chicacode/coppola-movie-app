const APY_KEY = "939b31d73609c6b75cb2f11788ba538c";

let modifiedArray = [];


const generateUI = (array) => {
    let container = document.querySelector('.box-container');
    array.forEach(({ poster_path, title, original_language,  overview }) => {
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

   return  array.map(({ title, name, original_language,  overview, poster_path}) => {
       return {
           title: title || name,
           overview: overview || 0,
           original_language: original_language,
           poster_path: `https://image.tmdb.org/t/p/original/${poster_path}` || "https://via.placeholder.com/300"
       }
   })
}
const getMoviesData = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${APY_KEY}`);
    const response = await data.json(); // Parse the data to JSON

    console.log("Response:", response.results);

    let modifiedArray = parseList(response.results);

    // Generate UI on the basis of modifiedArray
    generateUI(modifiedArray);
}

getMoviesData()