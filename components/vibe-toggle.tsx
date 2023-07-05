"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VibeType } from "@/types";

interface DropDownProps {
  vibe: VibeType;
  setVibe: (vibe: VibeType) => void;
}

let vibes: VibeType[] = ["Professional", "Casual", "Funny"];

export function VibeToggle({ vibe, setVibe }: DropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-full px-0">
          <span>{vibe}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {vibes.map((vibeItem) => (
          <DropdownMenuItem key={vibeItem}>
            <span>{vibeItem}</span>
            {vibe === vibeItem ? (
              <Icons.check className="ml-4 w-4 h-4 text-bold" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
