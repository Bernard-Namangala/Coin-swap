import React from "react";

type propTypes = {
  height?: number;
  width?: number;
};

const LoadingShimmer = (props: propTypes) => {
  const { height, width } = props;

  return (
    <div
      style={{
        width: width ? `${width}px` : "100%",
        height: `${height}px` ? height : "4px",
        background: "#717A8C",
      }}
      className={`custom_shimmer`}
    />
  );
};

export default LoadingShimmer;
