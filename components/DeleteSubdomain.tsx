'use client';
import { deleteSubdomain } from '@/actions/subdomain';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function DeleteSubdomainButton({ subdomainId }: { subdomainId: string }) {
  const router = useRouter();

  const [ open, setOpen ] = useState(false)

  const handleDelete = async () => {
   

    const res = await deleteSubdomain(subdomainId);
    if (res.success) {
        toast.success(res.message)
      router.refresh(); // refresh list after deletion
    } else {
        toast.success(res.message)
    }
  };

  return (
    <>
    <button
      onClick={() => setOpen(true)}
      className="text-red-600 hover:text-red-800 text-sm font-medium"
    >
      Delete
    </button>
  
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
        <p className="text-gray-800 text-base">
          Are you sure you want to <span className="font-semibold text-red-600">delete</span> this subdomain? This action cannot be undone.
        </p>
  
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  </>
  
  );
}
