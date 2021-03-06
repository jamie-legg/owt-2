/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon, XIcon } from "@heroicons/react/outline"
import Button from "./Button"
import Typist from "react-typist"
import getAccountData from "../../api/getAccountData"

interface IAccount {
  id: string
  platform: string
  rating: number
}

const Accounts = () => {
  const [open, setOpen] = useState(false)
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  return (
    <div>
      {accounts.map((account) => (
        <div key={account.id}>
          <div>{account.id}</div>
        </div>
      ))}
    </div>
  )
}

export default function AccountsModal({ isOpen, onClose }) {
  const [searchId, setSearchId] = useState("")
  const [searching, setSearching] = useState(false)
  const [attemptedSearch, setAttemptedSearch] = useState(false)

  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (searchId && searching) {
      getAccountData(searchId)
    }
  }, [searchId, searching])

  const closeModal = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 my-3"
                  >
                    Your Accounts <span className="text-indigo-600">(3)</span>
                  </Dialog.Title>
                  <div className="flex">
                    <input
                      onChange={(e) => {
                        setSearchId(e.target.value)
                      }}
                      className="my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded-2xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                      type="text"
                      placeholder="Battletag#1234"
                    />
                    <Button
                      text={"Search"}
                      onClick={() => {
                        console.log("searching for " + searchId)
                        setAttemptedSearch(true)
                        if (searchId.length > 0 && searchId.indexOf("#") > -1) {
                          setSearching(true)
                          setTimeout(() => {
                            setAttemptedSearch(false)
                          }, 1000)
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-start">
                    {searching ? (
                      <div className="flex justify-center items-center">
                        <Typist avgTypingDelay={10}>
                          <code>Searching for {searchId}...</code>
                        </Typist>
                      </div>
                    ) : attemptedSearch ? null : null}
                  </div>
                  <div className="bg-indigo-300 grid grid-cols-3 text-left text-indigo-700 uppercase font-bold w-full rounded-2xl py-3 px-6">
                    <div>SYN#1437</div>
                    <div className="flex place-content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-row-reverse">
                      <XIcon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={closeModal}
                >
                  Go back to dashboard
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
