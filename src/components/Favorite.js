class Favorite {

static all = []

constructor(data){
    this.data = data
    this.constructor.all.push(this)  
    console.log(this.data)

}



static getFavorites = () => {
    api.getFavorites().then(favorites => {
        Favorite.all = []
        favorites.forEach(favorite => new Favorite(favorite))
        
            
    })
}






}