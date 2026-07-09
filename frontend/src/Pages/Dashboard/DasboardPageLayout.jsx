import React from "react";

function DasboardPageLayout({ title, children }) {
  return (
    <main className="h-full w-full">
      <header className="p-6 flex justify-between items-center border-b border-zinc-200">
        <h1 className="text-2xl font-semibold text-zinc-800">{title}</h1>
      </header>

      <section className="h-full w-full p-8">{children}</section>
    </main>
  );
}

export default DasboardPageLayout;
