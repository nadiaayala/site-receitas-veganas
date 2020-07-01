import { get } from "http";






export default class Search {
    constructor(query){
        this.query = query;
    }


    async getResults(){
        try{
            let res = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=637a112ab83d492cb36b701b4386c4e2&number=100&query=%22${this.query}%22&diet="vegetarian"`);
            let data = await res.json();
            console.log(data.results); 
            this.results = data.results;
            
        }
        catch(error){
            console.log(`There was an error perfoming the search: ${error}`);
        }
    }
}