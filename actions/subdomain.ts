"use server";
import { z } from "zod";
import { getSession } from "./session";
import { connectDB } from "@/lib/mongoDB";
import Subdomain from "@/models/Subdomain";
import School from "@/models/School";

const subDomainSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  subDomain: z
    .string()
    .min(2, { message: "Subdomain must be at least 2 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters" }),
});


type SubDomainFormState = {
  success?: string;
  error?: string;
  status?: boolean;
  errors?: {
    name?: string[];
    subDomain?: string[];
    description?: string[];
  };
};

export async function createSubDomain(
  prevState: SubDomainFormState,
  formData: FormData
): Promise<SubDomainFormState> {
  const session = await getSession();

  
  const subDomainData = Object.fromEntries(formData);
  const validated = subDomainSchema.safeParse(subDomainData);

  
  if (!session || !session.user) {
    return {
      error: "You are not authorized to access this.",
      status: false,
    };
  }

  
  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        name: fieldErrors.name,
        subDomain: fieldErrors.subDomain,
        description: fieldErrors.description,
      },
      status: false,
    };
  }

  try {
    await connectDB();

    const newSubdomain = new Subdomain({
      ...validated.data,
      createdBy: session.user.id,
    });

    await newSubdomain.save();

    return {
      success: "Subdomain created successfully!",
      status: true,
    };
  } catch (error: any) {
    
    if (error.code === 11000 && error.keyPattern?.subDomain) {
      return {
        errors: {
          subDomain: ["This subdomain is already taken."],
        },
        status: false,
      };
    }

   
    console.error("Subdomain creation error:", error);
    return {
      error: "Something went wrong while creating the subdomain.",
      status: false,
    };
  }
}

export async function deleteSubdomain(subdomainId: string) {
  const session = await getSession();

  if (!session || !session.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await connectDB();

    
    await School.deleteMany({ subdomainId });

   
    await Subdomain.findByIdAndDelete(subdomainId);

    return { success: true, message: "Subdomain and related data deleted." };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false, message: "Failed to delete subdomain." };
  }
}
