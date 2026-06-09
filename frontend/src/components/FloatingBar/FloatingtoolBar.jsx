import { useMemo } from "react";

import {
  IoCopyOutline,
  IoMegaphoneOutline,
  IoLayersOutline,
  IoClipboardOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";

import {
  MdOutlineAutoAwesome,
  MdOutlineImportExport,
} from "react-icons/md";

import { HiOutlineCube } from "react-icons/hi2";

const tools = [
  {
    id: 1,
    icon: IoCopyOutline,
    label: "Duplicate",
    shortcut: "D",
  },

  {
    id: 2,
    icon: MdOutlineAutoAwesome,
    label: "Motion Graphics",
    shortcut: "M",
  },

  {
    id: 3,
    icon: IoMegaphoneOutline,
    label: "Broadcast",
    shortcut: "B",
  },

  {
    id: 4,
    icon: HiOutlineCube,
    label: "3D Object",
    shortcut: "O",
  },

  {
    id: 5,
    icon: IoLayersOutline,
    label: "Layers",
    shortcut: "L",
  },

  {
    id: 6,
    icon: MdOutlineImportExport,
    label: "Transfer",
    shortcut: "T",
  },

  {
    id: 7,
    icon: IoClipboardOutline,
    label: "Clipboard",
    shortcut: "C",
  },
];

export default function FloatingToolbar({
  active,
  setActive,
}) {

  const activeTool = useMemo(
    () => tools.find((t) => t.id === active + 1),
    [active]
  );

  const isYellow = activeTool && activeTool.id % 2 === 0;

  const toolbarBg = isYellow
    ? "bg-[#FFC107]"
    : "bg-[#1a1a1a]";

  const iconDefaultColor = isYellow
    ? "text-white"
    : "text-white/70";

  const iconActiveColor = isYellow
    ? "text-[#FFC107]"
    : "text-[#1a1a1a]";

  const labelBg =
    "bg-[#1a1a1a] text-white";

  const moreIconColor = isYellow
    ? "text-white/80"
    : "text-white/50";

  return (
    <div className="flex flex-col items-center justify-center">

      <div className="relative flex flex-col items-start">

        {/* Active Label */}
        <div
          className={`
            absolute -top-10 left-0
            transition-all duration-300 ease-out
            ${
              activeTool
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }
          `}
          style={{
            left: activeTool
              ? `${
                  tools.findIndex(
                    (t) => t.id === activeTool.id
                  ) *
                    52 +
                  8
                }px`
              : 0,
          }}
        >

          <div
            className={`
              flex items-center gap-2
              px-3 py-1.5
              rounded-lg shadow-lg
              text-sm font-semibold whitespace-nowrap
              ${labelBg}
            `}
          >

            <span>
              {activeTool?.label}
            </span>

            <span
              className="
                bg-white/20
                text-white/70
                text-xs
                px-1.5 py-0.5
                rounded
                font-mono
              "
            >
              {activeTool?.shortcut}
            </span>

          </div>

          {/* Arrow */}
          <div
            className="
              w-2 h-2
              bg-[#1a1a1a]
              rotate-45
              mx-auto
              -mt-1
              rounded-sm
            "
          />

        </div>

        {/* Toolbar */}
        <div
          className={`
            flex items-center gap-1
            px-2 py-2
            rounded-2xl
            shadow-2xl
            transition-all duration-300 ease-in-out
            ${toolbarBg}
          `}
        >

          {tools.map((tool) => {

            const Icon = tool.icon;

            const isActive =
              tool.id === active + 1;

            return (
              <button
                key={tool.id}
                onClick={() =>
                  setActive(tool.id - 1)
                }
                className={`
                  relative
                  w-11 h-11
                  flex items-center justify-center
                  rounded-xl
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? `
                        bg-white
                        ${iconActiveColor}
                        scale-110
                        shadow-md
                      `
                      : `
                        hover:bg-white/10
                        ${iconDefaultColor}
                        hover:scale-105
                      `
                  }
                `}
              >

                <Icon size={20} />

              </button>
            );
          })}

          {/* Divider */}
          <div
            className={`
              w-px h-6 mx-1
              ${
                isYellow
                  ? "bg-white/30"
                  : "bg-white/20"
              }
            `}
          />

          {/* More Button */}
          <button
            className={`
              w-9 h-11
              flex items-center justify-center
              rounded-xl
              hover:bg-white/10
              transition-all duration-200
              ${moreIconColor}
            `}
          >

            <IoEllipsisHorizontal size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}