import tw, { styled } from "twin.macro";
import download from "downloadjs";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import SmallFrontCard from "../card/small-front-card";

const prefixMap = `ml-3 h-9 px-3 flex items-center justify-center transition-opacity duration-300 ease-in-out rounded-md text-white hover:opacity-75`;
const styleMap = {
  disabled: tw`${prefixMap} cursor-not-allowed opacity-75 bg-gray-500`,
  default: tw`${prefixMap} bg-purple-800`,
};
const getButtonStyle = ({ status }) => styleMap[status] || styleMap.default;
const Button = styled.button(getButtonStyle);

const DownloadBtn = ({ selected }) => {
  const [downloading, setDownloading] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    if (!downloading || !selected.length) return;

    try {
      setTimeout(async () => {
        const drawGrid = document.querySelector("#grid-download");
        if (drawGrid) {
          drawGrid.style.display = "grid";
          const canvas = await html2canvas(drawGrid, {
            backgroundColor: "rgb(31, 41, 55)",
          });
          canvas.toBlob((blob) => {
            download(blob, "autochess-combinator.png", "image/png");
            drawGrid.style.display = "none";
            setDownloading(false);
          }, "image/png");
        }
      });
    } catch (error) {
      console.error(error, ":download_error");
      setDownloading(false);
    }
  }, [downloading]);

  const onDownload = () => {
    setDownloading(true);
  };
  const noSelected = !selected.filter((it) => it.name).length;

  return (
    <>
      {downloading && (
        <div
          id="grid-download"
          tw="fixed grid-cols-5"
          style={{
            right: "-9999px",
            bottom: "-9999px",
            display: "none",
          }}
        >
          {selected.map((fieldsData) =>
            fieldsData && fieldsData.name ? (
              <div tw="ml-6 mt-6" key={fieldsData.icon}>
                <SmallFrontCard fieldsData={fieldsData} />
              </div>
            ) : null
          )}
        </div>
      )}
      <Button
        type="button"
        onClick={onDownload}
        status={noSelected ? "disabled" : ""}
        disabled={noSelected}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          tw="mr-2"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        <span tw="text-base">
          {downloading ? "Downloading..." : "Download"}
        </span>
      </Button>
    </>
  );
};

export default DownloadBtn;
