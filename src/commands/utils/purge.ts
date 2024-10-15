import { Command } from '../../lib/modules/Command';
import { ApplicationCommandOptionType, Colors } from 'discord.js';
import { Snipe } from '../../lib/modules/classes/Snipe';
import { getParameter } from '../../lib/utils/getParameter';

export default new Command({
  name: 'purge',
  description: '保存されたメッセージデータを削除します',
  options: [
    {
      name: 'all',
      description: '全てのメッセージデータを削除します',
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'delete',
      description: '削除されたメッセージデータを削除します',
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'edit',
      description: '編集されたメッセージデータを削除します',
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  execute: {
    interaction: async ({ interaction }) => {
      const snipe = new Snipe();

      const type = interaction.options.getSubcommand();

      await snipe.purge(interaction.user.id, type);

      await interaction.followUp({
        embeds: [
          {
            title: "保存されていたデータを削除しました",
            color: Colors.Red
          }
        ]
      })
    },
    message: async ({ message, args }) => {
      const snipe = new Snipe();

      if (args[0] === 'all') {
        await snipe.purge(message.author.id, 'all');
      } else if (args[0] === 'delete') {
        await snipe.purge(message.author.id, 'delete');
      } else if (args[0] === 'edit') {
        await snipe.purge(message.author.id, 'edit');
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
            title: "保存されていたデータを削除しました",
            color: Colors.Red
          }
        ]
      })
    },
  },
});
