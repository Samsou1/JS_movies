const apiKey = '5af9d8bf';

const main = document.querySelector('main');
const movieSearchBar = document.getElementById('movieSearchBar');
const form = document.querySelector('form');
const error = document.querySelector('.error');
const modal = document.querySelector('.modal');
var span = document.getElementsByClassName("close")[0];

const getMovies = (search)=> {
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search.replace(/ /g, '+')}`)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    if(response['error']){
      error.innerHTML = "No movie found";
    }else{
      buildMovieList(response['Search']);
    }
  })
  .catch((error) => { 
    console.error(error); 
  });
};

const buildMovieList = (ary) => {
  main.innerHTML = '';
  for(let i = 0; i < ary.length; i ++){
    main.innerHTML += `
    <div>
      <h2>${ary[i]['Title']}</h2>
      <img src='${ary[i]['Poster']}'>
      <br>
      <p>Date of release: ${ary[i]['Year']}</p>
      <button data-imdbid=${ary[i]['imdbID']} type="button" class="btn btn-primary">See more</button>
    </div>
    `;
  }
  let buttons = document.querySelectorAll('main > div > button');
  for(let i = 0; i < buttons.length; i ++){
    buttons[i].addEventListener('click',function(e){
      getMovieDetails(this.dataset.imdbid);
      e.preventDefault();
    });
  }
}

form.addEventListener('submit', (e) => {
  getMovies(movieSearchBar.value);
  e.preventDefault();
});

const getMovieDetails = (id) => {
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    if(response['error']){
      error.innerHTML = "No movie found";
    }else{
      buildPopUp(response);
    }
  })
  .catch((error) => { 
    console.error(error); 
  });
};

const buildPopUp = (hash) => {
  document.querySelector('.modal-header > h2').innerHTML = hash['Title'];
  document.querySelector('.modal-body > h4').innerHTML = hash['Year'];
  document.querySelector('.modal-body > p').innerHTML = hash['Plot'];
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

span.onclick = function() {
  modal.style.display = "none";
}