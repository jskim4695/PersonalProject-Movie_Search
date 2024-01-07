function searchMovies() {
    // TMDB Api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGFhZTY3MGIxYjNlODdjNjI0YTY1Y2JiYzNhNGYwYyIsInN1YiI6IjY1OTdjODIyNWNjMTFkNzdkODdkOWQwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7acnKUa4dxqa3kpwB1aoRheVTkqaPxSQE8hEO-ObMJk'
        }
    };
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    // API 데이터 가져오기
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let rows = data['results'];
            const cardList = document.querySelector('.card_list');
            cardList.innerHTML = '';

            rows.forEach((a) => {
                let _title = a['title'];
                let _overview = a['overview'];
                let _poster_path = a['poster_path'];
                let _vote_average = a['vote_average'];
                let _id = a['id'];

                let temp_html = `
                    <div class="movie-card" data-id="${_id}">
                        <img src="https://image.tmdb.org/t/p/w500${_poster_path}">
                        <h3>${_title}</h3>
                        <p>${_overview}</p>
                        <p>Rating: ${_vote_average}</p>
                    </div>
                `;
                cardList.insertAdjacentHTML('beforeend', temp_html);
            });

            const movieCards = document.querySelectorAll('.movie-card');
            movieCards.forEach(card => {
                card.addEventListener('click', function() {
                    let movieId = this.getAttribute('data-id');
                    alert(`영화 id: ${movieId}`);
                });
            });
        })
        .catch(error => {
            console.log('데이터를 불러오는 중에 오류가 발생했습니다:', error);
        });
}
searchMovies()