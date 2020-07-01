
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe () {
        try {
            const res = await fetch(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=50f1175f9db54630b04650fece9ef2b4`);
            let data = await res.json();
            let ingredients = data.extendedIngredients;
            this.image = data.image;
            this.cookingMinutes = data.cookingMinutes;
            this.title = data.title;
            this.servings = data.servings;
            this.sourceUrl = data.sourceUrl;
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
}