import { FormEvent, useRef, useState } from "react";
import { Modal, Box, TextField, Button, Typography, Stack } from "@mui/material";
import recipeStore from "../store/RecipeStore";
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

const AddRecipe = () => {
  const [open, setOpen] = useState(true);
  const idRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const authorIdRef = useRef<HTMLInputElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newRecipe = {
       id: Number(idRef.current?.value) || 0,
       title: titleRef.current?.value || "",
       description: descriptionRef.current?.value || "",
       authorId: Number(authorIdRef.current?.value) || 0,
       ingredients: ingredientsRef.current?.value.split(",").map((item) => item.trim()) || [],
       instructions: instructionsRef.current?.value || "",
    };
    try {
        console.log(localStorage.getItem('userId'));
        recipeStore.addRecipe(newRecipe);

        if (open) {
          titleRef.current!.value = "";
          descriptionRef.current!.value = "";
          authorIdRef.current!.value = "";
          ingredientsRef.current!.value = "";
          instructionsRef.current!.value = "";
        }
       setOpen(false);
    } catch (error: any) {
        console.error("שגיאה בהוספת המתכון:", error);
        alert(`אירעה שגיאה בעת שמירת המתכון: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={styleForm}>
        <Typography variant="h5" align="center" color="primary" fontWeight="bold" gutterBottom>
          הוספת מתכון חדש 🍽️
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="כותרת המתכון" inputRef={titleRef} fullWidth required />
            <TextField label="תיאור" inputRef={descriptionRef} fullWidth required multiline rows={2} />
            <TextField type="number" label="קוד שף" inputRef={authorIdRef} fullWidth required />
            <TextField label="מצרכים (מופרדים בפסיק)" inputRef={ingredientsRef} fullWidth required multiline rows={3} />
            <TextField label="הוראות הכנה" inputRef={instructionsRef} fullWidth required multiline rows={4} />

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                mt: 1,
                fontWeight: "bold",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { backgroundColor: "#40FE7F", transform: "scale(1.05)" },
              }}
            >
              שלח מתכון 🍳
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRecipe;
// import { Modal, Box, TextField, Button, Typography, Stack } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import recipeStore from "../store/RecipeStore";
// import { Receipt } from "@mui/icons-material";
// import {Recipe} from "../../types"

// const styleForm = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: 4,
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 2,
// };

// const schema = yup.object().shape({
//   id:yup.string().required("שדה חובה"),
//   title: yup.string().required("שדה חובה"),
//   description: yup.string().required("שדה חובה"),
//   authorId: yup.number().typeError("חובה להזין מספר").required("שדה חובה"),
//   ingredients: yup.string().required("שדה חובה"),
//   instructions: yup.string().required("שדה חובה"),
// });

// const AddRecipe = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data: any) => {
//     const newRecipe = {
//       id:data.id,
//       title: data.title,
//       description: data.description,
//       authorId: Number(data.authorId),
//       ingredients: data.ingredients.split(",").map((item: string) => item.trim()),
//       instructions: data.instructions,
//     };

//     try {
//       console.log(localStorage.getItem("userId"));
//       recipeStore.addRecipe(newRecipe:Recipe);
//       reset();
//     } catch (error: any) {
//       console.error("שגיאה בהוספת המתכון:", error);
//       alert(`אירעה שגיאה בעת שמירת המתכון: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <Modal open={true} onClose={() => reset()}>
//       <Box sx={styleForm}>
//         <Typography variant="h5" align="center" color="primary" fontWeight="bold" gutterBottom>
//           הוספת מתכון חדש 🍽️
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Stack spacing={2}>
//             <TextField label="כותרת המתכון" fullWidth {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
//             <TextField label="תיאור" fullWidth multiline rows={2} {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
//             <TextField type="number" label="קוד שף" fullWidth {...register("authorId")} error={!!errors.authorId} helperText={errors.authorId?.message} />
//             <TextField label="מצרכים (מופרדים בפסיק)" fullWidth multiline rows={3} {...register("ingredients")} error={!!errors.ingredients} helperText={errors.ingredients?.message} />
//             <TextField label="הוראות הכנה" fullWidth multiline rows={4} {...register("instructions")} error={!!errors.instructions} helperText={errors.instructions?.message} />

//             <Button type="submit" variant="contained" color="success" sx={{ mt: 1, fontWeight: "bold", borderRadius: 3, transition: "0.3s", "&:hover": { backgroundColor: "#40FE7F", transform: "scale(1.05)" } }}>
//               שלח מתכון 🍳
//             </Button>
//           </Stack>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default AddRecipe;

