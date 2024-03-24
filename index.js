// Import necessary modules
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

// Create an Express application
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Parse URL-encoded bodies (as sent by HTML forms)
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('js'));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Define routes

app.get("/", (req, res) => {
  res.render("index.ejs", { data: "Cat facts"});
});
app.get("/fact", async (req, res) => {
  try {
    // Make an API request using Axios to fetch a random cat fact
    const response1 = await axios.get("https://catfact.ninja/fact");
    const fact = response1.data;   
    const img = "https://cataas.com/cat?type=square&fit=cover&position=top&width=250&height=250"; 
    // Render the index.ejs template with the retrieved data
    res.render("index.ejs", { data: `"`+fact.fact+`"`, img: img });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data");
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
