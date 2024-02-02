class Navigation{

    static renderNav = () => {
        const navi =  document.getElementById('try')
        navi.innerHTML += `
         <ul class="nav-links">
         <li><a href="javascript:;" data-link="movie">Movie </a></li>
         <li><a href="javascript:;" data-link="dizi">Serie </a></li>
         <li><a href="javascript:;" data-link="favoriteMovie">Favorite List of Movie</a></li>
         <li><a href="javascript:;" data-link="favoriteSerie">Favorite List of Serie </a></li>
         </ul>
       `
       Navigation.handlePageClick();
    }

    static handlePageClick = () => {
        let links = document.querySelectorAll('[data-link]');
        links.forEach(function (element) {
          element.addEventListener('click', Navigation.handleClickEvent);
        });
      }

      static handleClickEvent = (e) => {
        let page = e.target.dataset.link;
        document.querySelector('.container')
        switch(page) {
          case 'movie':
            Movie.getMovies();
    
            break;
          case 'dizi':
            Dizi.getDizis();
            document.querySelector('.container').classList.add('hidden');
            break;
            case 'favoriteMovie':
            Favorite.getFavorites()
            document.querySelector('.container').classList.add('hidden');
            document.querySelector('.product').classList.add('hidden');
            break;
            //case 'favoriteSerie':
            //heroImage.classList.remove('hidden');
            //document.getElementById("theater").classList.add('hidden');
            //break;
           
        }
      }





}