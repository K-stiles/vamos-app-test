import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config";

export interface SubAdminInput {
    email: string;
    username: string;
    phone: string;
    password: string;
}
export interface subAdminLoginBody {
    email: string;
    password: string;
}

export interface SubAdminDocument extends SubAdminInput, mongoose.Document {
    roles: any;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const subAdminSchema = new mongoose.Schema(
    {
        email: { type: String, lowercase: true, unique: true },
        username: { type: String, lowercase: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, require: true },
        profile: { type: String, default: "" },
        roles: { type: Number, default: config.mongo.ENUM_CLIENTS[2], enum: config.mongo.ENUM_CLIENTS },
        disabled: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

subAdminSchema.pre("save", async function (next) {
    let self = this as unknown as SubAdminDocument;

    if (!self.isModified("password")) {
        return next();
    }

    const saltSync = bcrypt.genSaltSync(config.server.saltWorkFactor);
    const hash = bcrypt.hashSync(self.password, saltSync);
    self.password = hash;

    return next();
});

subAdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as SubAdminDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default mongoose.model<SubAdminDocument>("SubAdmin", subAdminSchema);
