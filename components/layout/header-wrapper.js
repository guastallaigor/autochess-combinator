import tw from "twin.macro";

const HeaderWrapper = () => {
  return (
    <header>
      <h1 tw="mt-6 text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-600 animate-pulse">
        <span tw="block xl:inline">Auto Chess</span>
        <span tw="xl:inline hidden">&nbsp;</span>
        <span tw="block xl:inline">Combinator</span>
      </h1>
    </header>
  );
};

export default HeaderWrapper;
