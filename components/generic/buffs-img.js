import tw from "twin.macro";
import Image from "next/image";
import Tooltip from "./tooltip";
import { getImage } from "../../utils/index";

const BuffsImg = ({ buffs, priority = false }) => {
  return buffs.length
    ? buffs.map((buff, idx) => {
        return (
          <div
            key={`${buff.text}${idx}`}
            tw="h-8 relative"
            className="add-gap-items"
          >
            <div
              tw="absolute text-white z-10 font-bold -top-2 -right-1 text-sm"
              style={{ color: buff.penalty && "red" }}
            >
              {buff.value}
            </div>
            <Tooltip content={buff.buff} direction="bottom">
              <Image
                src={getImage(buff.text)}
                alt="Chess Icon Image"
                layout="fixed"
                width={32}
                height={32}
                quality={70}
                priority={priority}
              />
            </Tooltip>
          </div>
        );
      })
    : null;
};

export default BuffsImg;
