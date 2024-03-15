import {
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
import { useState } from "react";

export default function PopHover({content}){
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handlePopoverToggle = () => {
      setPopoverOpen(!popoverOpen);
    };
    return (
        <>
        <Popover >
            <PopoverHandler >
                <button classname="h-4 p-4 rounded-full" onClick={handlePopoverToggle}>?</button>
            </PopoverHandler>
            <PopoverContent>
              {content}
            </PopoverContent>
        </Popover>
        </>
    )
}