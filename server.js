const express = require('express');

const app = express(); 
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//setuop routes 
app.get("/", (req,res)=>{

});

//listening to the express server 
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});