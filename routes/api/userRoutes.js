const { Users } = require("../../models");
const inputCheck = require("../../utils/inputCheck");

const router = require("express").Router();

router.get("/test", (req, res) => {
    res.send("work");
});

router.post('/signup', async (req, res) => {
    const { body } = req;
    try {
       const errors = inputCheck(body, 'first_name', 'last_name', 'email', 'passwords');
        if(errors){
            res.status(400).json({error: errors});
            return;
        }

        const results = await Users.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            passwords: body.passwords
        });

        if (!results) {
            throw 'Failed to create user';
        }
    
        const user = results.get({plain: true});

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.email = user.email;
            req.session.loggedIn = true;
        });

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/login', async (request, response) => {
    console.log(request.body.email)
    try {
        // Capture the input fields
	    let email = request.body.email;
	    let passwords = request.body.passwords;
	    // Ensure the input fields exists and are not empty
	    if (email && passwords) {
	    	// Execute SQL query that'll select the account from the database based on the specified username and password
	    	const results = await Users.findOne({ where: {email}});

            if (!results) {
                throw 'No user found matching email/password';
            }
            // Validate user
            // const isValid = results.checkPassword(passwords);

            // if (!isValid) {
            //     throw 'Invalid email or password';
            // }

            const user = results.get({plain: true});
console.log(user)
user.loggedIn = true
            // request.session.save(() => {
            //     request.session.user_id = user.id;
            //     request.session.email = user.email;
            //     request.session.loggedIn = true;
            // });
            request.session.user = user
        console.log(request.session)
        response.redirect('/search.html');
	    } else {
	    	response.status(400).json('Please enter Username and Password!');
	    	response.end();
	    }
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
});

module.exports = router;