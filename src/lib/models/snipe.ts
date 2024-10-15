import { model, Schema } from 'mongoose';

const snipe = model(
  'snipe',
  new Schema(
    {
      ChannelID: {
        type: String,
        required: true,
      },
      UserID: {
        type: String,
        required: true,
      },
      Message: {
        type: {
          Content: {
            type: String,
            required: false,
          },
          Attachments: {
            type: [String],
            required: false,
          },
          CreatedAt: {
            type: Date,
            default: Date.now(),
          },
        },
        required: true,
      },
      OldMessage: {
        type: {
          Content: {
            type: String,
            required: false,
          },
          Attachments: {
            type: [String],
            required: false,
          },
          CreatedAt: {
            type: Date,
            default: Date.now(),
          },
        },
        required: false,
      },
      Type: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export { snipe };
