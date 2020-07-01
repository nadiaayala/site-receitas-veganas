
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe () {
        try {
            const res = await fetch(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=637a112ab83d492cb36b701b4386c4e2`);
            let data = await res.json();
            let ingredients = data.extendedIngredients;
            this.image = data.image;
            this.cookingMinutes = data.cookingMinutes;
            this.title = data.title;
            this.servings = data.servings;
            this.sourceUrl = data.sourceUrl;
            this.uniformSourceUrl();
            this.publisher = this.getSourceName();
            
            this.parseIngredientes(ingredients);
          
        } 
        catch(error){
            console.log(`Error while trying to get the recipe. ${error}`);
        }
    }

    parseIngredientes (ingredients) {
        let newIngArr = [];
        ingredients.forEach(element => {
            let ingredient = {
                amount: element.amount,
                unit: element.unit,
                name: element.originalName,
            };
            newIngArr.push(ingredient);
        });
        this.ingredients = newIngArr;
        // console.log(this.ingredients);
    }

    uniformSourceUrl(){
        const newUrl = this.sourceUrl.includes('https') ? this.sourceUrl : this.sourceUrl.replace('http', 'https');
        this.sourceUrl = newUrl;
    }
    //START HERE
    getSourceName(){
        let name;
        if(this.sourceUrl.includes('.com')){
           name = this.sourceUrl.replace('.com', '');
           
        }
        else if(this.sourceUrl.includes('.net')){
            name = this.sourceUrl.replace('.net', '');
            
        }
        else if(this.sourceUrl.includes('.org')){
            name = this.sourceUrl.replace('.org', '');
            
        }
        name = name.includes('www') ? name.replace('https://www.', ''): name.replace('https://', '');
        const index = name.indexOf('/');
        name = name.substr(0, index);
        return name;
        
    }
}