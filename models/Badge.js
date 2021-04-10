const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const services = require("../services/v1/badge");

// upgrade validation : https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate

const Badge = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true],
      validate: {
        validator: function (v) {
          return true; // /^[a-zA-Z]{2,15}$/.test(v); TODO
        },
        message: (props) => `${props.value} n'est pas un titre valide`,
      },
    },
    text: {
      type: String,
      trim: true,
      required: [true],
      validate: {
        validator: function (v) {
          return true; // /^[a-zA-Z]{2,15}$/.test(v);TODO
        },
        message: (props) => `${props.value} n'est pas un texte valide`,
      },
    },
    image: {
      type: String,
      trim: true,
      required: [true, "Le pseudo est obligatoire"],
      unique: false,
      validate: [
        {
          validator: function (v) {
            console.log("------------");
            return true; // /^[a-zA-Z0-9]{4,15}$/.test(v);
          },
          message: (props) => `${props.value} n'est pas un logo valide`,
        },
      ],
    },
    link: {
      type: String,
      trim: true,
      required: [false],
      unique: false,
      validate: [
        {
          validator: function (v) {
            console.log("------------");
            return true; // /^[a-zA-Z0-9]{4,15}$/.test(v);
          },
          message: (props) => `${props.value} n'est pas un logo valide`,
        },
      ],
    },
    stars_1: {
      number: {
        type: String,
        trim: true,
        required: [false],
        unique: false,
        validate: [
          {
            validator: function (v) {
              console.log("------------");
              return true; // /^[a-zA-Z0-9]{4,15}$/.test(v);
            },
            message: (props) => `${props.value} n'est pas un logo valide`,
          },
        ],
      },
      label: {
        type: String,
        trim: true,
        required: [false],
        unique: false,
        validate: [
          {
            validator: function (v) {
              console.log("------------");
              return true; // /^[a-zA-Z0-9]{4,15}$/.test(v);
            },
            message: (props) => `${props.value} n'est pas un logo valide`,
          },
        ],
      },
    },
    stars_2: {
        number: {
          type: String,
          trim: true,
          required: [false],
          unique: false,
          validate: [
            {
              validator: function (v) {
                console.log("------------");
                return true; // /^[a-zA-Z0-9]{4,15}$/.test(v);
              },
              message: (props) => `${props.value} n'est pas un logo valide`,
            },
          ],
        },
        label: {
          type: String,
          trim: true,
          required: [false],
          unique: false,
          validate: [
            {
              validator: function (v) {
                console.log("------------");
                return true; // /^[a-zA-Z0-9]{4,15}$/.test(v);
              },
              message: (props) => `${props.value} n'est pas un logo valide`,
            },
          ],
        },
      },
  },

  {
    timestamps: true, // ajoute 2 champs au document createdAt et updatedAt
  }
);

module.exports = mongoose.model("Badge", Badge);
