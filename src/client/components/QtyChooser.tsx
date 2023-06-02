import React, { useState } from "react";
import { FormSelect } from "react-bootstrap";
import { Item } from "../../types/cart";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

interface Props {
  qty?: number;
  setQty?: React.Dispatch<React.SetStateAction<number>>;
  countInStock: number;
  updateCart?: boolean;
  item?: Item;
}

export const QtyChooser: React.FC<Props> = ({
  qty,
  setQty,
  countInStock,
  updateCart = false,
  item,
}) => {
  const dispatch = useDispatch();

  const handleSetQty = (newQty: number) => {
    if (updateCart) {
      dispatch(
        addToCart({
          ...(item as Item),
          qty: newQty,
        })
      );
    } else {
      if (setQty) {
        setQty(newQty);
      }
    }
  };

  return (
    <>
      <FormSelect
        size="sm"
        value={qty}
        onChange={(e) => handleSetQty(Number(e.target.value))}
      >
        {[...new Array(countInStock).keys()].map((stockQty) => {
          const qty = stockQty + 1;
          return (
            <option key={qty} value={qty}>
              {qty}
            </option>
          );
        })}
      </FormSelect>
    </>
  );
};
