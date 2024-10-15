import { Message } from 'discord.js';
import { snipe } from '../../models/snipe';
import { cfg } from '../../models/cfg';

class Snipe {
  constructor() {}

  public save = async (
    message: Message,
    type: 'delete' | 'edit',
    oldMessage?: Message,
  ) => {
    const channelId = message.channel.id;
    const userId = message.author.id;
    const content = message.content;
    const attachments = message.attachments.map((atc) => atc.proxyURL) || null;
    const snipeType = type;

    if (snipeType === 'edit' && !oldMessage) {
      throw new Error('Editが指定されているときはoldMessageを指定してください');
    }

    if (snipeType === 'delete') {
      await snipe.create({
        ChannelID: channelId,
        UserID: userId,
        Type: snipeType,
        Message: {
          Content: content,
          Attachments: attachments,
          CreatedAt: new Date(),
        },
      });
    } else {
      await snipe.create({
        ChannelID: channelId,
        UserID: userId,
        Type: snipeType,
        Message: {
          Content: content,
          Attachments: attachments,
          CreatedAt: new Date(),
        },
        OldMessage: {
          Content: content,
          Attachments: attachments,
          CreatedAt: new Date(),
        },
      });
    }
  };

  public get = async (
    channelId: string,
    type: 'delete' | 'edit',
    count = 1,
  ) => {
    if (type === 'edit') {
      const edit_snipe = await snipe
        .find({
          Type: 'edit',
          ChannelID: channelId,
        })
        .sort({ createdAt: -1 })
        .skip(count - 1)
        .limit(1);

      return edit_snipe[0];
    }

    if (type === 'delete') {
      const delete_snipe = await snipe
        .find({
          ChannelID: channelId,
          Type: 'delete',
        })
        .sort({ createdAt: -1 })
        .skip(count - 1)
        .limit(1);

      return delete_snipe[0];
    }
  };

  public purge = async (userId: string, type: string) => {
    if (type === 'delete') {
      await snipe.deleteMany({ UserID: userId, Type: 'delete' });
    } else if (type === 'edit') {
      await snipe.deleteMany({ UserID: userId, Type: 'edit' });
    } else {
      await snipe.deleteMany({ UserID: userId });
    }
  };

  public config = async (
    userId: string,
    type: 'delete' | 'edit',
    state: boolean,
  ) => {
    const config_data = await cfg.findOne({ UserID: userId });
    if (!config_data) {
      if (type === 'edit') {
        await cfg.create({
          UserID: userId,
          Delete: true,
          Edit: state,
        });
      }

      if (type === 'delete') {
        await cfg.create({
          UserID: userId,
          Delete: state,
          Edit: true,
        });
      }
    } else {
      if (type === 'edit') {
        config_data.Edit = state;
      }

      if (type === 'delete') {
        config_data.Delete = state;
      }

      await config_data.save();
    }
  };

  public check = async (userId: string, type: 'delete' | 'edit') => {
    if (type === 'edit') {
      const cfg_data = await cfg.findOne({ UserID: userId });
      if (!cfg_data) return true;
      if (cfg_data.Edit) return true;
    }

    if (type === 'delete') {
      const cfg_data = await cfg.findOne({ UserID: userId });
      if (!cfg_data) return true;
      if (cfg_data.Delete) return true;
    }

    return false;
  };
}

export { Snipe };
