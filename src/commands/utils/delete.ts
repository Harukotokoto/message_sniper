import { Command } from '../../lib/modules/Command';
import { ApplicationCommandOptionType, Colors } from 'discord.js';
import { Snipe } from '../../lib/modules/classes/Snipe';

export default new Command({
  name: 'delete',
  description:
    '削除されたメッセージの保存の許可設定を変更します(デフォルト:ON)',
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

      await snipe.config(interaction.user.id, 'delete', cmd === 'allow');

      await interaction.followUp({
        embeds: [
          {
            title: "保存設定を更新しました",
            color: Colors.Green
          }
        ]
      })
    },
    message: async ({ message, args }) => {
      const snipe = new Snipe();

      if (args[0] === 'allow') {
        await snipe.config(message.author.id, 'delete', true);
      } else if (args[0] === 'deny') {
        await snipe.config(message.author.id, 'delete', false);
      } else {
        return await message.reply({
          embeds: [
            {
              title: 'エラーが発生しました',
              description: '不明なパラメーターです',
              color: Colors.Red,
            },
          ],
        });
      }

      await message.reply({
        embeds: [
          {
            title: "保存設定を更新しました",
            color: Colors.Green
          }
        ]
      })
    },
  },
});
