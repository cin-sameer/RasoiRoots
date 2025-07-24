import express from "express";
import multer from "multer";
import { Recipe } from "../model/recipes.model.js";
import { storage } from "../utils/cloudinary.js"; // ✅ import cloudinary storage

const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, ingredients, description, category } = req.body;

    const newRecipe = new Recipe({
      title,
      ingredients,
      description,
      category,
      image: req.file.path, // ✅ Cloudinary URL
    });

    await newRecipe.save();
    res.status(201).json({ success: true, recipe: newRecipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error uploading recipe" });
  }
});



router.get("/",async(req,res)=>
{
    try{
        const recipies=await Recipe.find();
        res.json(recipies);
    }
    catch(err)
    {
     res.status(500).json({message:err.message})
    }
})


router.get("/search",async(req,res)=>
{
    try {
        const query=req.query.q
        const result=await Recipe.find({title:{ $regex: query, $options: 'i' }})
        res.json(result)
    } catch (error) {
     res.status(500).json({ message: 'Failed to fetch recipe' });
    }
})

router.get("/:id",async(req,res)=>
{
    try{
        const recipi=await Recipe.findById(req.params.id);
        if(!recipi)
        {
            return res.status(402).json({message:"recipie not found"})

        }
        res.json(recipi)
    }
    catch(err)
    {
        res.status(500).json({ message: 'Failed to fetch recipe' });
    }
})





export default router;
