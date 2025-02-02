import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));

  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  
  next();
});

export const User = model<IUser>('User', userSchema);
