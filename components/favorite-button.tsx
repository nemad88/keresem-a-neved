"use client";

import { toggleFavorite } from "@/actions/favorite";
import { useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "./ui/button";

const FavoriteButton = ({
  nameId,
  isFavoriteInitial,
}: {
  nameId: string;
  userId?: string;
  isFavoriteInitial?: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(() => {
          setIsFavorite((prev) => !prev);
        });
        try {
          toggleFavorite(nameId);
        } catch {
          setIsFavorite(isFavoriteInitial);
        }
      }}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
};

export default FavoriteButton;
