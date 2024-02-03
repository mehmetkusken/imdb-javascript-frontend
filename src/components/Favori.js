class Favori {

    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)  
    }
    static renderIndex = () => {
        const favoriContainer = document.createElement("div")
        favoriContainer.classList.add("productFavori")
        const main = document.getElementById("main")
        main.innerHTML = ""
        main.appendChild(favoriContainer)
        this.all.forEach(favori => favori.renderCard())  
        favoriContainer.addEventListener("click" , this.clickIndex)
       
    }
    renderCard = () => {
        if(user.id === this.data.user.id){
        const {title , image , year , genre , rating , description } = this.data.dizi
        const {id } = this.data
        document.querySelector(".productFavori").innerHTML += `
        <div class="favori-card" data-id=${id}>
        <p class = "title">${id}.${title}</p>
        <img src=${image}class="image-src">
        <p>Year : ${year}</p>
        <p>Genre : ${genre}</p>
        <p>Rating : ${rating}</p>
        <p>Description : ${description}</p>
       </div>
        `
        }
    }

    static clickIndex = (e) => {
        if(e.target.tagName == "IMG" || e.target.classList.contains("title")){
            const id = e.target.closest(".favori-card").dataset.id
            this.find(id).renderShow()
        }
    }

    renderShow = () => {
       
        const {title , image , year , genre , rating , description } = this.data.dizi
        const {id } = this.data
        document.getElementById("main").innerHTML = `
        <div class="show-card" id="find">
        <p class = ${title}</p>
        <img src=${image}class="image-src">
        <p>Year : ${year}</p>
        <p>Genre : ${genre}</p>
        <p>Rating : ${rating}</p>
        <p>Description : ${description}</p>
        <button id="goBackk">Go Back</button>   
        <button data-id=${id}, id="addFavoriteDizi">Delete From Your List</button>       
        </div>
        `
        document.getElementById("goBackk").addEventListener("click", Favori.renderIndex) 
        document.getElementById("addFavoriteDizi").addEventListener("click", modal.open) 
        Favori.favoriForm(id)
    
    }

    static favoriForm = (id) => {
        modal.main.innerHTML = `
        <form>
        <p>Are You Sure?</p>
        <button class="delete-bttn btn btn-sm btn-primary" data-favoriid=${id}>Delete</button>
        
        </form>
        `
        modal.main.querySelector('form').addEventListener('click', this.handleSubmit)
    }

    static handleSubmit = (e) => {
        e.preventDefault() 
       
        api.deleteFavoriteDizi(e.target.dataset.favoriid)
       
    }

    static find = (id) => this.all.find(favori => favori.data.id == id)

    static getFavoris = () => {
        api.getFavoris().then(favoris => {
            Favori.all = []
            favoris.forEach(favori => new Favori(favori))
            this.renderIndex()
            
        })
    }

}