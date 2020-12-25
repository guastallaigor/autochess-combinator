import tw from "twin.macro";
import { useEffect } from "react";

const PWABtn = () => {
  let deferredPrompt = null;
  let pwaInstalled = false;

  useEffect(() => {
    // Step 1: Check local storage
    pwaInstalled = localStorage.getItem("pwaInstalled") === "yes";

    // Step 2: Check if the display-mode is standalone. (Only permitted for PWAs.)
    if (
      !pwaInstalled &&
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      localStorage.setItem("pwaInstalled", "yes");
      pwaInstalled = true;
    }

    // Step 3: Check if the navigator is in standalone mode. (Again, only permitted for PWAs.)
    if (!pwaInstalled && window.navigator.standalone === true) {
      localStorage.setItem("pwaInstalled", "yes");
      pwaInstalled = true;
    }

    //*** If the PWA has not been installed, show the install PWA prompt.. ***//
    window.addEventListener("beforeinstallprompt", (event) => {
      deferredPrompt = event;

      // Show the install button if the prompt appeared.
      if (!pwaInstalled) {
        document.querySelector("#installPWA").style.display = "block";
      }
    });

    // When the app is installed, remove install prompts.
    window.addEventListener("appinstalled", (event) => {
      localStorage.setItem("pwaInstalled", "yes");
      pwaInstalled = true;
      document.getElementById("installPWA").style.display = "none";
    });
  }, []);

  const handleClick = async () => {
    // When the app is uninstalled, add the prompts back
    if (deferredPrompt) {
      deferredPrompt.prompt();
      let outcome = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("Auto Chess Combinator was installed successfully.");
      } else {
        console.log(
          "Auto Chess Combinator could not be installed. (Installation rejected by user.)"
        );
      }
      deferredPrompt = null;
    }
  };

  return (
    <div tw="top-1 border-0 left-4 absolute" id="installPWA">
      <button
        onClick={handleClick}
        tw="fill-current w-full h-full"
        style={{
          width: "30px",
          transform: "skew(50deg, -50deg)",
          marginTop: "15px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          baseProfile="full"
          viewBox="0 0 1952 735"
          tw="w-full h-full"
        >
          <defs />
          <path
            fill="#FFFFFF"
            d="M1437 603l56-142h163l-77-217 96-244 277 735h-204l-47-132h-264z"
          />
          <path
            fill="#3182ce"
            d="M1262 735L1559 0h-197l-202 475L1016 0H864L710 475 601 259l-99 304 100 172h193l140-426 134 426h193z"
          />
          <path
            fill="#FFFFFF"
            d="M186 483h121c37 0 70-4 98-13l32-96 87-269c-7-11-14-21-23-30C456 25 391 0 304 0H0v735h186V483zm161-314c17 18 26 41 26 71s-8 53-23 71c-17 19-48 29-94 29h-70V143h71c42 0 72 8 90 26z"
          />
        </svg>
      </button>
    </div>
  );
};

export default PWABtn;
