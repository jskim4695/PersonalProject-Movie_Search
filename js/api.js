function printMovies() {
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
            while (cardList.firstChild) {
                cardList.removeChild(cardList.firstChild);
            }

            rows.forEach((movie) => {
                const { title, overview, poster_path, vote_average, id } = movie;

                let temp_html = `
                    <div class="movie-card" data-id="${id}">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}">
                        <p style="font-size:19px;">${title}</p>
                        <p class="movie_overview">${overview}</p>
                        <p>Rating: ${vote_average}</p>
                    </div>
                `;
                cardList.insertAdjacentHTML('beforeend', temp_html);
            });

            const cardScroll = document.querySelectorAll('.movie-card');
            cardScroll.forEach(card => {
                const overview = card.querySelector('.movie_overview');
                if (overview.scrollHeight > overview.clientHeight) {
                    overview.style.overflowY = 'scroll'; // 스크롤이 생기도록 overflowY 속성을 'scroll'로 설정
                }
            });

        
            const cardsAlert = document.querySelectorAll('.movie-card');
            cardsAlert.forEach(card => {
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