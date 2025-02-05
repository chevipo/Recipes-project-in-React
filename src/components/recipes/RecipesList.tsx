import { observer } from "mobx-react";
import recipeStore from "../store/RecipeStore";
import { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper, List, ListItem, Card, CardContent, Button } from "@mui/material";
import RecipeDetails from "./RecipeDetails";
import { Recipe } from "../../types";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
        <>
        <Container maxWidth="lg">
            <Typography variant="h2"  align="center" color="warning" sx={{paddingTop: 10, mb: 4, mt: 2 ,fontWeight: 'bold',fontFamily: "Pacifico"}}>
            🍜 RECIPES 🍰
            </Typography>
            <Typography variant="h4" align="center" color="primary"
                          sx={{ mb: 4,mt: 2,fontWeight: 'bold',fontFamily: "Fredoka ",
                                 background: 'linear-gradient(90deg,rgb(177, 220, 249),rgb(53, 186, 234),rgb(17, 11, 100))', 
                                 WebkitBackgroundClip: 'text',  WebkitTextFillColor: 'transparent',
                            }} 
             >  🍽️ המאגר הגדול של המתכונים שלנו 🍽️</Typography>
            {recipeStore.loading ? (
                 <Box sx={{ display: 'flex' , justifyContent: 'center',}}>
                     <CircularProgress sx={{ mr: 2 ,color:'rgb(255, 12, 33)'}}/> <Typography variant="h4" sx={{color:'rgb(77, 10, 16)'}}>LOADING...</Typography>
                 </Box>
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
                                                        backgroundColor: '#79C2FF',
                                                        color: 'white', 
                                                        '&:hover': { backgroundColor: '#40FE7F' },
                                                        top: '10%', 
                                                        position: 'relative', 
                                                        transform: 'translateY(-50%)' 
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
        </>
    );
});

export default Recipes;
