import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaTimes,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaExternalLinkAlt,
} from "react-icons/fa";

const contactIcons = {
  whatsapp: FaWhatsapp,
  call: FaPhone,
  email: FaEnvelope,
  instagram: FaInstagram,
};

const contactLabels = {
  whatsapp: "Chat on WhatsApp",
  call: "Make a call",
  email: "Send an email",
  instagram: "Visit Instagram profile",
};

const ContactModal = ({ isOpen, onClose, contacts }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
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
              as={React.Fragment}
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
                  className="text-xl font-semibold leading-6 text-gray-900 flex justify-between items-center mb-4"
                >
                  Contact Options
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                  {contacts.map((contact) => {
                    const Icon = contactIcons[contact.type] || FaEnvelope;
                    return (
                      <a
                        key={contact.id}
                        href={getContactLink(contact)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 text-blue-600 text-xl" />
                          <div className="flex flex-col">
                            <span className="text-blue-700 font-medium">
                              {contactLabels[contact.type]}
                            </span>
                            <span className="text-gray-600 text-sm">
                              {contact.value}
                            </span>
                          </div>
                        </div>
                        <FaExternalLinkAlt className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    );
                  })}
                  {!contacts.length && (
                    <div className="text-center text-gray-800 py-4">
                      User Has No Contact Info
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const getContactLink = (contact) => {
  switch (contact.type) {
    case "whatsapp":
      return `https://wa.me/${contact.value}`;
    case "call":
      return `tel:${contact.value}`;
    case "email":
      return `mailto:${contact.value}`;
    case "instagram":
      return `https://instagram.com/${contact.value}`;
    default:
      return "#";
  }
};

export default ContactModal;
