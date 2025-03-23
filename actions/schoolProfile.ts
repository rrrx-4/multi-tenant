'use server';

import { z } from "zod";
import { getSession } from "./session";
import { connectDB } from "@/lib/mongoDB";
import School from "@/models/School";
import Subdomain from "@/models/Subdomain";

const schoolProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  contact: z.string().min(2, { message: "Contact must be at least 2 characters" }),
  description: z.string().min(4, { message: "Description must be at least 4 characters" }),
  subdomainId: z.string().min(4, { message: "Invalid subdomain ID" }),
});


const updateSchoolProfileSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    contact: z.string().min(2, { message: "Contact must be at least 2 characters" }),
    description: z.string().min(4, { message: "Description must be at least 4 characters" }),
    subdomainId: z.string().min(4, { message: "Invalid subdomain ID" }),
    schoolId: z.string().min(4, { message: "Invalid school ID" }),
  });

type SchoolProfileState = {
  success?: string;
  error?: string;
  status?: boolean;
  errors?: {
    name?: string[];
    contact?: string[];
    description?: string[];
    subdomainId?: string[];
    schoolId?: string[];
  };
};

export async function createSchoolProfile(
  prevState: SchoolProfileState,
  formData: FormData
): Promise<SchoolProfileState> {
  const session = await getSession();

 
  if (!session || !session.user) {
    return {
      error: "You are not authorized to access this.",
      status: false,
    };
  }

 
  const schoolProfileData = Object.fromEntries(formData);
  const validated = schoolProfileSchema.safeParse(schoolProfileData);

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      errors: {
        name: fieldErrors.name,
        contact: fieldErrors.contact,
        description: fieldErrors.description,
        subdomainId: fieldErrors.subdomainId,
      },
      status: false,
    };
  }

  try {
    await connectDB();

    const { name, contact, description, subdomainId } = validated.data;

    
    const subdomain = await Subdomain.findById(subdomainId);

    if (!subdomain) {
      return {
        errors: {
          subdomainId: ["Subdomain not found or invalid."],
        },
        status: false,
      };
    }

    
    const school = new School({
      name,
      contact,
      description,
      subdomainId,
      createdBy: session.user.id,
    });

    await school.save();

    return {
      success: "School profile created successfully!",
      status: true,
    };
  } catch (error: any) {
    console.error("School profile creation error:", error);

    return {
      error: "Something went wrong while creating the school profile.",
      status: false,
    };
  }
}

export async function updateSchoolProfile(
    prevState: SchoolProfileState,
    formData: FormData
  ): Promise<SchoolProfileState> {

      
      const session = await getSession();
      
      
      if (!session || !session.user) {
          return {
              error: "You are not authorized to access this.",
              status: false,
            };
        }
        
       
        const schoolProfileData = Object.fromEntries(formData);
        console.log("FAILED HERE",schoolProfileData);

        const validated = updateSchoolProfileSchema.safeParse(schoolProfileData);
        
        if (!validated.success) {

            
            const fieldErrors = validated.error.flatten().fieldErrors;
            return {
                errors: {
                    name: fieldErrors.name,
          contact: fieldErrors.contact,
          description: fieldErrors.description,
          subdomainId: fieldErrors.subdomainId,
          schoolId: fieldErrors.schoolId,
        },
        status: false,
    };
}
console.log("UPDATE", session);
  
    try {
      await connectDB();
  
      const { name, contact, description, subdomainId, schoolId } = validated.data;
  
     
      const subdomain = await Subdomain.findById(subdomainId);
      if (!subdomain) {
        return {
            error: "Subdomain  not found",
            status: false,
        };
      }
  
     
      const school = await School.findById(schoolId);
      if (!school) {
        return {
          error: "School profile not found.",
          status: false,
        };
      }
  
     
      school.name = name;
      school.contact = contact;
      school.description = description;
      school.subdomainId = subdomainId; 
  
    console.log("Update", school);
    

      await school.save();
  
      return {
        success: "School profile updated successfully!",
        status: true,
      };
    } catch (error: any) {
      console.error("School profile update error:", error);
      return {
        error: "Something went wrong while updating the school profile.",
        status: false,
      };
    }
  }