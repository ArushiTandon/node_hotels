const express = require('express');
const router = express.Router();
const Menu = require('../models/menu')


router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const menuItem = new Menu(data);
        const response = await menuItem.save();
        console.log('Item Saved');
        res.status(200).json(response);
        
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
        
    }
})

router.get('/', async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store');
        const data = await Menu.find();
        console.log('Item fetched');
        res.status(200).json(data);    
    } 
    catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:tasteType' ,async(req,res) => {
    try {
        const tasteType = req.params.tasteType;
        console.log('Received tasteType:', tasteType);

        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){

            const response = await Menu.find({ taste: tasteType });
            console.log('Database response:', response);
            
            console.log('response fetched');
            res.status(200).json(response);
        }else {
            res.status(404).json({error: "Invalid taste Type"});
        }

    } catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;