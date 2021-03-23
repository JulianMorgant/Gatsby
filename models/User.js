const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const services = require("../services/v1/user");

// upgrade validation : https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]{2,15}$/.test(v);
        },
        message: (props) => `${props.value} n'est pas un nom valide`,
      },
    },
    firstname: {
      type: String,
      trim: true,
      required: [false],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]{2,15}$/.test(v);
        },
        message: (props) => `${props.value} n'est pas un prénom valide`,
      },
    },
    pseudo: {
      type: String,
      trim: true,
      required: [true, "Le pseudo est obligatoire"],
      unique: true, //rem :  https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
      validate: [
        {
          //async validation for unique pseudo -> require a promise from isPseudoExists
          validator: async function (v) {
            var ret = await services.isPseudoExists(v);
            return !ret;
          },

          message: (props) => `le pseudo : ${props.value} est déja utilisé`,
        },
        {
          validator: function (v) {
            console.log("------------");
            return /^[a-zA-Z0-9]{4,15}$/.test(v);
          },
          message: (props) => `${props.value} n'est pas un pseudo valide`,
        },
      ],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "L’email est obligatoire"],
      unique: true, //rem: index unique //TODO Validation : https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
      lowercase: true,
      validate: [
        {
          //async validation for unique email -> require a promise from isEmailExists
          validator: async function (v) {
            var ret = await services.isEMailExists(v);
            return !ret;
          },
          message: (props) => `le mail : ${props.value} est déja utilisé`,
        },

        {
          validator: function (v) {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              v
            );
          },
          message: (props) => `${props.value} n'est pas un email valide`,
        },
      ],
    },
    password: {
      type: String,
      trim: true, // TODO ???
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]{1,15}$/.test(v);
        },
        message: (props) => `le mot de passe n'est pas valide`,
      },
    },
    roles: {
      type: [String],
      default: ["Guest"],
      required: [true, "Le role est obligatoire"],
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
