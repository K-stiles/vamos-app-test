import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    agency: {
      type:String,
      required: true,
    },
    price: {
      type:Number,
      required: true,
    },
    from: {
      type:String,
      required: true,
    },
    to: {
      type:String,
      required: true,
    },
    date: {
      type:Date,
      required: true,
    },


  
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);
 