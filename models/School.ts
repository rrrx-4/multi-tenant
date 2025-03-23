import mongoose, { model, Schema, Types } from 'mongoose';

export interface SchoolDocument {
    _id: string;
    name: string;
    description: string;
    contact: string;
    subdomainId: Types.ObjectId; 
    createdBy : Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
}

const SchoolSchema = new Schema<SchoolDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    contact: {
        type: String,
        required: true
    },
    subdomainId: {
        type: Schema.Types.ObjectId, 
        ref: 'Subdomain', 
        required: true 
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const School = mongoose.models?.School || model<SchoolDocument>('School', SchoolSchema);

export default School;