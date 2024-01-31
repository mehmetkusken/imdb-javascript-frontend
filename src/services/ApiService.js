class ApiService {
    constructor(api){
        this.api = api
    }
    getMovies = () => fetch(this.api+"/movies").then(res => res.json());
    getDizis = () => fetch(this.api+"/dizis").then(res => res.json());
    getFavorites = () => fetch(this.api+"/favorites").then(res => res.json());

    findOrCreateEmail = (email) => {
        return fetch(this.api + '/users',{
           method: 'POST' , 
           headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}),
        })
        .then(response => response.json())
     }

     createFavoriteMovie = (addFavoriteList) => {
        addFavoriteList.user_id = user.id
        return fetch(this.api + '/favorites',{
           method: 'POST' , 
           headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(addFavoriteList),
        })
        .then(response => response.json())
     }

     createFavoriteDizi = (addFavoriteDiziList) => {
      addFavoriteDiziList.user_id = user.id
      return fetch(this.api + '/favoris',{
         method: 'POST' , 
         headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(addFavoriteDiziList),
      })
      .then(response => response.json())
   }
}