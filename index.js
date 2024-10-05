import 'dotenv/config';
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;
 

app.post("/teas", (req, res) => {
    const {name, price} = req.body;
    const newTea = {
        name,
        price,
        id: nextId++
    }
    teaData.push(newTea);
    res.status(201).send(newTea);
})

app.get("/allteas", (req, res) => { 
    if(teaData.length < 1) {
        res.status(204).send("No teas found!");
    }

    res.status(200).send(teaData);
})

app.get("/tea/:id", (req, res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));

    if(!tea) {
        res.status(404).send("No tea found");
    }

    res.status(200).send(tea);
})

app.put("/tea/:id", (req, res) => {
    const tea = teaData.find((item) => item.id === parseInt(req.params.id));
    if(!tea) {
        res.status(404).send("Tea not found");
    }

    const {name, price} = req.body;

    tea.name = name;
    tea.price = price;

    res.status(200).send(tea);
})

app.delete("/tea/:id", (req, res) => {
    teaData = teaData.filter((item) => item.id !== parseInt(req.params.id));
    
    res.status(200).send(teaData);
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    
})