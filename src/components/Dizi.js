class Dizi {
    
    static all = []

    constructor(data){
        this.data = data
        this.constructor.all.push(this)  
    }

    static renderIndex = () => {
        const diziContainer = document.createElement("div")
        diziContainer.classList.add("product")
        const main = document.getElementById("main")
        main.innerHTML = ""
        main.appendChild(diziContainer)
        this.all.forEach(dizi => dizi.renderCard())  
        diziContainer.addEventListener("click" , this.clickIndex)
       
    }
    renderCard = () => {
        const {id,title , image , year , genre , rating , description } = this.data
        document.querySelector(".product").innerHTML += `
        <div class="dizi-card" data-id=${id}>
        <p class = "title">${id}.${title}</p>
        <img src=${image}class="image-src">
        <p>Year : ${year}</p>
        <p>Genre : ${genre}</p>
        <p>Rating : ${rating}</p>
        <p>Description : ${description}</p>
       </div>
        `
    }

    static clickIndex = (e) => {
        if(e.target.tagName == "IMG" || e.target.classList.contains("title")){
            const id = e.target.closest(".dizi-card").dataset.id
            this.find(id).renderShow()
        }
    }

    renderShow = () => {
        const {id,title , image , year , genre , rating , description } = this.data
       
        document.getElementById("main").innerHTML = `
        <div class="show-card" id="find">
        <p class = ${title}</p>
        <img src=${image}class="image-src">
        <p>Year : ${year}</p>
        <p>Genre : ${genre}</p>
        <p>Rating : ${rating}</p>
        <p>Description : ${description}</p>
        <button id="goBackk">Go Back</button>   
        <button data-id=${id}, id="addFavoritee">Add to your Favorite</button>       
        </div>
        `
        document.getElementById("goBackk").addEventListener("click", Dizi.renderIndex) 
        document.getElementById("addFavoritee").addEventListener("click", modal.open) 
        Dizi.favoriteForm(id)
    
    }

    static favoriteForm = (id) => {
        modal.main.innerHTML = `
        <form>
        <p>Do you want to add your favorite list this Serie?</p>
        <button class="delete-bttn btn btn-sm btn-primary" data-diziid=${id}>Add</button>
        
        </form>
        `
        modal.main.querySelector('form').addEventListener('click', this.handleSubmit)
    }

    static handleSubmit = (e) => {
        e.preventDefault() 
        const addFavoriteDiziList = {
           dizi_id:  e.target.dataset.diziid
        }
    }

    static find = (id) => this.all.find(dizi => dizi.data.id == id)

    static getDizis = () => {
        api.getDizis().then(dizis => {
            Dizi.all = []
            dizis.forEach(dizi => new Dizi(dizi))
            this.renderIndex()
            
        })
    }
}