import { model, Schema } from 'mongoose';

const cfg = model(
  'cfg',
  new Schema({
    UserID: {
      type: String,
      required: true,
    },
    Delete: {
      type: Boolean,
      required: true,
    },
    Edit: {
      type: Boolean,
      required: true,
    },
  }),
);

export { cfg };
