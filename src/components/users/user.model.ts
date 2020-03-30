import mongoose, { Schema, Document, Error } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import { IS_USER } from '@services/acl';
import constants from '@config/constants';

export interface IUser extends Document {
  email: string;
  name: string;
  phone: string;
  password: string;
  role: string;
  comparePassword: comparePasswordDelegate;
  toJSON: toJSONDelegate;
  toAuthJSON: toAuthJSONDelegate;
  createToken: createTokenDelegate;
}

type comparePasswordDelegate = (candidatePassword: string, callback: any) => void;
type toJSONDelegate = () => {};
type toAuthJSONDelegate = () => {};
type createTokenDelegate = () => {};

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email: string) {
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          return emailRegex.test(email);
        },
        message: '{VALUE} is not a valid email',
      },
    },
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Name is required!'],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, 'Phone is required!'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required!'],
      minlength: [6, 'Password need to be longer!'],
      validate: {
        validator(password: string) {
          return password.length >= 6 && /^[a-zA-Z0-9]{6,42}$/.test(password);
        },
      },
    },
    role: {
      type: String,
      default: IS_USER,
    },
  },
  { timestamps: true },
);

userSchema.plugin(uniqueValidator);

userSchema.pre<IUser>('save', function save(next) {
  if (this.password && this.isModified('password')) {
    const user = this as IUser;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, null, (err: Error, hash: string) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

userSchema.methods = {
  comparePassword(candidatePassword: string, callback: any) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
      callback(err, isMatch);
    });
  },

  createToken() {
    return jwt.sign(
      {
        _id: this._id,
        role: this.role,
      },
      constants.JWT_SECRET,
    );
  },

  toAuthJSON() {
    return {
      _id: this._id,
      token: `Bearer ${this.createToken()}`,
    };
  },

  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
    };
  },
};

userSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', userSchema);
