import React, { useEffect, useState } from "react";
import InputButton from "../../Components/Common/InputButton";
import { IoMdLink } from "react-icons/io";
import { MdDeleteOutline, MdOutlineContentCopy } from "react-icons/md";
import useLinks from "../../hooks/useLinks.";
import useDeleteLink from "../../hooks/useDeleteLink";
import { Link } from "react-router";

function MyLink() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);

  const { data: links, isLoading, isError, error } = useLinks();
  const deleteLinkMutation = useDeleteLink();

  const handleDeleteLink = (linkId) => {
    deleteLinkMutation.mutate(linkId);
  };

  const handleCopyLink = (link) => {
    const shortLink = link.shortLink;

    navigator.clipboard
      .writeText(shortLink)
      .then(() => {
        console.log(`Copied link: ${shortLink}`);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setFilteredLinks(links?.data || []);
    } else {
      setFilteredLinks(
        links?.data?.filter(
          (link) =>
            link.shortLink.includes(searchTerm) ||
            link.originalUrl.includes(searchTerm) ||
            (link.title && link.title.includes(searchTerm)),
        ) || [],
      );
    }
  };

  useEffect(() => {
    if (!links?.data) return;

    if (searchTerm.trim() === "") {
      setFilteredLinks(links.data);
    } else {
      setFilteredLinks(
        links.data.filter(
          (link) =>
            link.shortLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (link.title &&
              link.title.toLowerCase().includes(searchTerm.toLowerCase())),
        ),
      );
    }
  }, [searchTerm, links]);

  return (
    <main className="w-full pb-4">
      <InputButton
        placeholder="Search links by slug, URL, or title..."
        className="md:w-full"
        buttonText="Search Links"
        onSubmit={handleSearch}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
      />

      <div className="w-full mt-8 border border-zinc-200 rounded-xl overflow-hidden">
        {isLoading ? (
          <p className="text-zinc-500 text-center py-8">Loading links...</p>
        ) : isError ? (
          <p className="text-red-500 text-center py-8">
            Error fetching links: {error.message}
          </p>
        ) : null}

        {filteredLinks?.length === 0 ? (
          <p className="text-zinc-500 text-center py-8">No links found.</p>
        ) : (
          filteredLinks
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            ?.map((link) => (
              <div
                key={link._id}
                className="flex items-center gap-4 p-6 border-t border-b border-zinc-200 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <span className="p-3 bg-blue-500/10 text-blue-500 rounded-xl text-xl">
                  <IoMdLink />
                </span>

                <div className="flex flex-col gap-2 grow min-w-0">
                  <a
                    href={link.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-800 font-medium truncate hover:text-blue-500 transition-colors"
                  >
                    {link.shortLink}
                  </a>

                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 text-sm truncate hover:text-blue-500 transition-colors"
                  >
                    {link.originalUrl}
                  </a>
                </div>

                <div className="hidden md:flex flex-col gap-2 ml-auto">
                  <p className="text-zinc-800 font-medium">
                    {link.analytics?.totalClicks || "N/A"} Clicks
                  </p>

                  <p className="text-zinc-500 text-sm truncate">
                    {link.analytics?.totalUniqueClicks || "N/A"} Unique Visitors
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4 text-xl">
                  <button
                    className="text-red-400 hover:text-red-500 transition-colors cursor-pointer"
                    onClick={() => handleDeleteLink(link._id)}
                  >
                    {deleteLinkMutation.isPending ? (
                      <span className="loader"></span>
                    ) : (
                      <MdDeleteOutline />
                    )}
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => handleCopyLink(link)}
                  >
                    <MdOutlineContentCopy />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </main>
  );
}

export default MyLink;
