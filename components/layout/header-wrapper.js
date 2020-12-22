import tw from "twin.macro";

const HeaderWrapper = () => {
  return (
    <header>
      <h1 tw="mt-6 text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-yellow-100 animate-pulse">
        <span tw="block xl:inline">Auto Chess</span>
        <span tw="xl:inline hidden">&nbsp;</span>
        <span tw="block xl:inline">Combinator</span>
        <a
          href="https://github.com/guastallaigor"
          rel="noreferrer noopener"
          tw="text-sm hover:opacity-75 transition-all duration-300 ease-in-out hover:text-yellow-600 lg:text-base block text-center"
          name="github"
          aria-label="Github Link"
          target="_blank"
        >
          {new Date().getFullYear()} @guastallaigor
        </a>
      </h1>
    </header>
  );
};

export default HeaderWrapper;
