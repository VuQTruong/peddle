import express from 'express';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';
import Item from '../../models/item';
import { QueryAnalyzer } from '../../utilities/query-analyzer';

const router = express.Router();

router.get('/api/items/filter', currentUser, requireAuth, async (req, res) => {
  const query = new QueryAnalyzer(Item.find(), req.query).filter().query;
  console.log('Query', query);
  const items = await query;

  return res.status(200).send({
    status: '200',
    message: 'Success',
    data: {
      items,
    },
  });
});

export { router as filterItemsRouter };
