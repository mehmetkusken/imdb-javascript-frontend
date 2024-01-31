const api = new ApiService("http://localhost:3000")
const modal = new Modal()

Navigation.renderNav()

document.querySelector('form').addEventListener('submit',emailSubmit)

function emailSubmit(e){
    e.preventDefault()
    let email = e.target.email.value
    document.getElementById("main").innerHTML = ""
    if(email != undefined && email != null && email !=''){
     api.findOrCreateEmail(email).then(userData =>{
        user = userData
       Movie.getMovies()
       
      })
   }else {
      alert('Enter Your Email')
   }
}