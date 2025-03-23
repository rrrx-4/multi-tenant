import SchoolProfile from "@/components/SchoolProfile";
import School from "@/models/School";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  console.log(id);

  var school = await School.findOne({subdomainId : id})

  var initialData = null

 if(school){
  initialData  = {
    name : school.name,
    description:school.description,
    contact:school.contact,
    subdomainId: school.subdomainId.toString(),
    _id : school._id.toString()
  }
 }
  
  

  console.log( "School", school);
  

  return (
  <div>

    <button></button>

    {
     !school ?  <SchoolProfile subdomainId={id} initialData={null} ></SchoolProfile>  :
      
     <SchoolProfile subdomainId={id} initialData={initialData} ></SchoolProfile>
    }

    
  </div>
  )
}