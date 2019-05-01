const handleRegister = (req, res, db, bcrypt)=>{
    const { email, name, password} = req.body;


    if (!email || !name || !password) {
        res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
        hash: hash,
        email: email
    })
        .into('login')
        .returning('email')
        .then(loginEmail => {
        return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],                    //use [ ] since it retun type is an object
                name:name,
                joined: new Date()
            })
            .then(user => {
            res.json(user[0]);      //Should return an obj not an array
            })
        })
    .then(trx.commit)
            .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))   //Don't give your client with all your internal info. so instead just send a err msg as(Unable to register)
    }


module.exports = {
    handleRegister: handleRegister
}