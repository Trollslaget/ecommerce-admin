import mongoose, {model, Schema, models} from "mongoose";

const NewsSchema = new Schema({
  title: {type:String, required:true},
  description: String,
  images: [{type:String}]
}, {
  timestamps: true,
});

export const News = models.News || model('News', NewsSchema);