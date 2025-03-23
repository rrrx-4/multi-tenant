import Link from "next/link";
import { DeleteSubdomainButton } from "./DeleteSubdomain";

export default async function SubdomainList({subdomains}: any) {
//   await connectDB();

//   const subdomains = await Subdomain.find().lean();

  console.log("List",  subdomains);
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">

        {/* <p>subdomian</p> */}
      {subdomains.map((sub:any) => (
        <div
          key={sub?._id.toString()}
          className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition"
        >
        <div className="flex justify-between items-center mb-4" >
            <div className="" >
          <h2 className="text-xl font-semibold mb-2">{sub.name}</h2>
          <p className="text-sm text-gray-600 ">{sub.description}</p>
          </div>
            <div>
            <Link
  href={`/domain/${sub._id}`}
  className="inline-block px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md shadow hover:bg-gray-700 transition"
>
  Configure Content
</Link>

            </div>

            
        </div>


        <div className="flex justify-between items-center">
        <a
  href={`http://${sub.subDomain}.localhost:3000`}
  target="_blank"
  rel="noopener noreferrer"
className="text-blue-500 underline"
>
Visit → {sub.subDomain}.localhost:3000
</a>
<div>
            <DeleteSubdomainButton subdomainId={sub._id.toString()} />
            </div>
            </div>
          {/* <Link
            href={`https://${sub.subDomain}.yourdomain.com`} // or use `/dashboard/${sub.subDomain}` if it's client route
            className="inline-block text-blue-600 hover:underline"
          >
           
          </Link> */}
        </div>
      ))}
    </div>
  );
}
