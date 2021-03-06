import tw, { styled } from "twin.macro";
import PropTypes from "prop-types";
import download from "downloadjs";
import { memo, useState, useEffect, useRef, useCallback, useMemo } from "react";
import html2canvas from "html2canvas";
import SmallFrontCard from "../card/small-front-card";
import BuffsImg from "./buffs-img";
const prefixMap = `ml-3 h-9 px-3 flex items-center justify-center transition-opacity duration-300 ease-in-out rounded-md text-white hover:opacity-75`;
const styleMap = {
  disabled: tw`${prefixMap} cursor-not-allowed opacity-75 bg-gray-500`,
  default: tw`${prefixMap} bg-purple-800`
};
const getButtonStyle = ({ status }) => styleMap[status] || styleMap.default;
const Button = styled.button(getButtonStyle);
const noSelected = (selected) => !selected.filter((it) => it.name).length;

const DownloadBtn = ({ selected, buffs }) => {
  const [downloading, setDownloading] = useState(() => false);
  const first = useRef(true);
  const status = useMemo(() => (noSelected(selected) ? "disabled" : ""), [selected]);
  const disabled = useMemo(() => noSelected(selected), [selected]);
  let timeout;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    if (!downloading || !selected.length) return;

    try {
      timeout = setTimeout(async () => {
        const drawGrid = document.querySelector("#grid-download");
        if (drawGrid) {
          drawGrid.style.display = "block";
          const canvas = await html2canvas(drawGrid, {
            backgroundColor: "rgb(31, 41, 55)"
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

    return () => {
      clearTimeout(timeout);
      first.current = true;
    };
  }, [downloading, setDownloading]);

  const onDownload = useCallback(() => {
    setDownloading(true);
  }, [setDownloading]);

  // ! TODO
  // ! This component is rendering twice for some reason in every action

  return (
    <>
      {downloading && (
        <div
          id="grid-download"
          tw="fixed"
          style={{
            right: "-9999px",
            bottom: "-9999px",
            display: "none"
          }}>
          <h1 tw="mt-6 text-center text-3xl tracking-tight font-extrabold text-yellow-100 w-full">
            <span tw="block">Auto Chess Combinator</span>
            <span tw="block text-sm">by @guastallaigor</span>
          </h1>
          <div tw="flex flex-wrap items-center flex-row justify-center mt-6 mb-1 min-h-32">
            <BuffsImg buffs={buffs} priority={true} />
          </div>
          <div tw="grid grid-cols-5 mb-9 pr-11">
            {selected.map((fieldsData) =>
              fieldsData && fieldsData.name ? (
                <div tw="ml-6 mt-6" key={fieldsData.icon}>
                  <SmallFrontCard fieldsData={fieldsData} />
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
      <Button type="button" onClick={onDownload} status={status} disabled={disabled}>
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
          tw="mr-2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        <span tw="text-base">{downloading ? "Downloading..." : "Download"}</span>
      </Button>
    </>
  );
};

DownloadBtn.propTypes = {
  selected: PropTypes.array.isRequired,
  buffs: PropTypes.array.isRequired
};

export default memo(DownloadBtn);
