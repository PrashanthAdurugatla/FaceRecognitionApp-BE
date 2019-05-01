const Clarifai = require('clarifai');

//// Instantiate a new Clarifai app by passing in your API key.You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: '1d009cd362b1461a898add23c34e4420'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
        res.json(data);
})
.catch(err => res.status(400).json('unable to work with API'))
}



const handleImage = (req,res,db) =>{
    const {id} = req.body;


    db.from('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
        res.json(entries[0])
})
.catch(err => res.status(400).json('Unable To Get Entries'));

}

module.exports = {
    handleImage:handleImage
}