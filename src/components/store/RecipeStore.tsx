import { makeAutoObservable, runInAction } from "mobx";
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
      const response = await axios.get("http://localhost:5000/api/recipes");
      this.recipes = response.data;
    } catch (error) {
      console.error("erorr: ", error);
    } finally {
      this.loading = false;
    }
  }
  async addRecipe(recipeData:Recipe) {
    this.loading = true;
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', recipeData, {
        headers: {
          'user-id': userId 
        }
      });
      runInAction(() => {
        this.recipes.push(response.data.recipe);
        this.loading = false;
      });
    } catch (error) {
        runInAction(() => {
        this.loading = false;
        });
        console.error("erorr: ", error);
    }
  }
}

const recipeStore = new RecipeStore();
export default recipeStore;
