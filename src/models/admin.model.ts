import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config";

export interface AdminInput {
    email: string;
    username: string;
    phone: string;
    password: string;
}
export interface adminLoginBody {
    email: string;
    password: string;
}

export interface AdminDocument extends AdminInput, mongoose.Document {
    roles: any;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const adminSchema = new mongoose.Schema(
    {
        username: { type: String, lowercase: true },
        email: { type: String, lowercase: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, require: true },
        profile: { type: String, default: "" },
        roles: { type: Number, default: config.mongo.ENUM_CLIENTS[3], enum: [config.mongo.ENUM_CLIENTS[0], config.mongo.ENUM_CLIENTS[1], config.mongo.ENUM_CLIENTS[2], config.mongo.ENUM_CLIENTS[3]] },
        disabled: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

adminSchema.pre("save", async function (next) {
    let self = this as unknown as AdminDocument;

    if (!self.isModified("password")) {
        return next();
    }
    const saltSync = bcrypt.genSaltSync(config.server.saltWorkFactor);
    const hash = bcrypt.hashSync(self.password, saltSync);
    self.password = hash;

    return next();
});

adminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as AdminDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default mongoose.model<AdminDocument>("Admin", adminSchema);
