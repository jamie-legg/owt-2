import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import splash from "public/tracer-landing.jpeg"
import AccountsModal from "app/core/components/AccountsModal"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [accountsModalOpen, setAccountsModalOpen] = useState(false)

  const addAccount = () => {
    setAccountsModalOpen(true)
  }

  if (currentUser) {
    return (
      <>
        <button
          className="button small bg-indigo-700 transition-all hover:bg-indigo-900 text-white rounded-2xl px-6 py-3 m-2"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          <strong>Logout</strong>
        </button>
        <button
          className="button small bg-indigo-700 transition-all hover:bg-indigo-900 text-white rounded-2xl px-6 py-3 m-2"
          onClick={async () => {
            await addAccount()
          }}
        >
          <strong>View Accounts</strong>
        </button>
        <AccountsModal
          onClose={() => setAccountsModalOpen(false)}
          isOpen={accountsModalOpen}
        ></AccountsModal>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="bg-indigo-700 transition-all hover:bg-indigo-900 text-white rounded-2xl px-6 py-3 m-2">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="bg-indigo-700 transition-all hover:bg-indigo-900 text-white rounded-2xl px-6 py-3 m-2">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
