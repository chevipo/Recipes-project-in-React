// import { observer } from "mobx-react";
// import recipeStore from "../store/RecipeStore";
// import { useEffect } from "react";
// import { Container, Typography, Grid, Paper, List, ListItem, Card, CardContent, Button } from "@mui/material";

// const Recipes = observer(() => {
//     useEffect(() => {
//         recipeStore.fetchRecipes(); // מבצע את קריאת ה-API פעם אחת
//     }, []);

//     return (
//         <Container maxWidth="lg">
//             <Typography variant="h3" align="center" sx={{ mb: 4, mt: 2 }}>
//                 Recipes 🍽️🍜🍴
//             </Typography>

//             {recipeStore.loading ? (
//                 <Typography variant="h6" align="center">⭕ LOADING...</Typography>
//             ) : (
//                 <Grid container>
//                     <Grid item xs={6}></Grid>
//                     <Grid item xs={6}>
//                         <Paper elevation={3} sx={{ p: 2, maxHeight: '80vh', overflow: 'auto' }}>
//                             <List>
//                                 {recipeStore.recipes.map((recipe) => (
//                                     <ListItem key={recipe.id} sx={{ mb: 2 }}>
//                                         <Card sx={{ width: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: 3 } }}>
//                                             <CardContent>
//                                                 <Typography variant="h6" color="primary" gutterBottom>
//                                                     {recipe.title}
//                                                 </Typography>
//                                                 <Typography variant="body1" color="text.secondary">
//                                                     {recipe.description}
//                                                 </Typography>
//                                                 <Typography variant="body1" color="text.secondary">
//                                                     קוד השף: {recipe.authorId}
//                                                 </Typography>
//                                                 <Button variant="contained" color="secondary" sx={{ 
//                                                         mt: 2, 
//                                                         alignSelf: 'flex-end', 
//                                                         backgroundColor: '#8e44ad', 
//                                                         color: '#fff', 
//                                                         fontWeight: 'bold', 
//                                                         borderRadius: '20px', 
//                                                         border: '2px solid #6c3483', 
//                                                         padding: '8px 16px', 
//                                                         '&:hover': { backgroundColor: '#6c3483' }  }}  >
//                                                     🫵 להצגת המתכון</Button>
//                                             </CardContent>
//                                         </Card>
//                                     </ListItem>
//                                 ))}
//                             </List>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             )}
//         </Container>
//     );
// });

// export default Recipes;




// import { observer } from "mobx-react";
// import recipeStore from "../store/RecipeStore";
// import { useEffect, useState } from "react";
// import { Container, Typography, Grid, Paper, List, ListItem, Card, CardContent, Button, Dialog } from "@mui/material";
// import RecipeDetails from "./RecipeDetails"; // ייבוא קומפוננטת פרטי המתכון
// import { Recipe } from "../../types";

// const Recipes = observer(() => {
//     const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
//     const [open, setOpen] = useState(false); // סטייט לפתיחת/סגירת הדיאלוג

//     useEffect(() => {
//         recipeStore.fetchRecipes(); // קריאת ה-API לקבלת מתכונים
//     }, []);

//     const handleOpen = (recipe : Recipe) => {
//         setSelectedRecipe(recipe); // שמירת המתכון שנבחר
//         setOpen(true); // פתיחת הדיאלוג
//     };

//     const handleClose = () => {
//         setOpen(false); // סגירת הדיאלוג
//         setSelectedRecipe(null); // איפוס המתכון הנבחר
//     };

//     return (
//         <Container maxWidth="lg">
//             <Typography variant="h3" align="center" sx={{ mb: 4, mt: 2 }}>
//                 Recipes 🍽️🍜🍴
//             </Typography>

//             {recipeStore.loading ? (
//                 <Typography variant="h6" align="center">⭕ LOADING...</Typography>
//             ) : (
//                 <Grid container>
//                     <Grid item xs={6}></Grid>
//                     <Grid item xs={6}>
//                         <Paper elevation={3} sx={{ p: 2, maxHeight: '80vh', overflow: 'auto' }}>
//                             <List>
//                                 {recipeStore.recipes.map((recipe) => (
//                                     <ListItem key={recipe.id} sx={{ mb: 2 }}>
//                                         <Card sx={{ width: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: 3 } }}>
//                                             <CardContent>
//                                                 <Typography variant="h6" color="primary" gutterBottom>
//                                                     {recipe.title}
//                                                 </Typography>
//                                                 <Typography variant="body1" color="text.secondary">
//                                                     {recipe.description}
//                                                 </Typography>
//                                                 <Typography variant="body1" color="text.secondary">
//                                                     קוד השף: {recipe.authorId}
//                                                 </Typography>
//                                                 <Button 
//                                                     variant="contained" 
//                                                     color="secondary" 
//                                                     onClick={() => handleOpen(recipe)} 
//                                                     sx={{ mt: 1, float: 'right' }}
//                                                 >
//                                                     הצג מתכון 🍳
//                                                 </Button>
//                                             </CardContent>
//                                         </Card>
//                                     </ListItem>
//                                 ))}
//                             </List>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             )}

//             {/* דיאלוג להצגת פרטי המתכון */}
//             <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//                 {selectedRecipe && (
//                    <RecipeDetails open={open} onClose={handleClose} recipe={selectedRecipe} />
//                 )}
//             </Dialog>
//         </Container>
//     );
// });

// export default Recipes;
import { observer } from "mobx-react";
import recipeStore from "../store/RecipeStore";
import { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper, List, ListItem, Card, CardContent, Button } from "@mui/material";
import RecipeDetails from "./RecipeDetails";
import { Recipe } from "../../types";

const Recipes = observer(() => {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        recipeStore.fetchRecipes();
    }, []);

    const handleSelect = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleClose = () => {
        setSelectedRecipe(null);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{ mb: 4, mt: 2 }}>
                Recipes 🍽️🍜🍴
            </Typography>

            {recipeStore.loading ? (
                <Typography variant="h6" align="center">⭕ LOADING...</Typography>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {selectedRecipe && (
                            <Paper elevation={3} sx={{ p: 2, maxHeight: '80vh', overflow: 'auto' }}>
                                <RecipeDetails recipe={selectedRecipe} onClose={handleClose} />
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ p: 2, maxHeight: '80vh', overflow: 'auto' }}>
                            <List>
                                {recipeStore.recipes.map((recipe) => (
                                    <ListItem key={recipe.id} sx={{ mb: 2 }}>
                                        <Card sx={{ width: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: 3 } }}>
                                            <CardContent>
                                                <Typography variant="h6" color="primary" gutterBottom>
                                                    {recipe.title}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    {recipe.description}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    קוד השף: {recipe.authorId}
                                                </Typography>
                                                <Button 
                                                    variant="contained" 
                                                    color="warning" 
                                                    onClick={() => handleSelect(recipe)} 
                                                    sx={{ 
                                                        mt: 1, 
                                                        float: 'right', 
                                                        backgroundColor: '#79C2FF', // צבע כחול בהיר
                                                        color: 'white', 
                                                        '&:hover': { backgroundColor: '#40FE7F' }, // צבע כחול כהה בהנחת עכבר
                                                        top: '10%', 
                                                        position: 'relative', // מאפשר שמירה על ממורכזות יחסית
                                                        transform: 'translateY(-50%)' // ממורכז גובה
                                                    }}
                                                >
                                                    הצג מתכון 🍳
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
});

export default Recipes;
