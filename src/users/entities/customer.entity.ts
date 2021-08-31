import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({
    type: [
      {
        department: { type: String },
        city: { type: String },
        street: { type: String },
        number: { type: String },
        title: { type: String },
      },
    ],
  })
  addresses: Types.Array<Record<string, any>>;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
