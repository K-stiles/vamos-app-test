import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config";

export interface UserInput {
    username: string;
    phone: string;
    password: string;
}
export interface loginBody {
    phone: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    roles: number;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
    {
        username: { type: String, default: "", lowercase: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, require: true },
        profile: { type: String, default: "" },
        roles: { type: Number, default: config.mongo.ENUM_CLIENTS[0], enum: [config.mongo.ENUM_CLIENTS[0], config.mongo.ENUM_CLIENTS[1], config.mongo.ENUM_CLIENTS[2], config.mongo.ENUM_CLIENTS[3]] },
        disabled: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.pre("save", async function (next) {
    let self = this as unknown as UserDocument;

    if (!self.isModified("password")) {
        return next();
    }
    const saltSync = bcrypt.genSaltSync(config.server.saltWorkFactor);
    const hash = bcrypt.hashSync(self.password, saltSync);
    self.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default mongoose.model<UserDocument>("User", userSchema);
