import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import router from "next/router";
import { NextResponse } from "next/server";

type CloseHandler = () => void;
export const CreateGroupModal = (props: {
  isOpen: boolean;
  onClose: CloseHandler;
}) => {
  const [open, setOpen] = useState(props.isOpen);
  const cancelButtonRef = useRef(null);
  const [invite, setInvite] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  const handleClose = () => {
    console.log("close?");
    setOpen(false);
    props.onClose();
  };

  const { mutate: joinGroup } = api.groups.joinGroupByInvite.useMutation({
    onSuccess: (group) => {
      if (group) {
        handleClose();
        void router.push("/group/" + group.groupId);
      }
    },
    onError: () => {
      alert("Error Joining Group");
    },
  });

  const { mutate: createGroup } = api.groups.create.useMutation({
    onSuccess: (group) => {
      console.log("lol?", group);
      if (group) {
        handleClose();
        void router.push("/group/" + group.groupId);
      }
    },
    onError: () => {
      alert("Error Creating Group");
    },
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full grow items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800/70 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-800/70 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h1"
                      className="pb-8 text-center text-4xl font-semibold leading-6 text-white"
                    >
                      Create or Join Group
                    </Dialog.Title>

                    <div className="flex flex-row">
                      <div className="relative mr-2 mt-2 grow rounded-md shadow-sm sm:mr-8">
                        <input
                          type="text"
                          name="GroupName"
                          id="GroupName"
                          placeholder="Group Name..."
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          className=" block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          createGroup({ name });
                        }}
                        className=" mt-2 grow-0 rounded-lg bg-blue-700 px-5 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-4 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Create
                      </button>
                    </div>
                    <hr className="my-4 bg-white"></hr>
                    <div className="flex flex-row">
                      <div className="relative mr-2 mt-2 grow rounded-md shadow-sm sm:mr-8">
                        <input
                          type="text"
                          name="InviteCode"
                          id="InviteCode"
                          placeholder="Invite Code..."
                          onChange={(e) => {
                            setInvite(e.target.value);
                          }}
                          className=" block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={true}
                        onClick={() => {
                          joinGroup({ invite });
                        }}
                        className=" mt-2 grow-0 rounded-lg bg-blue-700 px-7 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-4 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/70 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleClose}
                  >
                    Join
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
