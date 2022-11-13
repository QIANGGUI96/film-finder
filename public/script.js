const tmdbKey = 'bbfb4fa740dc9bc8e751d5f7650ce2fb';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    let genreRequestEndpoint = '/genre/movie/list'
    let requestParams = `?api_key=${tmdbKey}`
    let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`
    try {
        const response = await fetch(urlToFetch)

        //     .then(
        //         response=>{
        //             if(response.ok){
        //                 let jsonResponse=response.json();
        //                 console.log(jsonResponse)
        //                 return jsonResponse;
        //             }
        //         }
        //     ).then(genres=>{
        //       console.log(genres)
        //       return genres
        //     })

        if (response.ok) {
            let jsonResponse = await response.json()
            
            let genres = jsonResponse.genres
            return genres
        }

    }

    catch (error) {
        console.log(error)
    }
}

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`
    try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
            let JsonResponse = await response.json()

            let movies = JsonResponse.results
            return movies
        }
    } catch (error) {
        console.log(error)

    }

};

const getMovieInfo = async (movie) => {
    let movieId = movie.id
    try {
        let movieEndpoint = `/movie/${movieId}`
        const requestParams = `?api_key=${tmdbKey}`
        const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`
        const response = await fetch(urlToFetch)
        if (response.ok) {
            const movieInfo = await response.json();
            return movieInfo
    
            
        }

    } catch (error) {
        console.log(error)

    }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    };
    const movies = await getMovies();
    const randomMovie = await getRandomMovie(movies);
    console.log(randomMovie)
    const info = await getMovieInfo(randomMovie);
    console.log('info', info)

     displayMovie(info);

};


getGenres().then(populateGenreDropdown);

playBtn.onclick = showRandomMovie;