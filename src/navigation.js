//Archivo que se encarga de la logica del navegación

//hash: Es una herramienta que nos dice la url en la que estamos y la puede cambiar sin recargar la pagina dependiendo del usuario. agregando un '#' al final de la url
//al darle al boton buscar activa la funcion search
searchFormBtn.addEventListener('click', ()=>{
  location.hash = '#search=';
});
trendingBtn.addEventListener('click', ()=>{
  location.hash = '#trends';
});
//regreso
arrowBtn.addEventListener('click', ()=>{
  location.hash = '#home';
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

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
 
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSelection.classList.add('inactive');
}
function searchPage (){
  console.log('Estamos en search')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
 
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSelection.classList.add('inactive');
}
function movieDetailsPage (){
  console.log('Estamos en movies')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
 
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSelection.classList.remove('inactive');


}
function categoriesPage (){
  console.log('Estamos en categories')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
 
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
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
  movieDetailSelection.classList.add('inactive');
  

  getTrendingMoviesPreview ()
  getCategoriesPreview()
}