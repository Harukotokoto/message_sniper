import { APIEmbed, ApplicationCommandOptionType, Colors } from 'discord.js';
import { Command } from '../../lib/modules/Command';
import { Snipe } from '../../lib/modules/classes/Snipe';
import { getParameter } from '../../lib/utils/getParameter';

export default new Command({
  name: 'snipe',
  aliases: ['s'],
  description: '削除されたメッセージを表示します',
  options: [
    {
      name: 'delete',
      description: '削除されたメッセージを表示します',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'count',
          description: '逆戻りする回数',
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
        },
      ],
    },
    {
      name: 'edit',
      description: '編集されたメッセージを表示します',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'count',
          description: '逆戻りする回数',
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
        },
      ],
    },
  ],
  execute: {
    interaction: async ({ client, interaction }) => {
      if (!interaction.channel) return;
      const cmd = interaction.options.getSubcommand();

      const snipe = new Snipe();
      const count = interaction.options.getInteger('count') || 1;

      if (cmd === 'delete') {
        const delete_snp = await snipe.get(
          interaction.channel.id,
          'delete',
          count,
        );
        if (!delete_snp) {
          return await interaction.followUp({
            embeds: [
              {
                description: 'スナイプするメッセージがありません',
                color: Colors.Red,
              },
            ],
          });
        }

        const attachments = delete_snp.Message.Attachments
          ? delete_snp.Message.Attachments
          : undefined;

        let delete_user = client.users.cache.get(delete_snp.UserID);
        if (!delete_user) {
          return await interaction.followUp({
            embeds: [
              {
                description: 'ユーザーが見つかりませんでした',
                color: Colors.Red,
              },
            ],
          });
        }

        const embeds: APIEmbed[] = [
          {
            author: {
              name: `${delete_user.displayName || ''}(${delete_user.tag})`,
              icon_url: delete_user.avatarURL()?.toString() || '',
            },
            description: `${delete_snp.Message.Content}`,
            timestamp: new Date(delete_snp.createdAt).toISOString(),
            color: Colors.Aqua,
            image: {
              url: `https://25dsnipe.com/${delete_user.id}`,
            },
          },
        ];

        attachments?.forEach((attachment) => {
          embeds.push({
            image: {
              url: attachment,
            },
            color: Colors.Aqua,
          });
        });

        return await interaction.followUp({
          embeds: embeds,
        });
      } else {
        const edit_snp = await snipe.get(interaction.channel.id, 'edit', count);
        if (!edit_snp || !edit_snp.OldMessage) {
          return await interaction.followUp({
            embeds: [
              {
                description: 'スナイプするメッセージがありません',
                color: Colors.Red,
              },
            ],
          });
        }

        let edit_user = client.users.cache.get(edit_snp.UserID);
        if (!edit_user) {
          return await interaction.followUp({
            embeds: [
              {
                description: 'ユーザーが見つかりませんでした',
                color: Colors.Red,
              },
            ],
          });
        }

        return await interaction.followUp({
          embeds: [
            {
              author: {
                name: `${edit_user.displayName || ''}(${edit_user.tag})`,
                icon_url: edit_user.avatarURL()?.toString() || '',
              },
              description: `${edit_snp.OldMessage.Content} => ${edit_snp.Message.Content}`,
              timestamp: new Date(edit_snp.Message.CreatedAt).toISOString(),
              color: Colors.Yellow,
              image: {
                url: `https://25dsnipe.com/${edit_user.id}`,
              },
            },
          ],
        });
      }
    },
    message: async ({ client, message, args }) => {
      if (!message.channel) return;
      const snipe = new Snipe();
      const count = parseInt(getParameter(args, '?c') || '1') || 1;

      if (!args.includes('e') && !args.includes('edit')) {
        const delete_snp = await snipe.get(message.channel.id, 'delete', count);
        if (!delete_snp) {
          return await message.reply({
            embeds: [
              {
                description: 'スナイプするメッセージがありません',
                color: Colors.Red,
              },
            ],
          });
        }

        const attachments = delete_snp.Message.Attachments
          ? delete_snp.Message.Attachments
          : undefined;

        let delete_user = client.users.cache.get(delete_snp.UserID);
        if (!delete_user) {
          return await message.reply({
            embeds: [
              {
                description: 'ユーザーが見つかりませんでした',
                color: Colors.Red,
              },
            ],
          });
        }

        const embeds: APIEmbed[] = [
          {
            author: {
              name: `${delete_user.displayName || ''}(${delete_user.tag})`,
              icon_url: delete_user.avatarURL()?.toString() || '',
            },
            description: `${delete_snp.Message.Content}`,
            timestamp: new Date(delete_snp.createdAt).toISOString(),
            color: Colors.Aqua,
            image: {
              url: `https://25dsnipe.com/${delete_user.id}`,
            },
          },
        ];

        attachments?.forEach((attachment) => {
          embeds.push({
            image: {
              url: attachment,
            },
            color: Colors.Aqua,
          });
        });

        return await message.reply({
          embeds: embeds,
        });
      } else {
        const edit_snp = await snipe.get(message.channel.id, 'edit', count);
        if (!edit_snp || !edit_snp.OldMessage) {
          return await message.reply({
            embeds: [
              {
                description: 'スナイプするメッセージがありません',
                color: Colors.Red,
              },
            ],
          });
        }

        let edit_user = client.users.cache.get(edit_snp.UserID);
        if (!edit_user) {
          return await message.reply({
            embeds: [
              {
                description: 'ユーザーが見つかりませんでした',
                color: Colors.Red,
              },
            ],
          });
        }

        return await message.reply({
          embeds: [
            {
              author: {
                name: `${edit_user.displayName || ''}(${edit_user.tag})`,
                icon_url: edit_user.avatarURL()?.toString() || '',
              },
              description: `${edit_snp.OldMessage.Content} => ${edit_snp.Message.Content}`,
              timestamp: new Date(edit_snp.Message.CreatedAt).toISOString(),
              color: Colors.Yellow,
              image: {
                url: `https://25dsnipe.com/${edit_user.id}`,
              },
            },
          ],
        });
      }
    },
  },
});
