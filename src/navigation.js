//Archivo que se encarga de la logica del navegación

//hash: Es una herramienta que nos dice la url en la que estamos y la puede cambiar sin recargar la pagina dependiendo del usuario. agregando un '#' al final de la url
//al darle al boton buscar activa la funcion search
searchFormBtn.addEventListener('click', ()=>{
  location.hash = '#search=' + searchFormInput.value;
});
trendingBtn.addEventListener('click', ()=>{
  location.hash = '#trends';
});
logo.addEventListener('click', homePage);
arrowBtn.addEventListener('click', ()=>{
  history.back();
  //nos guarda el historial y nos permite regresar
  //location.hash = '#home';  (lleva siempre al home)
});
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

//Verifica el contenido del hash y ejecuta una funcion dependiendo del mismo
function navigator(){
  console.log({ location });

  if(location.hash.startsWith('#trends')){ //(uso de metodos de strings)
    trendsPage();
  }else if(location.hash.startsWith('#search=')){
    searchPage();
  }else if(location.hash.startsWith('#movie=')){
    movieDetailsPage();
  }else if(location.hash.startsWith('#category=')){
    categoriesPage();
  }else{
    homePage();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; //nos aseguramos que funcione en todos los navegadores
}

//Cada funcion muestra lo que queremos que el usuario vea dependiendo el hash.
function trendsPage (){
  console.log('Estamos en trends');
  logo.classList.remove('inactive');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.style.display=`block`;
  genericSection.classList.remove('inactive');
  movieDetailSelection.classList.add('inactive');
  headerCategoryTitle.innerHTML="Trending"

  getTrendingMovies();
}
function searchPage (){
  console.log('Estamos en search')
  logo.classList.remove('inactive');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.style.display=`block`;
  genericSection.classList.remove('inactive');
  movieDetailSelection.classList.add('inactive');

  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
}
function movieDetailsPage (){
  console.log('Estamos en movies')
  headerSection.classList.add('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSelection.classList.remove('inactive');


  html.classList.add('white');
  footer.classList.add('white');
  const [_, movieId] = location.hash.split('=');
  //location.hash nos trae un string '#movie=2313'. Lo que hacemos aquí es declarar un arreglo de 2 elementos donde separamos el string desde el signo de '='. obteniendo lo siguiente: [#movie, '2313'].
 
  getMovieById(movieId);

}
function categoriesPage (){
  console.log('Estamos en categories');
  logo.classList.remove('inactive');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.style.display=`block`;
  genericSection.classList.remove('inactive');
  movieDetailSelection.classList.add('inactive');
  const [_,categoryData] = location.hash.split('=');
  //Declaramos 2 variables/arreglos que serán el contenido del hash el primer arreglo es lo que va antes del '=' y el segundo es lo que va después, como strings. ['#category', 'id-name']
  const [categoryId, categoryName] = categoryData.split('-');
  //Del arreglo que creamos anteriormente vamos a separar categoryData en 2 partes. Una parte es lo que va antes del '-' y la otra es lo que va después. ['id', 'name']

  headerCategoryTitle.innerHTML = categoryName;
  getMoviesByCategory(categoryId);
}
function homePage (){
  console.log('Estamos en el HOME')
  logo.classList.remove('inactive');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  genericSection.innerHTML = "";
  movieDetailSelection.classList.add('inactive');

  html.classList.remove('white');
  footer.classList.remove('white');


  getTrendingMoviesPreview ()
  getCategoriesPreview()
}