import mongoose from "mongoose";

const mountainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    region: {
      type: String,
      trim: true,
    },

    verticalDrop: {
      type: Number,
    },

    trailCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Mountain = mongoose.model("Mountain", mountainSchema);

const trailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mountain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mountain",
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },

    groomed: {
      type: Boolean,
      default: true,
    },

    glades: {
      type: Boolean,
      default: false,
    },

    terrainPark: {
      type: Boolean,
      default: false,
    },

    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Trail = mongoose.model("Trail", trailSchema);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,

    toJSON: {
      transform: function (_doc, ret: any) {
        delete ret.password;
        delete ret.__v;

        return ret;
      },
    },
  },
);

export const User = mongoose.model("User", userSchema);
