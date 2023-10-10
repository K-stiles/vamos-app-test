import mongoose from "mongoose";
import config from "../config/config";

export interface AgencyInput {
    name: string;
    contact: string[];
}

export interface AgencyDocument extends AgencyInput, mongoose.Document {
    roles: number;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const agencySchema = new mongoose.Schema(
    {
        name: { type: String, default: "", lowercase: true },
        roles: { type: Number, default: config.mongo.ENUM_CLIENTS[1], enum: [config.mongo.ENUM_CLIENTS[0], config.mongo.ENUM_CLIENTS[1], config.mongo.ENUM_CLIENTS[2], config.mongo.ENUM_CLIENTS[3]] },
        contact: [String],
        disabled: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<AgencyDocument>("Agency", agencySchema);
