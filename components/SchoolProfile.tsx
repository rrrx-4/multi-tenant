'use client';

import { useActionState, useEffect } from "react";
import { createSchoolProfile, updateSchoolProfile } from "@/actions/schoolProfile";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const initialState = {
  success: "",
  errors: {
    name: "",
    contact: "",
    description: "",
  },
};

export default function SchoolProfile({ subdomainId, initialData }: any) {
  const isEdit = !!initialData;
  const router = useRouter();

  const actionFn = isEdit ? updateSchoolProfile : createSchoolProfile;

  const [state, formAction, isPending] = useActionState<any, FormData>(
    actionFn,
    initialState
  );

  // console.log("UPSSATE",  state, isEdit);

  useEffect(()=>{

    
  if (state?.status && !isPending) {
    toast.success(state?.success)
    router.refresh(); // refresh the server component
  }

  }, [state, isPending, router])


  return (
    <form
    action={formAction}
    className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
  >
    
    <input type="hidden" name="subdomainId" value={subdomainId} />
    {isEdit && <input type="hidden" name="schoolId" value={initialData._id} />}
  
    
    <h2 className="text-2xl font-semibold text-gray-800">
      {isEdit ? "Edit School Profile" : "Create School Profile"}
    </h2>
  
    
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Name
      </label>
      <input
        name="name"
        id="name"
        type="text"
        defaultValue={initialData?.name || ""}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {state.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>}
    </div>
  
    
    <div>
      <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
        Contact
      </label>
      <input
        name="contact"
        id="contact"
        type="text"
        defaultValue={initialData?.contact || ""}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {state.errors?.contact && <p className="text-sm text-red-500 mt-1">{state.errors.contact}</p>}
    </div>
  
    
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        name="description"
        id="description"
        defaultValue={initialData?.description || ""}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {state.errors?.description && (
        <p className="text-sm text-red-500 mt-1">{state.errors.description}</p>
      )}
    </div>
  
    
    <div className="pt-4">
      <button
        type="submit"
        disabled={isPending}
        className={`w-full md:w-auto px-6 py-2 text-white rounded-md transition duration-200 ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isPending ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update" : "Create"}
      </button>
    </div>
  
    
    {state.success && <p className="text-green-600 text-sm">{state.success}</p>}
    {!state.status && state.error && <p className="text-red-600 text-sm">{state.error}</p>}
  </form>
  
  );
}
