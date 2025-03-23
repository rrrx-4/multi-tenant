import { connectDB } from "@/lib/mongoDB";
import Subdomain from "@/models/Subdomain";
export const dynamicParams = true;

export const revalidate = 60;

interface SubdomainPageProps {
    params: { subdomain: string };
  }

export async function generateStaticParams() {
  await connectDB();
  const subs = await Subdomain.find().select("subDomain").lean();
  return subs.map((s) => ({ subdomain: s.subDomain }));
}




export default async function SubdomainPage({ params }: {params : any}) {
    const { subdomain } = await params

  console.log("PARAMS:", subdomain);

  await connectDB();

const result = await Subdomain.aggregate([
  { $match: { subDomain: subdomain } },
  {
    $lookup: {
      from: "schools",
      localField: "_id",
      foreignField: "subdomainId",
      as: "school",
    },
  },
  { $unwind: "$school" },
]).then(res => res[0]);

console.log(" Result ", result );


if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-500">The requested subdomain or resource does not exist.</p>
        </div>
      </div>
    );
  }
  

const { school } = result;




  return (
    <div className="  p-6 bg-white rounded-xl shadow-md space-y-6 min-h-screen flex justify-center items-start">
        <div>
  <h1 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-[20px]">School Details</h1>

  <div className="space-y-3 text-gray-700 text-base">
    <p>
      <span className="font-medium text-gray-600">Name:</span>{" "}
      {school?.name || <span className="text-gray-400">---</span>}
    </p>

    <p>
      <span className="font-medium text-gray-600">Contact:</span>{" "}
      {school?.contact || <span className="text-gray-400">---</span>}
    </p>

    <p>
      <span className="font-medium text-gray-600">Description:</span>{" "}
      {school?.description || <span className="text-gray-400">---</span>}
    </p>
  </div>
  </div>
</div>

  );
}
