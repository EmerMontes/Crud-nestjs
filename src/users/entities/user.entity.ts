import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
   @Prop({required: true})
   name: string;

   @Prop({required: true})
   lastName: string;
   
   @Prop({required: true, unique: true})
   email: string;

   @Prop({required: true})
   password: string;

   @Prop({required: true})
   isActive: Boolean;

   @Prop({required: true, default: Date.now})
   createdAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User)