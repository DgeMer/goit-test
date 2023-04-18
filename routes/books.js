let express = require('express');
let router = express.Router();
const Joi = require('joi');

const Book = require('../schemas/book');

const joiSchema = Joi.object({
	title: Joi.string().alphanum().min(1).max(100).required(),
	author: Joi.string().alphanum().min(1).max(100).required(),
});

/* GET all book */
router.get('/', async function(req, res) {
	try {
		const page = parseInt(req.params['page']) || 0;
		const limit = parseInt(req.params['limit']) || 50;
		
		const books = await Book.find().skip(page * limit).limit(limit).exec();
		
		res.send(books);
	} catch(err) {
		console.error('Books: get all. Error:', err);
		res.status(500).send('Something went wrong. Try again later.');
	}
});


/* GET book by id*/
router.get('/:id', async function(req, res) {
	try {
		const bookId = req.params['id'];
		
		let book = await Book.findById(bookId).exec();
		
		if(!book) {
			return res.status(404).send('Not found');
		}
		
		res.send(book);
	} catch (err) {
		console.error('Books: get by id. Error:', err);
		res.status(500).send('Something went wrong. Try again later.');
	}
});


/* POST add book*/
router.post('/', async function(req, res) {
	try {
		let {title, author} = req.body;
		const { error, value } = joiSchema.validate({title: title, author: author});
		
		if(error) {
			console.error('Books: add new. Error:', error);
			return res.status(500).send('Incorrectly filled fields: ' + error);
		}
		
		const book = await Book.create({ title: value.title, author: value.author});
		
		res.send(book);
	} catch (err) {
		console.error('Books: add new. Error:', err);
		res.status(500).send('Something went wrong. Try again later.');
	}
});


/* PUT update book*/
router.put('/:id', async function(req, res) {
	try {
		const bookId = req.params['id'];
		let {title, author} = req.body;
		const { error, value } = joiSchema.validate({title: title, author: author});
		
		if(error) {
			console.error('Books: update. Error:', error);
			return res.status(500).send('Incorrectly filled fields: ' + error);
		}
		
		const book = await Book.findByIdAndUpdate(bookId, { title: value.title, author: value.author}).exec();
		
		res.send(book);
	} catch (err) {
		console.error('Books: update. Error:', err);
		res.status(500).send('Something went wrong. Try again later.');
	}
});


/* DELETE by id */
router.delete('/:id', async function(req, res) {
	try {
		const bookId = req.params['id'];
		
		await Book.findByIdAndDelete(bookId);
		
		res.send(true);
	} catch (err) {
		console.error('Books: delete. Error:', err);
		res.status(500).send('Something went wrong. Try again later.');
	}
})


module.exports = router;
