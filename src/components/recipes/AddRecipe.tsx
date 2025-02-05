import { Modal, Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import recipeStore from "../store/RecipeStore";
import { useState } from "react";

const styleForm = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const schema = yup.object().shape({
  title: yup.string().required("כותרת המתכון היא שדה חובה"),
  description: yup.string().required("תיאור הוא שדה חובה"),
  authorId: yup.number().typeError("קוד השף חייב להיות מספר").required("קוד השף הוא שדה חובה"),
  ingredients: yup.string().required("יש להזין מצרכים"),
  instructions: yup.string().required("הוראות ההכנה הן שדה חובה"),
});

const AddRecipe = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const newRecipe = {
      ...data,
      authorId: Number(data.authorId),
      ingredients: data.ingredients.split(",").map((item:string) => item.trim()),
    };
    try {
      recipeStore.addRecipe(newRecipe);
      reset(); 
      setOpen(false);
    } catch (error: any) {
      console.error("erorr: ", error);
    }
  };

  const [open, setOpen] = useState(true);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={styleForm}>
        <Typography variant="h5" align="center" color="primary" fontWeight="bold" gutterBottom>
          הוספת מתכון חדש 🍽️
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField label="כותרת המתכון" fullWidth {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
            <TextField label="תיאור" fullWidth multiline rows={2} {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
            <TextField type="number" label="קוד שף" fullWidth {...register("authorId")} error={!!errors.authorId} helperText={errors.authorId?.message} />
            <TextField label="מצרכים (מופרדים בפסיק)" fullWidth multiline rows={3} {...register("ingredients")} error={!!errors.ingredients} helperText={errors.ingredients?.message} />
            <TextField label="הוראות הכנה" fullWidth multiline rows={4} {...register("instructions")} error={!!errors.instructions} helperText={errors.instructions?.message} />

            <Button type="submit" variant="contained"  sx={{ backgroundColor: "#FF7D7D",mt: 1, fontWeight: "bold", borderRadius: 3, transition: "0.3s", "&:hover": { backgroundColor: "#40FE7F", transform: "scale(1.05)" } }}>
              שלח מתכון 🍳
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRecipe;

