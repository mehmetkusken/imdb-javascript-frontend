class ApiService {
    constructor(api){
        this.api = api
    }
    getMovies = () => fetch(this.api+"/movies").then(res => res.json());
    getDizis = () => fetch(this.api+"/dizis").then(res => res.json())
}