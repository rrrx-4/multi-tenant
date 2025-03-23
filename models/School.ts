import mongoose, { model, Schema, Types } from 'mongoose';

export interface SchoolDocument {
    _id: string;
    name: string;
    description: string;
    contact: string;
    subdomainId: Types.ObjectId; // Use Types.ObjectId for foreign key
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
        type: Schema.Types.ObjectId, // Define as ObjectId
        ref: 'Subdomain', // Reference to the Subdomain model
        required: true // Assuming subdomainId is required
    },
    createdBy : {
        type: Schema.Types.ObjectId, // Define as ObjectId
        ref: 'User', // Reference to the Subdomain model
        required: true
    }
}, {
    timestamps: true
});

const School = mongoose.models?.School || model<SchoolDocument>('School', SchoolSchema);

export default School;