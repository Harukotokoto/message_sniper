import { Event } from '../../lib/modules/Event';
import { Snipe } from '../../lib/modules/classes/Snipe';

export default new Event('messageDelete', async (message) => {
  if (message.partial) return;

  const snipe = new Snipe();

  const isAllowed = await snipe.check(message.author.id, 'delete');
  if (!isAllowed) return;

  await snipe.save(message, 'delete');
});
