//import necessary packages
import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

//basic setup
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//api key generated from the site
const apiKey = "36f8515f-0347-4f8b-a15c-591ba51dad86";

//first get request for when the site is loaded
app.get("/", async (req, res) => {
    //gets a random number between 0 and 2999. Used later in the code to as the API URL ending
    const randomId = Math.floor(Math.random() * 3000);
    
    try {
        const result = await axios.get(`https://api.balldontlie.io/v1/players/${randomId}`, {
            //api key goes in headers and is specified to Authorization:
            headers: {
                "Authorization": apiKey
            }
        });
        console.log("API Response:", result.data);
        res.render("index.ejs", { playerData: JSON.stringify(result.data) });
    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
});

//allows users to put in a players name and get their info
app.post("/get-name", async (req, res) => {
    const { first_name, last_name } = req.body;
    console.log("Data submitted in the POST request:", req.body);
    try {
        const result = await axios.get('https://api.balldontlie.io/v1/players/', {
        //parameters being pasted into the api link from the form   
        params: {
                first_name: first_name,
                last_name: last_name
            },
            headers: {
                "Authorization": apiKey
            }
        });
        console.log("API Response:", result.data);
        res.render("index.ejs", { playerData: JSON.stringify(result.data)});
    } catch (error) {
        console.error("Error fetching player data:", error);
        const responseData = error.response ? error.response.data : { message: 'Unknown error' };
        res.render("index.ejs", { playerData: JSON.stringify(responseData) });
    }  
});
//same code as get request except it runs when the button is clicked
  app.get("/get-random-player", async (req, res) => {
    const randomId = Math.floor(Math.random() * 3000);
    
    try {
        const result = await axios.get(`https://api.balldontlie.io/v1/players/${randomId}`, {
            headers: {
                "Authorization": apiKey
            }
        });
        console.log("API Response:", result.data);
        res.render("index.ejs", { playerData: JSON.stringify(result.data) });
    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 
});


