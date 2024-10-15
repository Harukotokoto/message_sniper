import { Event } from '../../lib/modules/Event';
import { Snipe } from '../../lib/modules/classes/Snipe';

export default new Event('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.partial || newMessage.partial) return;
  if (!oldMessage.content && !newMessage.content) return;

  if (oldMessage.author.bot) return;

  const snipe = new Snipe();

  const isAllowed = await snipe.check(newMessage.author.id, 'edit');
  if (!isAllowed) return;

  await snipe.save(newMessage, 'edit', oldMessage);
});
