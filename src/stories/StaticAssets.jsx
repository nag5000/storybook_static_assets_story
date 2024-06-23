import React from "react";

export const StaticAssets = () => {
  const modules = import.meta.glob(["/public/assets/**/*.*"], {
    query: "?url",
    import: "default",
    eager: true,
  });

  const assets = Object.entries(modules).map(([path, url]) => ({
    path,
    url: url.replace(/^\/public/, ""),
    filename: path.split("/").pop(),
    isImage: /\.(png|jpe?g|gif|svg|avif)$/.test(path),
    isVideo: /\.(mp4|webm|ogg)$/.test(path),
    isFont: /\.(woff2?|eot|ttf|otf)$/.test(path),
  }));

  console.log(assets);

  return (
    <div className="p-3">
      <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
        {assets.map(({ path, url, filename, isImage, isVideo, isFont }) => (
          <li
            key={path}
            className="grid grid-rows-[1fr_auto] items-center justify-items-center p-1 border border-gray-200 rounded-md gap-1 relative group"
          >
            {isImage && <img src={url} alt="" />}
            {isVideo && <video src={url} muted autoPlay loop />}
            {isFont && (
              <div>
                <style>
                  {`@font-face {
                    font-family: "${filename}";
                    src: url("${url}");
                  }`}
                </style>
                <span
                  style={{ fontFamily: `"${filename}"` }}
                  className="text-xl"
                >
                  AaBbCc
                  <br />
                  012345
                </span>
              </div>
            )}

            <code className="text-xs text-nowrap text-ellipsis overflow-hidden max-w-full">
              {filename}
            </code>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="absolute p-2 top-0 right-0 rounded-md leading-none opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-black focus:text-black"
              aria-label="Open in new tab"
            >
              ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
