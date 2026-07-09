import UserMenu from "@/Components/Common/UserMenu";
import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";
import React from "react";

function DasboardPageLayout({ title, children }) {
  const { data: user, isLoading, isError } = useUser();
  const logoutMutation = useLogout();

  return (
    <main className="h-full w-full">
      <header className="px-8 md:px-12 py-4 md:py-6 flex justify-between items-center border-b border-zinc-200">
        <h1 className="text-2xl font-semibold text-zinc-800">{title}</h1>

        <UserMenu user={user} logoutMutation={logoutMutation} />
      </header>

      <section className="h-full w-full p-8">{children}</section>
    </main>
  );
}

export default DasboardPageLayout;
