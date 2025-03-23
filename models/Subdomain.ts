import mongoose , { model, Schema, Types } from 'mongoose'

export interface SubdomainDocumnet {
    _id : string;
    name : string ;
    description : string;
    subDomain : string;
    createdBy : Types.ObjectId,
    createdAt : Date;
    updatedAt : Date;
}

const SubdomainSchema = new Schema<SubdomainDocumnet>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    subDomain:{
        type: String,
        required: true,
        unique: true, // Ensure subDomain is unique
        trim: true,
        lowercase: true, // Store in lowercase to avoid case sensitivity issues
    },
    createdBy : {
        type: Schema.Types.ObjectId, // Define as ObjectId
        ref: 'User', // Reference to the Subdomain model
        required: true
    }

}, {
    timestamps : true
})


const Subdomain = mongoose.models?.Subdomain || model<SubdomainDocumnet>('Subdomain', SubdomainSchema);

export default Subdomain