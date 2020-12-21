import { useState } from "react";

const Tooltip = (props) => {
  let timeout;
  let timeoutClear;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    timeoutClear = setTimeout(() => {
      setActive(false);
      clearTimeout(timeoutClear);
    }, 100);
  };

  return (
    <>
      <div
        className="tooltip-wrapper"
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        onClick={active ? hideTip : showTip}
      >
        {props.children}
        {active && (
          <div
            className={`tooltip-tip ${props.direction || "top"}`}
            dangerouslySetInnerHTML={{
              __html: props.content,
            }}
          ></div>
        )}
      </div>
      <style jsx>{`
        .tooltip-wrapper {
          display: inline-block;
          position: relative;
        }
        .tooltip-tip {
          position: absolute;
          border-radius: 4px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px;
          color: var(--tooltip-text-color);
          background: var(--tooltip-background-color);
          font-size: 15px;
          font-weight: 500;
          font-family: sans-serif;
          line-height: 1;
          z-index: 100;
          width: 200px;
        }
        .tooltip-tip::before {
          content: " ";
          left: 50%;
          border: solid transparent;
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-width: var(--tooltip-arrow-size);
          margin-left: calc(var(--tooltip-arrow-size) * -1);
        }
        .tooltip-tip.top {
          top: calc(var(--tooltip-margin) * -1);
        }
        .tooltip-tip.top::before {
          top: 100%;
          border-top-color: var(--tooltip-background-color);
        }
        .tooltip-tip.right {
          left: calc(100% + var(--tooltip-margin));
          top: 50%;
          transform: translateX(0) translateY(-50%);
        }
        .tooltip-tip.right::before {
          left: calc(var(--tooltip-arrow-size) * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: var(--tooltip-background-color);
        }
        .tooltip-tip.bottom {
          bottom: calc(var(--tooltip-margin) * -1);
        }
        .tooltip-tip.bottom::before {
          bottom: 100%;
          border-bottom-color: var(--tooltip-background-color);
        }
        .tooltip-tip.left {
          left: auto;
          right: calc(100% + var(--tooltip-margin));
          top: 50%;
          transform: translateX(0) translateY(-50%);
        }
        .tooltip-tip.left::before {
          left: auto;
          right: calc(var(--tooltip-arrow-size) * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: var(--tooltip-background-color);
        }
      `}</style>
    </>
  );
};

export default Tooltip;
