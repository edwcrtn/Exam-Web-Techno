let express = require('express');
let router= express.Router();

let wordController = require('./controllers/wordController');

//Liste des routes vers les contrôleurs

//redirection si à la racine du site
router.get('/',(req, res) => res.redirect('/word'))  //get -> récupérer data de serveur sans modifier l'état du serveur

router.get('/word', wordController.wordList);
router.get('/word/add', wordController.wordFormAdd);
router.get('/word/remove/:idword', wordController.wordRemove);
router.post('/word/new',wordController.wordNew);  //post -> envoyer data au serveur et le modifier
router.get('/word/random', wordController.wordRandom);
router.post('/word/check', wordController.checkTranslation);

module.exports = router;