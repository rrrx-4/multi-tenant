'use client';

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useActionState } from "react";
import { createSubDomain } from "@/actions/subdomain";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const initialState = {
  success: "",
  errors: {
    name: "",
    subDomain: "",
    description: "",
  },
};

export default function CreateSubdomainModal( ) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [formKey, setFormKey] = useState(0); 

  const [state, formAction, isPending] = useActionState<any, FormData>(
    createSubDomain,
    initialState
  );

  useEffect(()=>{
    if(state?.status){

        toast.success(state?.success)
        router.refresh()
        setOpen(false)

        // getSDs()
        
      }
    

  }, [state, router])

 
  const closeModal = () => {
      setFormKey(prev => prev + 1); // force reset the form
    setOpen(false);
    // setTimeout(() => {
    // }, 200); // delay slightly to allow modal close animation (optional)
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded block ml-auto"
      >
        Create New Subdomain
      </button>

      <Modal key={formKey} open={open} onClose={closeModal}>
  <form  
    action={formAction}
    className="w-full max-w-[600px] p-6 bg-white rounded-xl shadow-lg space-y-5"
  >
    <h2 className="text-xl font-semibold text-gray-800">Create New Subdomain</h2>

    {/* Name */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Name
      </label>
      <input
        name="name"
        id="name"
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {state.errors?.name && (
        <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>
      )}
    </div>

    {/* Subdomain */}
    <div>
      <label htmlFor="subDomain" className="block text-sm font-medium text-gray-700 mb-1">
        Subdomain
      </label>
      <input
        name="subDomain"
        id="subDomain"
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {state.errors?.subDomain && (
        <p className="text-sm text-red-500 mt-1">{state.errors.subDomain}</p>
      )}
    </div>

    {/* Description */}
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        name="description"
        id="description"
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {state.errors?.description && (
        <p className="text-sm text-red-500 mt-1">{state.errors.description}</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={isPending}
      className={`w-full px-4 py-2 rounded-md text-white transition ${
        isPending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isPending ? "Creating..." : "Create"}
    </button>

    {/* Success Message */}
    {/* {state.success && <p className="text-green-600 text-sm text-center">{state.success}</p>} */}
  </form>
</Modal>

    </>
  );
}
