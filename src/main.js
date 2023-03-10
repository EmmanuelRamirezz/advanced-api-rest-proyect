//Archivo de Consumo de la API
//Finished

//Codigo DRY / helpers
function movieContainerGenerator(place, data){
  const movies = data.results;
  place.innerHTML=""; //Borra el contenido antes de generar el contenido
  movies.forEach(movie => {
  
  const movieContainer = document.createElement('div');
  movieContainer.classList.add('movie-container');
  
  movieContainer.addEventListener('click', () =>{
    location.hash = '#movie=' + movie.id
    //al darle click a una pelicula nos manda al hash de movies con el id de la pelicula elegida
  });
  
  const movieImg = document.createElement('img');
  movieImg.classList.add('movie-img');
  movieImg.setAttribute('alt', movie.title);
  //el metodo setAttribute necesita 2 parametros. El nombre del atributo y si contenido
  movieImg.setAttribute(
    'src',
    //el enlace base está en la documentacion
    'https://image.tmdb.org/t/p/w300' + movie.poster_path
  );
  movieContainer.appendChild(movieImg);
  place.appendChild(movieContainer);
  });
}
function createCategories(place, data){
  place.innerHTML = "";
  const genres = data.genres;
  genres.forEach(genre => { 
    const categoryContainer = document.createElement('div'); //creamos el div contenedor
    categoryContainer.classList.add('category-container');//le agregamos la clase al div

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title'); //agregamos la clase al h3
    categoryTitle.setAttribute('id', 'id'+genre.id); //agregamos el id al h3

    categoryTitle.addEventListener('click', ()=> {
      location.hash = `#category=${genre.id}-${genre.name}`
    });
    //al darle click a la categoría desde el home, el hash va a cambiar a gategory=id-genre. Lo que ejecuta la funcion del hash categoriesPage.

    const categoryTitleContent = document.createTextNode(genre.name); //Contenido del h3
    place.appendChild(categoryContainer);
    categoryContainer.appendChild(categoryTitle);
    categoryTitle.appendChild(categoryTitleContent);
  });
}
//configuracion por defecto de axios
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
}); 

//Consumo de api rest con fetch. Está funcion muestra las trending movies en el home.
async function getTrendingMoviesPreview (){
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
  let data = await res.json();

  movieContainerGenerator(trendingMoviesPreviewList, data);
};

//Consumo de api rest con axios. Esta funcion muestra las cotegorías con sus colores en el home.
async function getCategoriesPreview(){
  const {data} = await api('genre/movie/list');
  const genres = data.genres;
  // const res = await fetch (`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
  // const data = await res.json();
  // const genres = data.genres;
  // console.log(genres);//arreglo de objetos id: x, name: y

  createCategories(categoriesPreviewList, data)

}
//Esta funcion se ejecuta al dar click a alguna categoria y nos muestra las peliculas de dicha categoría. (Se ejecuta al estar en el hash de categories.)
async function getMoviesByCategory (id){
  let {data} = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  
  movieContainerGenerator(genericSection, data);
};

async function getMoviesBySearch (query){
  let {data} = await api('search/movie', {
    params: {
      query,
    },
  });
  
  movieContainerGenerator(genericSection, data);
};
async function getTrendingMovies(){
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
  let data = await res.json();
  const movies = data.results;
  movieContainerGenerator(genericSection, data);
};
async function getMovieById(movieId){
  const {data: movie} = await api('movie/'+movieId)
  // recibimos un objeto 'data' y renombramos ese objeto como 'movie'. (así funciona axios)
  const movieUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  
  headerSection.style.background=`
  linear-gradient(180deg,
     rgba(0, 0, 0, 0.35)19.27%,
     rgba(0, 0, 0, 0) 29.17%),
     
  url(${movieUrl})`;
  genericSection.style.display=`none`;

  movieDetailTitle.innerHTML = movie.title
  movieDetailScore.innerHTML = movie.vote_average
  movieDetailDescription.innerHTML = movie.overview

  createCategories(movieDetailCategoriesList, movie)
  
  getRelatedMovies(movieId)
}
async function getRelatedMovies(id){
  const {data} = await api(`movie/${id}/similar`);
  const relatedMovies = data.results;
  
  movieContainerGenerator(relatedMoviesContainer, data)
}


//Axios optimiza el codigo hace que sea mas corto, facil de leer y mantenible


