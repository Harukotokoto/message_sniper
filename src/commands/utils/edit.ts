import { Command } from '../../lib/modules/Command';
import { ApplicationCommandOptionType, Colors } from 'discord.js';
import { Snipe } from '../../lib/modules/classes/Snipe';

export default new Command({
  name: 'edit',
  description:
    '編集されたメッセージの保存の許可設定を変更します(デフォルト:ON)',
  options: [
    {
      name: 'allow',
      description: 'メッセージの保存を許可します(デフォルト)',
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'deny',
      description: 'メッセージの保存を禁止します',
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  execute: {
    interaction: async ({ interaction }) => {
      const snipe = new Snipe();

      const cmd = interaction.options.getSubcommand();

      await snipe.config(interaction.user.id, 'edit', cmd === 'allow');
    },
    message: async ({ message, args }) => {
      const snipe = new Snipe();

      if (args[0] === 'allow') {
        await snipe.config(message.author.id, 'edit', true);
      } else if (args[0] === 'deny') {
        await snipe.config(message.author.id, 'edit', false);
      } else {
        await message.reply({
          embeds: [
            {
              title: 'エラーが発生しました',
              description: '不明なパラメーターです',
              color: Colors.Red,
            },
          ],
        });
      }
    },
  },
});
