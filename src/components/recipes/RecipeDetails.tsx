import { Typography, List, ListItem, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Recipe } from "../../types";

interface RecipeDetailsProps {
    onClose: () => void;
    recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ onClose, recipe }) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" color="primary">
                    {recipe.title}
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>

            <Typography variant="h6" color="primary" gutterBottom>
                תיאור:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {recipe.description}
            </Typography>

            <Typography variant="h6" color="primary" gutterBottom>
                רכיבים:
            </Typography>
            <List>
                {recipe.ingredients.map((ingredient, index) => (
                    <ListItem key={index}>• {ingredient}</ListItem>
                ))}
            </List>

            <Typography variant="h6" color="primary" gutterBottom>
                הוראות הכנה:
            </Typography>
            <Typography variant="body1">
                {recipe.instructions}
            </Typography>
        </div>
    );
};

export default RecipeDetails;
