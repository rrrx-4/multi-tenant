// app/page.tsx (Server Component — default)
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import SubdomainList from "@/components/SubdomainList";
import CreateSubdomainModal from "@/components/CreateSubdomainModal";
import { Suspense } from "react";
import Signout from "@/components/Signout";
import { connectDB } from "@/lib/mongoDB";
import Subdomain from "@/models/Subdomain";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const getSDs = async ()=>{
    await connectDB();

    const subdomains = await Subdomain.find().lean();

    return subdomains
  }


  const subdomains = await getSDs()


  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center mb-4 gap-[20px] " >
      <h1 className="text-3xl font-bold ">Welcome {session?.user?.email}</h1>
      <Signout/>

      </div>
      {/* Client Component for Modal + Form */}
      <CreateSubdomainModal  />

      {/* Server Component to list subdomains */}
      <h2 className="text-xl font-semibold my-6">All Subdomains</h2>
      <Suspense fallback={<div>Loading subdomains...</div>}>
      <SubdomainList subdomains={subdomains} />
      </Suspense>
    </main>
  );
}
