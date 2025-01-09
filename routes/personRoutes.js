const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');


router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringyfy(payload));
        const token = generateToken(response.username);
        console.log('token:', token);
        
        res.status(200).json({response: response, token: token});
    }
    catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

//login 
router.post('/login', async(req, res) => {
    try {
        
        //extract username and password
        const {username, password} = req.body;

        //find user by username
        const user = await Person.findOne({username: username});

        //if user not found or password is incorrect
        if(!user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
        }

        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);

        //return token as response
        res.json({token: token});

    } catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

    //profile route
    router.get('/profile', jwtAuthMiddleware, async(req, res) => {
       try {
        const userData = req.user;
        console.log("userData:", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
       } catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
       }
    })

router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('fetched', data);
        res.status(200).json(data);    
    } 
    catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:workType', async(req, res) => {
    try{
        const workType = req.params.workType;
        if(workType =='chef' || workType == 'manager' || workType == 'waiter'){

            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        
        } else {
            res.status(404).json({error: "Invalid work Type"});
        }
    } catch(err){
        console.log('error:', err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id',async(req,res)=> {
    try {
        const id = req.params.id;
        const data = req.body;

        const response = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true, 
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
        
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person deleted'});
        

    } catch (error) {
        console.log('error:', error);
        res.status(500).json({error: 'Internal server error'});
    }

})

module.exports = router;