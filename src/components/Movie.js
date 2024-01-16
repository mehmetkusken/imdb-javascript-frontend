class Movie {

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
        this.all.forEach(movie => movie.renderCard())  
        movieContainer.addEventListener("click" , this.clickIndex)

    
    }

    static clickIndex = (e) => {
        if(e.target.tagName == "IMG" || e.target.classList.contains("title")){
            const id = e.target.closest(".movie-card").dataset.id
            this.find(id).renderShow()
        }
    }
    renderShow = () => {
        const {id,title , poster , year , genre , rating , plot } = this.data
        document.getElementById("main").innerHTML = `
        <div class="center">
        <p><img src= ${poster}/></p>
        <p><strong>Title: </strong>${title}</p>
        <p><strong>Year: </strong>${year}</p>
        <p><strong>Genre: </strong>${genre}</p>
        <p><strong>Plot: </strong>${plot}</p>
        <p><strong>IMDB Rating: </strong>${rating}</p>
       <button id="goBack">Go Back</button>
        </div>
        `
        document.getElementById("goBack").addEventListener("click", Movie.renderIndex)
    }
    renderCard = () => {
        const {id,title , poster , year , genre , rating , plot } = this.data
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

    static find = (id) => this.all.find(movie => movie.data.id == id)

   
   

    static getMovies = () => {
        api.getMovies().then(movies => {
            movies.forEach(movie => new Movie(movie))
            this.renderIndex()
            
        })
    }
   

    

    
}