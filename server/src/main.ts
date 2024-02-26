import { decode } from "base64-arraybuffer";
import cors from "cors";
import "dotenv/config";
import express from "express";
import multer from "multer";
import { supabase } from "./supabase";

// initialize express app
const app = express();

app.use(cors()); // enable `CORS` for all routes
app.use(express.json()); // enable parsing of json request body
app.use(express.urlencoded({ extended: true }));

// set the port and provide fallback
// process.env is how we access environment variables with dotenv
const PORT = process.env.PORT || 3001;

// Store uploaded files in memory
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

app.post("/api/images", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: "Please upload a file" });
      return;
    }

    // decode file buffer to base64
    const fileBase64 = decode(file.buffer.toString("base64"));

    //upload the file to supabase
    const { data, error } = await supabase.storage
      .from("images")
      .upload(file.originalname, fileBase64, {
        contentType: "image/png",
      });

    if (error) {
      throw error;
    }

    // get public url of the uploaded file
    const { data: image } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    res.status(200).json({ image: image.publicUrl });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
