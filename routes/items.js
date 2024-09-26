const express = require("express");
const router = new express.Router();
const items = require('../fakeDb')


// GET /items - Get all items
router.get('/', (req, res) => {

    return res.json(items);
});


// POST /items - Add an item to the shopping list
router.post('/', (req, res) => {
    const { name, price } = req.body;
    newItem = { name, price }
    items.push(newItem);
    return res.status(201).json({ added: newItem })
})


// GET /items/:name - Get a single item by name
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
        return res.status(404).json({ error: "Item not found" })
    }
    return res.json(foundItem)
})


// PATCH /items/:name - Update an item's name and/or price
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
        return res.status(404).json({ error: "Item not found" })
    }
    foundItem.name = req.body.name || foundItem.name
    foundItem.price = req.body.price || foundItem.price

    return res.json({ updated: foundItem });

})



// DELETE /items/:name - Delete an item by name
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" })
    }
    items.splice(itemIndex, 1)
    return res.json({ message: "Deleted" })
})

module.exports = router;
