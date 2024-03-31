const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjBhMWFmY2FjYjZmNDhkMWNjNTVjYjUwYTNiM2U3YyIsInN1YiI6IjY1ZjY4NGY5ZTIxMDIzMDE2NWVkY2MzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W2_UNtq1M8uexfTccyDwFHPdeyumahi02GvBPoOx034'
    }
  };

alert ("Hi")
// popular movies
async function displayPopularMovies(){
    const data = await fetchAPIData('movie/popular');
    console.log(data.results)

    data.results.forEach( movie => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path
             ? ` <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />` : ` <img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
        }
       
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>`;  

        document.getElementById("popular-movies").appendChild(div)
    });

}

// popular tv shows
async function displayPopularShows(){
    const data = await fetchAPIData('tv/popular');
    console.log(data.results)

    data.results.forEach( show => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `<a href="tv-details.html?id=${show.id}">
        ${
            show.poster_path
             ? ` <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` : ` <img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
        }
       
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${show.first_air_date}</small>
        </p>`;  

        document.getElementById("popular-shows").appendChild(div)
    });

}

// display  movies Details
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchAPIData(`movie/${movieId}`);
    console.log(movie)

//Overlay for backgroundImage
    displayBackgroungImage('movie' , movie.backdrop_path);

    const div = document.createElement('div')
    div.innerHTML = ` <div class="details-top">
    <div>
    ${
        movie.poster_path
         ? ` <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="Movie Title"
      />` : ` <img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
    }
    </div>
    <div>
      <h2>${movie.title} </h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
       ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((item) => `<li>${item.name}</li>`).join('')}
      </ul>
      <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies.map(item => `<p>${item.name}</p>`).join('')}
    </div>
  </div>`;
  document.querySelector('#movie-details').appendChild(div)
        
}

// display Show Details
async function displayShowDetails(){
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);
  console.log(show)

//Overlay for backgroundImage
  displayBackgroungImage('tv' , show.backdrop_path);

  const div = document.createElement('div')

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
       ? ` <img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
      : ` <img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />`
  }
  </div>
  <div>
    <h2>${show.name} </h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${show.last_air_date}</p>
    <p>
     ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((item) => `<li>${item.name}</li>`).join('')}
    </ul>
    <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number od Episodes:</span> ${(show.number_of_episodes)}</li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${(show.last_episode_to_air.name)}</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${show.production_companies.map(item => `<p>${item.name}</p>`).join('')}
  </div>
</div>`;
document.querySelector('#show-details').appendChild(div)
      
}

//Display BackDrop On Details Pages 
function displayBackgroungImage(type, backgroundPath){
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '110vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.2';

  if(type === 'movie'){
    document.querySelector('#movie-details').appendChild(overlayDiv);
   }else {
  document.querySelector('#show-details').appendChild(overlayDiv);
}
}



//Search Movies / Show
async function search(){
  const queryString = window.location.search;
  // console.log(queryString)
  const urlParams = new URLSearchParams(queryString)
  // console.log(urlParams)
  // console.log(urlParams.get('type'))
  // console.log(urlParams.get('search-term'))
  global.search.type = urlParams.get('type')
  global.search.term = urlParams.get('search-term')

  if(global.search.term !== '' && global.search.term !== null){
    //@ to do make the request and display results
    const {results , total_pages, page} = await searchAPIData();
    // console.log(results)

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';

    if(results.length === 0){
      showAlert('No results found')
      return;
    }

  }else{
    showAlert("Please enter a search term")
  }
}

function displaySearchResults(results){
  results.forEach( (result) => {
    let div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `<a href="${global.search.type}-details.html?id=${result.id}">
    ${
      result.poster_path
         ? ` <img
        src="https://image.tmdb.org/t/p/w500${result.poster_path}"
        class="card-img-top"
        alt="${global.search.type === 'movie' ? result.title : result.name}"
      />` : ` <img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${global.search.type === 'movie' ? result.title : result.name}"
    />`
    }
   
  </a>
  <div class="card-body">
    <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
    </p>`;  

    document.getElementById("search-results").appendChild(div)
});
}


// popular tv shows
async function displayPopularShows(){
    const data = await fetchAPIData('tv/popular');
    console.log(data.results)

    data.results.forEach( show => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `<a href="tv-details.html?id=${show.id}">
        ${
            show.poster_path
             ? ` <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` : ` <img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
        }
       
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${show.first_air_date}</small>
        </p>`;  

        document.getElementById("popular-shows").appendChild(div)
}
)}



//Display Slider Movies
async function displaySlider(){
  const {results} = await fetchAPIData('movie/now_playing');
  console.log(results)

  results.forEach((movie) => {
    const div = document.createElement('div')
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
    </h4>
    `
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper()
  })
}

function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 5
      },
    }
  })
}

//Fetch Data From TMDB API
async function fetchAPIData(endpoint){
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner()
    const response = await fetch(
        `${API_URL}${endpoint}?language=en-US&page=1`, options
    );
    const data = await response.json()
    hideSpinner()
    return data;
}

//Make Request to Search
async function searchAPIData(){
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  showSpinner()
  const response = await fetch(
      `${API_URL}search/${global.search.type}?language=en-US&query=${global.search.term}`, options
  );
  const data = await response.json()
  hideSpinner()
  return data;
}


function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const global ={
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1
    },
    api:{
      apiKey: '8b0a1afcacb6f48d1cc55cb50a3b3e7c',
      apiUrl: 'https://api.themoviedb.org/3/'
    }
};

// Highlight Active Link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link')
    links.forEach( (link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    })
}
// Show Alert
function showAlert(message, className = 'error'){
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className)
  alertEl.appendChild(document.createTextNode(message))
  document.querySelector('#alert').appendChild(alertEl)

  setTimeout(()=> alertEl.remove(),3000)
}


//addCommasToNumber
function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//Init App Router
function init(){
    switch (global.currentPage){
    case '/':
    case '/index.html':
        displaySlider()
        displayPopularMovies()
        break;
    case "/shows.html":
        displayPopularShows()
        break;
    case '/movie-details.html':
        displayMovieDetails()
        break;
    case '/tv-details.html':
      displayShowDetails()
        break;
    case "/search.html":
        search();
        break;

    }
highlightActiveLink()
}
document.addEventListener('DOMContentLoaded' , init)







