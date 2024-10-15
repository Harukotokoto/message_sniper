import { Command } from '../../lib/modules/Command';
import { Colors } from 'discord.js';

export default new Command({
  name: 'help',
  description: 'ヘルプコマンド',
  execute: {
    interaction: async ({ client, interaction }) => {
      await interaction.followUp({
        embeds: [
          {
            title: 'ヘルプが必要ですか？',
            description:
              '[こちらのサイトをお読みください](<https://github.com/Harukotokoto/message_sniper/blob/main/README.md>)\n[サポートサーバー](https://discord.gg/ASNkQ2ap7p)',
            color: Colors.Blue,
          },
        ],
      });
    },
  },
});
