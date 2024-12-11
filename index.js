const express = require("express");
const { MongoClient } = require("mongodb");
const multer = require('multer');

const app = express();
const PORT = 5038;

const connectionString = "mongodb+srv://martinez:Password123@cluster0.d1lup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const databaseName = "pokemon";

let database; // Placeholder for the database connection
app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); next(); });

// Connect to MongoDB and start the server
MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        database = client.db(databaseName);
        console.log("Connected to database:", databaseName);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to connect to the database:", error.message);
    });

// Route to get all inventory
app.get("/pokemonInventory/GetAllInventory", (req, res) => {
    if (!database) {
        return res.status(500).send("Database not connected");
    }

    database.collection("pokemonInventory").find({}).toArray()
        .then(results => res.send(results))
        .catch(error => res.status(500).send("Error retrieving data: " + error.message));
});

app.post("/pokemonInventory/AddInventory", multer().none(), (req, res) => {
    if (!database) {
        return res.status(500).send("Database not connected");
    }

    // Destructure the fields from the request body
    const { 
        cardName, 
        cardSet, 
        setNumber, 
        rarity, 
        type, 
        condition, 
        language, 
        quantity 
    } = req.body;

    // Validation to ensure all fields are provided
    if (!cardName || !cardSet || !setNumber || !rarity || !type || !condition || !language || !quantity) {
        return res.status(400).send("Missing required fields");
    }

    // Count documents to generate a new ID
    database.collection("pokemonInventory").countDocuments({}, (error, numOfDocs) => {
        if (error) {
            return res.status(500).send("Error counting documents: " + error.message);
        }

        // Insert the new document
        const newCard = {
            id: numOfDocs + 1, // Incremental ID
            cardName,
            cardSet: parseInt(cardSet, 10),
            setNumber: parseInt(setNumber, 10),
            rarity,
            type,
            condition,
            language,
            quantity: parseInt(quantity, 10),
        };

        database.collection("pokemonInventory").insertOne(newCard, (error, result) => {
            if (error) {
                return res.status(500).send("Error inserting data: " + error.message);
            }

            res.status(201).send({
                message: "Card added successfully",
                card: newCard,
            });
        });
    });
});

app.delete("/pokemonInventory/DeleteInventory", (req, res) => {
    if (!database) {
        return res.status(500).send("Database not connected");
    }

    // Extract the `id` from the request body or query parameters
    const { id } = req.body;

    // Validate input
    if (!id) {
        return res.status(400).send("Missing required field: id");
    }

    // Delete the document with the given `id`
    database.collection("pokemonInventory").deleteOne({ id: parseInt(id, 10) }, (error, result) => {
        if (error) {
            return res.status(500).send("Error deleting inventory: " + error.message);
        }

        if (result.deletedCount === 0) {
            return res.status(404).send("Inventory with the specified ID not found");
        }

        res.status(200).send(`Inventory with ID ${id} deleted successfully`);
    });
});


app.put("/pokemonInventory/UpdateInventory", (req, res) => {
    if (!database) {
        return res.status(500).send("Database not connected");
    }

    // Extract the `id` and fields to update from the request body
    const { id, cardName, cardSet, setNumber, rarity, type, condition, language, quantity } = req.body;

    // Validate that an ID is provided
    if (!id) {
        return res.status(400).send("Missing required field: id");
    }

    // Create an object for the fields to update
    const updateFields = {};

    // Only add fields to the update object if they are provided
    if (cardName) updateFields.cardName = cardName;
    if (cardSet) updateFields.cardSet = parseInt(cardSet, 10);
    if (setNumber) updateFields.setNumber = parseInt(setNumber, 10);
    if (rarity) updateFields.rarity = rarity;
    if (type) updateFields.type = type;
    if (condition) updateFields.condition = condition;
    if (language) updateFields.language = language;
    if (quantity) updateFields.quantity = parseInt(quantity, 10);

    // Check if there are any fields to update
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).send("No fields to update provided");
    }

    // Perform the update operation
    database.collection("pokemonInventory").updateOne(
        { id: parseInt(id, 10) }, // Find document by ID
        { $set: updateFields },  // Update only the provided fields
        (error, result) => {
            if (error) {
                return res.status(500).send("Error updating inventory: " + error.message);
            }

            if (result.matchedCount === 0) {
                return res.status(404).send("Inventory with the specified ID not found");
            }

            res.status(200).send(`Inventory with ID ${id} updated successfully`);
        }
    );
});

app.get("/pokemonInventory/GetInventory", (req, res) => {
    if (!database) {
        return res.status(500).send("Database not connected");
    }

    // Extract `id` from the query parameters
    const { id } = req.query;

    // Validate input
    if (!id) {
        return res.status(400).send("Missing required field: id");
    }

    // Find the document by `id`
    database.collection("pokemonInventory").findOne({ id: parseInt(id, 10) }, (error, result) => {
        if (error) {
            return res.status(500).send("Error retrieving inventory: " + error.message);
        }

        if (!result) {
            return res.status(404).send("Inventory with the specified ID not found");
        }

        res.status(200).send(result);
    });
});
