const mongose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// 新建字段
const UserSchema = new Schema({
    // 管理角色 user admin superAdmin
    role: {
        type: String,
        default: 'user'
    },
    openid: [String],
    unionId: String,
    nickname: String,
    address: String,
    province: String,
    country: String,
    city: String,
    gender: String,
    email: String,
    password: String,
    hashed_password: String,
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: Number,
    meta: {
        createdAt: {
            type: String,
            default: Date.now()
        },
        updatedAt: {
            type: String,
            default: Date.now()
        }
    }
});

UserSchema.virtual