const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Le nom est obligatoire"],
    },
    firstname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "L’email est obligatoire"],
      unique: true, // index unique //TODO Validation : https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
    },
    roles: {
      type: [String],
      default: ["Guest"],
      required : [true, 'Le role est obligatoire'],
    },
  },

  {
    timestamps: true, // ajoute 2 champs au document createdAt et updatedAt
  }
);

// hook executé avant la sauvegarde d'un document. Hash le mot de passe quand il est modifié
User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);

  next();
});

module.exports = mongoose.model("User", User);
