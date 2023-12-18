const Note = require('../models/note');
const TokenGenerator = require('../lib/token_generator');

const NotesController = {
  FindAll: async (req, res) => {
    try {
      const notes = await Note.find();
      if (!notes) {
        throw new Error('Notes not found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ notes: notes, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  FindById: async (req, res) => {
    try {
      const notes = await Note.findById(req.params.id);
      if (!notes) {
        throw new Error('No notes found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ notes: notes, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  Create: async (req, res, next) => {
    req.body.user = req.user_id;
    try {
      const note = await Note.create(req.body);
      if (!note) {
        throw new Error('Note could not be created');
      }
      // const token = TokenGenerator.jsonwebtoken(req.user_id);
      // res.status(201).json({
      //   message: 'Note has been created',
      //   token: token,
      //   note: note,
      // });
      req.note = note;
      next();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  DeleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await Note.findByIdAndDelete(id);
      if (!note) {
        throw new Error('Note does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: 'Note has been deleted',
        token: token,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  UpdateById: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!note) {
        throw new Error('Note does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: 'Note has been updated',
        token: token,
        note: note,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = NotesController;
