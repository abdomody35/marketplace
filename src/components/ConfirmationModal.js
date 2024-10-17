import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  listingTitle,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Deletion
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete the listing &quot;
                    {listingTitle}
                    &quot;? This action cannot be undone.
                  </p>
                </div>
                <div className="mt-4 flex space-x-2 justify-end">
                  <button
                    type="button"
                    className="transition font-medium text-sm rounded-full text-center bg-brand text-white hover:shadow-md hover:shadow-black/30 hover:ring-gray-100 hover:bg-brand/80 px-4 py-2 sm:px-5 sm:py-3 inline-flex items-center justify-center"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="transition font-medium text-sm rounded-full text-center bg-red-600 text-white hover:shadow-md hover:shadow-black/30 hover:ring-gray-100 hover:bg-red-600/80 px-4 py-2 sm:px-5 sm:py-3 inline-flex items-center justify-center"
                    onClick={onConfirm}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
