const searchMovies = (query) => {
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
            const searchResults = data['results'];
            // 전체 데이터 들 제목을 소문자로 변환
            let title_list = searchResults.map(item => item.title.toLowerCase());
            // query검색어와  위에 값이 포함 되어 있는 타이틀 반환
            let find_title = title_list.filter(item => item.includes(query.toLowerCase()));
            // 전체 타이틀 리스트에서 일치하는 타이틀의 인덱스 번호 찾기
            let find_index = [];

            for (let i in find_title) {
                let idx = title_list.findIndex(item => item === find_title[i]);
                find_index.push(idx);
            }

            // 값이 없으면 -> 알림 표시
            if (find_index.length === 0) {
                // 알림을 다른 방식으로 표시하는 것이 좋습니다.
                console.log('검색 결과가 없습니다.');
            } else {
                const cardList = document.querySelector('.card_list');
                // 전체 데이터에서 일치한 데이터 뽑아오기 
                const match_movie = [];
                for (let a of find_index) {
                    const movies = searchResults[a];
                    match_movie.push(movies);
                }
                cardList.innerHTML = '';

                match_movie.forEach(a => {
                    let _title = a['title'];
                    let _overview = a['overview'];
                    let _poster_path = a['poster_path'];
                    let _vote_average = a['vote_average'];
                    let _id = a['id'];

                    let temp_html = `
                        <div class="movie-card" data-id="${_id}">
                            <img src="https://image.tmdb.org/t/p/w500${_poster_path}">
                            <h3>${_title}</h3>
                            <p class="movie_overview">${_overview}</p>
                            <p>Rating: ${_vote_average}</p>
                        </div>
                    `;
                    cardList.insertAdjacentHTML('beforeend', temp_html);
                });}

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

    const searchInput = document.querySelector('#search_input');
    searchInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query !== '') {
        searchMovies(query);
        }
    }
    });

searchMovies('검색어');


// function searchMovies(query) {
//     // TMDB Api
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGFhZTY3MGIxYjNlODdjNjI0YTY1Y2JiYzNhNGYwYyIsInN1YiI6IjY1OTdjODIyNWNjMTFkNzdkODdkOWQwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7acnKUa4dxqa3kpwB1aoRheVTkqaPxSQE8hEO-ObMJk'
//         }
//     };
//     const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

//     // API 데이터 가져오기
//     fetch(url, options)
//         .then(response => response.json())
//         .then(data => {
//             const searchResults = data['results'];
//             // 전체 데이터 들 제목을 소문자로 변환
//             let title_list = searchResults.map((item) => {
//                 return item.title.toLowerCase()
//             })
//             // query검색어와  위에 값이 포함 되어 있는 타이틀 반환
//             let find_title = title_list.filter((item) => {
//                 return item.includes(query.toLowerCase())
//             });
//             // 전체 타이틀 리스트에서 일치하는 타이틀의 인덱스 번호 찾기
//             let find_index = []
    
//             for (let i in find_title) {
//                 let idx = title_list.findIndex((item) => {
    
//                     return item === find_title[i]
//                 });
    
//                 find_index.push(idx);
//             }
    
//             // 값이 없으면 -> 알림 표시
//             if (find_index.length === 0) {
//                 // 알림을 다른 방식으로 표시하는 것이 좋습니다.
//                 console.log('검색 결과가 없습니다.');
//                 // 값이 있으면 ->     
//             } else {
//                 const cardList = document.querySelector('.card_list');
//                 // 전체 데이터에서 일치한 데이터 뽑아오기 
    
//                 const match_movie = []
//                 for (let a of find_index) {
//                     const movies = searchResults[a];
//                     match_movie.push(movies);
//                 }
//                 cardList.innerHTML = '';

//                 match_movie.forEach((a) => {
//                     let _title = a['title'];
//                     let _overview = a['overview'];
//                     let _poster_path = a['poster_path'];
//                     let _vote_average = a['vote_average'];
//                     let _id = a['id'];

//                     let temp_html = `
//                         <div class="movie-card" data-id="${_id}">
//                             <img src="https://image.tmdb.org/t/p/w500${_poster_path}">
//                             <h3>${_title}</h3>
//                             <p>${_overview}</p>
//                             <p>Rating: ${_vote_average}</p>
//                         </div>
//                     `;
//                     cardList.insertAdjacentHTML('beforeend', temp_html);
//                 });

//                 const movieCards = document.querySelectorAll('.movie-card');
//                 movieCards.forEach(card => {
//                     card.addEventListener('click', function() {
//                         let movieId = this.getAttribute('data-id');
//                         console.log(`영화 id: ${movieId}`);
//                     });
//                 });
//             }
//         })
//         .catch(error => {
//             console.log('데이터를 불러오는 중에 오류가 발생했습니다:', error);
//         });
// }

// searchMovies('검색어'); // 검색어에는 실제 검색하고자 하는 단어나 문장을 입력해주세요.
