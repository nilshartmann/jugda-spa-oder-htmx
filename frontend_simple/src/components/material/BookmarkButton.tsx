import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

const recipeListRoute = getRouteApi("/recipes/");

type BookmarkButtonProps = {
  recipeId: string;
};

const updateBookmarks = (
  currentBookmarks: string[] | undefined,
  recipeId: string,
  bookmarked: boolean,
) => {
  const bAlreadyBookmarked = currentBookmarks?.includes(recipeId);
  if (bookmarked) {
    if (bAlreadyBookmarked) {
      // already bookmarked
      return currentBookmarks;
    }
    return currentBookmarks ? [...currentBookmarks, recipeId] : [recipeId];
  }

  if (bAlreadyBookmarked) {
    const newBookmarks = currentBookmarks!.filter((b) => b !== recipeId);
    return newBookmarks.length ? newBookmarks : undefined;
  }

  return currentBookmarks;
};

export function BookmarkButton({ recipeId }: BookmarkButtonProps) {
  const navigate = useNavigate();

  const isBookmarked = recipeListRoute.useSearch({
    select: (s) => s.bookmarkedRecipeIds?.includes(recipeId),
  });

  console.log("BookmarkButton isBookmarked", recipeId, isBookmarked);

  return (
    <div className={"absolute right-8 top-8 "}>
      <div
        className={
          "flex h-9 w-9 items-center justify-center rounded-full bg-white"
        }
        onClick={(e) => {
          e.preventDefault();
          navigate({
            from: "/recipes/",
            search: (s) => ({
              ...s,
              bookmarkedRecipeIds: updateBookmarks(
                s.bookmarkedRecipeIds,
                recipeId,
                !isBookmarked,
              ),
            }),
          });
        }}
      >
        <i
          className={twMerge(
            "fa-solid fa-bookmark text-lg text-gray-300 transition-all duration-500 ease-in-out hover:text-orange_2",
            isBookmarked && "text-green hover:text-green",
          )}
        ></i>
      </div>
    </div>
  );
}
