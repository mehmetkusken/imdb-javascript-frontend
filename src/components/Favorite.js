class Favorite {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)  
        
    }

    static renderIndex = () => {
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("container")
        const main = document.getElementById("main")
        main.innerHTML = ""
        main.appendChild(movieContainer)
        this.all.forEach(favorite => favorite.renderCard())  
        movieContainer.addEventListener("click" , this.clickIndex)
       
    }

    renderCard = () => {
        if(user.id === this.data.user.id){
        const {title , poster , year , genre , rating , plot } = this.data.movie
        const { id } = this.data
        document.querySelector(".container").innerHTML += `
        <div class="movie-card" data-id=${id}>
        <p class = "title">${id}. ${title}</p>
        <img src=${poster} class="image-src">
        <p>Year : ${year}</p>
        <p>Genre : ${genre}</p>
        <p>Rating : ${rating}</p>
        <p>Description : ${plot}</p>
       </div>
        `
    }
    }

   

    static clickIndex = (e) => {
        if(e.target.tagName == "IMG" || e.target.classList.contains("title")){
            const id = e.target.closest(".movie-card").dataset.id
            this.find(id).renderShow()
        }
    }

    renderShow = () => {
        const {title , poster , year , genre , rating , plot } = this.data.movie;
        const { id } = this.data
       
        document.getElementById("main").innerHTML = `
        <div class="center" id="find">
        <p><img src= ${poster}/></p>
        <p><strong>Title: </strong>${title}</p>
        <p><strong>Year: </strong>${year}</p>
        <p><strong>Genre: </strong>${genre}</p>
        <p><strong>Plot: </strong>${plot}</p>
        <p><strong>IMDB Rating: </strong>${rating}</p>
        <button id="goBack">Go Back</button>   
        <button data-id=${id}, id="deleteFavorite">Delete from Favorite</button>       
        </div>
        `
        document.getElementById("goBack").addEventListener("click", Favorite.renderIndex) 
        document.getElementById("deleteFavorite").addEventListener("click", modal.open) 
        Favorite.favoriteForm(id)
    
    }

    static favoriteForm = (id) => {
        modal.main.innerHTML = `
        <form>
        <p>Do you want to delete?</p>
        <button class="delete-bttn btn btn-sm btn-primary" data-favoriteid=${id}>Add</button>
        
        </form>
        `
        modal.main.querySelector('form').addEventListener('click', this.handleSubmit)
    }

    static handleSubmit = (e) => {
        e.preventDefault() 
       
        api.deleteFavoriteMovie(e.target.dataset.favoriteid)
       
    }

    static find = (id) => this.all.find(favorite => favorite.data.id == id) 
    

    static getFavorites = () => {
        api.getFavorites().then(favorites => {
            Favorite.all = []
            favorites.forEach(favorite => new Favorite(favorite))
            this.renderIndex()
            
        })
    }
    
}