import { makeAutoObservable } from "mobx";
import axios from "axios";
import { Recipe } from "../../types";

class RecipeStore {
    recipes: Recipe[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this); 
    }

    async fetchRecipes() {
        this.loading = true;
        try {
            const response = await axios.get("http://localhost:4000/api/recipes");
            this.recipes = response.data; 
        } catch (error) {
            console.error("שגיאה בטעינת המתכונים:", error);
            alert("אירעה שגיאה בטעינת המתכונים. אנא נסה שוב.");
        } finally {
            this.loading = false;
        }
    }
}

const recipeStore = new RecipeStore();
export default recipeStore;
