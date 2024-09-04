let Word = require('../models/wordModel');
let connection = require('../db'); // Import the db connection

let wordList=[];

// List of words
exports.wordList = function (req, res) {
  connection.query("SELECT * FROM word;", function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).send('Error getting words');
    } else {
      console.log(result); // Affiche les résultats pour déboguer
      res.render('wordList.ejs', { dictionary: result });
    }
  });
};


// Form to add a word
exports.wordFormAdd = function (req, res) {
    res.render('wordAdd.ejs', { idword: '-1', english_word: "", french_translation: "" });
};

// Delete a word
exports.wordRemove = function (req, res) {
    let idword = req.params.idword;
    connection.query('DELETE FROM word WHERE idword = ?;', [idword], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Error.');
        } else {
            res.redirect('/word');
        }
    });
};

// Add a word
exports.wordNew = function (req, res) {
  let idword = req.body.idword;
  let english_word = req.body.english_word;
  let french_translation = req.body.french_translation;

  if (idword >= 0) { // Update
      connection.query(
          "UPDATE word SET english_word = ?, french_translation = ? WHERE idword = ?",
          [english_word, french_translation, idword],
          function (err, result) {
              if (err) {
                  console.log(err);
                  res.status(500).send('Error');
              } else {
                  res.redirect('/word');
              }
          }
      );
  } else { // Add
      let newWord = { english_word: english_word, french_translation: french_translation };
      connection.query(
          "INSERT INTO word SET ?",
          newWord,
          function (err, result) {
              if (err) {
                  console.log(err);
                  res.status(500).send('Error');
              } else {
                  res.redirect('/word');
              }
          }
      );
  }
};


exports.wordRandom = function (req, res) {
    connection.query("SELECT * FROM word ORDER BY RAND() LIMIT 1;", function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).send('Error getting random word');
      } else {
        res.render('wordRandom.ejs', { word: result[0] });
      }
    });
  };

  exports.checkTranslation = function (req, res) {
    let idword = req.body.idword;
    let userTranslation = req.body.french_translation;

    connection.query("SELECT french_translation FROM word WHERE idword = ?;", [idword], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Error checking translation');
        } else {
            let correctTranslation = result[0].french_translation;
            let message;
            if (userTranslation.toLowerCase() === correctTranslation.toLowerCase()) {
                message = 'Good !';
            } else {
                message = `Wrong, the translation is: ${correctTranslation}`;
            }
            res.send(`
                <h1>${message}</h1>
                <a href="/word/random">Test another word</a>
                <br />
                <a href="/word">Back to vocabulary list</a>
            `);
        }
    });
};
