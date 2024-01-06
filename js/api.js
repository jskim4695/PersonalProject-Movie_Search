require('dotenv').config();

function searchMovies() {
    // TMDB Api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'process.env.AUTHORIZATION_TOKEN'
        }
    };
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    // API 데이터 가져오기
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let rows = data['results'];
            const cardList = document.querySelector('.card-list');
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

// require('dotenv').config();

// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: process.env.AUTHORIZATION_TOKEN
//     }
// };

// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
// fetch(url, options)
// .then(response => response.json())
// .then(data => {
//     let rows = data['results'];
//     const cardList = document.querySelector('.card-list');
//     cardList.innerHTML = '';

//     rows.forEach((a) => {
//         let _title = a['title'];
//         let _overview = a['overview'];
//         let _poster_path = a['poster_path'];
//         let _vote_average = a['vote_average'];
//         let _id = a['id'];

//         let temp_html = `
//             <div class="movie-card" data-id="${_id}">
//                 <img src="https://image.tmdb.org/t/p/w500${_poster_path}">
//                 <h3>${_title}</h3>
//                 <p>${_overview}</p>
//                 <p>Rating: ${_vote_average}</p>
//             </div>
//         `;
//         cardList.insertAdjacentHTML('beforeend', temp_html);
//     });
//     const movieCards = document.querySelectorAll('.movie-card'); // :CSS 선택자를 이용하여 모든 요소를 선택합니다.
//     movieCards.forEach(card => {
//         card.addEventListener('click', function() {
//             let movieId = this.getAttribute('data-id') // : 해당 요소의 속성 값을 가져옵니다.
//             alert(`영화 id: ${movieId}`);
//         });
//     });
// })
//     // .then(response => response.json())
//     // .then(response => {
//     //     const movies = response.results; // 영화 데이터 배열
//     //     let temp_html = ''; // HTML 형식의 문자열을 담을 변수
    
//     //     // 영화 데이터를 순회하며 HTML 형식의 문자열 생성
//     //     movies.forEach(movie => {
//     //         temp_html += `
//     //             <div class="movie card">
//     //                 <h2>${movie.title}</h2>
//     //                 <img src="${movie.base_url}${movie.file_size}${movie.file_path}" alt="${movie.title} poster">
//     //                 <p>${movie.overview}</p>
//     //                 <p>${movie.release_date}</p>
//     //                 <p>${movie.vote_average}</p>
//     //             </div>
//     //         `;
//     //     });
    
//     //     // console.log(temp_html)
//     //     document.getElementById('movies_container').innerHTML = temp_html;
//     // })
//     // .catch(err => console.error(err));