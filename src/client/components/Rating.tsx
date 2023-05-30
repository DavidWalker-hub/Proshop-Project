import React from "react";

interface RatingProps {
  value: number;
  numReviews: number;
  color?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  numReviews,
  color = "yellow",
}) => {
  const possibleValues = [...new Array(5).keys()];
  return (
    <div className="rating">
      {possibleValues.map((pV) => (
        <span key={pV}>
          <i
            style={{ color }}
            className={
              value >= pV + 1
                ? "fas fa-star"
                : value >= pV + 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      <span className="rating-text">
        {numReviews ? `${numReviews} reviews` : ""}
      </span>
    </div>
  );
};
