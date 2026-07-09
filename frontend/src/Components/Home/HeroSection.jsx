import React, { useState } from "react";
import InputButton from "../Common/InputButton";
import UrlShortnerDemo from "../Common/UrlShortnerDemo";
import useUser from "../../hooks/useUser";
import { Link, useNavigate } from "react-router";
import useCreateLink from "../../hooks/useCreateLink";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { IoDiamondOutline } from "react-icons/io5";

function HeroSection() {
  const [url, setUrl] = useState("");

  const typewriterTexts = [
    {
      text: "Shorten",
      className: "text-zinc-800/70 font-semibold",
    },
    {
      text: "your",
      className: "text-zinc-800/70 font-semibold",
    },
    {
      text: "links",
      className: "text-zinc-800/70 font-semibold",
    },
    {
      text: "with",
      className: "text-zinc-800/70 font-semibold",
    },
    {
      text: "ease.",
      className: "text-blue-600/70 font-semibold",
    },
  ];

  const { data: user, isLoading, isError } = useUser();
  const createLinkMutation = useCreateLink();

  const navigate = useNavigate();

  const handleShortenClick = (e) => {
    e.preventDefault();

    if (!user?.data) {
      navigate("/login");
      return;
    }

    createLinkMutation.mutate({ originalUrl: url });
  };

  return (
    <section className="w-full my-6 flex justify-center items-center pt-7 flex-col">
      <UrlShortnerDemo className="my-4 text-sm" />

      <h1 className="text-5xl md:text-6xl font-semibold text-center text-zinc-900 flex flex-col gap-2">
        <p>Shorten URLS.</p>
        <p>Track Every Click.</p>
        <TypewriterEffect words={typewriterTexts} className="my-4" />
      </h1>

      <p className="text-center text-xl text-zinc-500 my-6 w-full max-w-md">
        The all-in-one link management platform for marketers, developers, and
        teams.
      </p>

      <Link
        to="/dashboard/create-link"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg my-6 hover:bg-purple-700 transition-colors animate-pulse flex items-center gap-2"
      >
        <p>Generate a custom link</p>
        <IoDiamondOutline />
      </Link>

      <InputButton
        className=""
        placeholder="Enter your URL here"
        buttonText={createLinkMutation.isPending ? "Shortening..." : "Shorten"}
        onSubmit={handleShortenClick}
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        type="url"
      />

      {createLinkMutation.isError && (
        <p className="mt-2">
          {createLinkMutation.error?.response?.data?.message ||
            "An error occurred while shortening the URL."}
        </p>
      )}
    </section>
  );
}

export default HeroSection;
