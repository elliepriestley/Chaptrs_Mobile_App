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
  DeleteById: async (req, res, next) => {
    try {
      const { noteId: id } = req.params;
      const note = await Note.findByIdAndDelete(id);
      if (!note) {
        throw new Error('Note does not exist');
      }
      // const token = TokenGenerator.jsonwebtoken(req.user_id);
      // res.status(201).json({
      //   message: 'Note has been deleted',
      //   token: token,
      // });
      req.note = note;
      next();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  UpdateById: async (req, res, next) => {
    try {
      // req.body.user = req.user_id;
      const { noteId: id } = req.params;
      const note = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!note) throw new Error('Note does not exist');

      if (note.user._id.toString() !== req.user_id) {
        // if note.user._id is not equal to req.user_id
        throw new Error('Note does not belong to user');
      }

      req.note = note; // add note to req object so it can be used by the next middleware
      next();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = NotesController;
