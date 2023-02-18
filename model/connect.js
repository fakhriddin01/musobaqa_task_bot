const { Schema, model } = require('mongoose');

const UstaSchema = Schema({
    chatId: { type: Number, required: true },
    ism: { type: String, required: true },
    tel_number: { type: String, required: true },
    location: { type: Object, required: true },
    ish_boshlash_vaqti: { type: String, required: true },
    ish_tugash_vaqti: { type: String, required: true },
    mijoz_uchun_vaqt: { type: Number, required: true }
});

const Usta = model('usta', UstaSchema);
module.exports = Usta;