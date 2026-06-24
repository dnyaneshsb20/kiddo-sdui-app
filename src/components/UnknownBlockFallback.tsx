import React from "react";

export const UnknownBlockFallback = ({ type }: { type: string }) => {
  if (__DEV__) {
    console.warn(`Unrecognized block type: ${type}`);
  }
  return null;
};
