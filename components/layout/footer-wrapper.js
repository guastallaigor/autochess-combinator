import tw from "twin.macro";

const FooterWrapper = () => {
  return (
    <footer tw="w-full h-32 py-6 px-6 lg:px-0 flex items-end justify-center">
      <div tw="text-center text-gray-200 font-bold">
        <div tw="text-xs flex flex-col flex-wrap items-center justify-center mt-6 leading-normal">
          <span>This is an unofficial project</span>
          <span>
            I do not work or am I affiliated with Auto Chess, Drodo or Dragonest
            Co.Ltd
          </span>
          <span tw="ml-1">
            For more information about the game, visit
            <a
              href="https://ac.dragonest.com/"
              rel="noreferrer noopener"
              tw="hover:opacity-75 transition-all duration-300 ease-in-out hover:text-yellow-600 pl-1 underline"
              aria-label="Official Website Link"
              target="_blank"
            >
              Auto Chess Official Website
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterWrapper;
