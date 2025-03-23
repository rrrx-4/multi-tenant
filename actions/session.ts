'use server'
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

 export async function getSession() {
    return getServerSession(authOptions) ;
  }