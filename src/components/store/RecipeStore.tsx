// import { makeAutoObservable } from "mobx";
// import axios from "axios";
// import { Recipe } from "../../types";

// class RecipeStore {
//     recipes: Recipe[] = [];
//     loading: boolean = false;

//     constructor() {
//         makeAutoObservable(this); //כל שינוי באחד מהמאפינים או המטודות של המחלקה באיזושהיא קומפוננטה שצופה במחלקה יגרום לרינדור הקומפוננטה
//     }

//     async fetchRecipes() {
//         this.loading = true;
//         try {
//             const response = await axios.get("http://localhost:4000/api/recipes");
//             this.recipes = response.data; 
//         } catch (error) {
//             console.error("שגיאה בטעינת המתכונים:", error);
//             alert("אירעה שגיאה בטעינת המתכונים. אנא נסה שוב.");
//         } finally {
//             this.loading = false;
//         }
//     }
//      // פונקציה להוספת מתכון חדש
//      async addRecipe(newRecipe: Omit<Recipe, "id">) { 
//         try {
//             const response = await axios.post("http://localhost:4000/api/recipes", newRecipe);
//             this.recipes.push(response.data); // עדכון הרשימה ב-MobX
//             alert("המתכון נשמר בהצלחה! ✅");
//         } catch (error) {
//             console.error("שגיאה בהוספת המתכון:", error);
//             alert("אירעה שגיאה בעת שמירת המתכון. נסה שוב.");
//         }
//     }
// }

// const recipeStore = new RecipeStore();
// export default recipeStore;
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
      console.error("שגיאה בטעינת המתכונים:", error);
      alert("אירעה שגיאה בטעינת המתכונים. אנא נסה שוב.");
    } finally {
      this.loading = false;
    }
  }
  async addRecipe(recipeData:Recipe) {
    this.loading = true;
    const userId = localStorage.getItem('userId'); // שליפת ה-userId מה-LocalStorage
    console.log("User ID שנשלח:", userId);  // בדיקת הערך
    try {
        const response = await axios.post('http://localhost:5000/api/recipes', recipeData, {
            headers: {
                'user-id': userId  // הוספת ה-Header החשוב
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
        console.error("שגיאה בהוספת המתכון:", error);
    }
}
}

const recipeStore = new RecipeStore();
export default recipeStore;
