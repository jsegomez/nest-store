import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop(
    raw({
      department: { type: String },
      city: { type: String },
      street: { type: String },
      number: { type: String },
    }),
  )
  address: Record<string, any>;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
