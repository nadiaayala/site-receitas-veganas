import { get } from "http";

const key = "50f1175f9db54630b04650fece9ef2b4";

//https://api.spoonacular.com/recipes/search?apiKey=50f1175f9db54630b04650fece9ef2b4&number=100&query=%22pasta%22

export default class Search {
    constructor(query){
        this.query = query;
    }


    async getResults(){
        try{
            let res = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=50f1175f9db54630b04650fece9ef2b4&number=10&query=%22${this.query}%22`);
            let data = await res.json();
            console.log(data.results); g
            
        }
        catch(error){
            console.log(`There was an error perfoming the search: ${error}`);
        }
    }
}