import express from 'express';
import {
  createLuggage,
  deleteLuggage,
  updateLuggage,
  getLuggage,
  getLuggages,
} from '../../controllers/airlines/Luggage.js';

const router = express.Router();

router.post('/', createLuggage);
router.delete('/:id', deleteLuggage);
router.put('/:id', updateLuggage);
router.get('/:id', getLuggage);
router.get('/', getLuggages); 
export default router;
