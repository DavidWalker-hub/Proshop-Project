import React from "react";
import { Card } from "react-bootstrap";
import { ProductInterface } from "../../types/product";
import { Rating } from "./Rating";
import { Link } from "react-router-dom";

interface Props {
  product: ProductInterface;
}

export const Product: React.FC<Props> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as={"div"} className="mb-2">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            numReviews={product.numReviews}
            // color={"red"}
          />
        </Card.Text>
        <Card.Text as="h3">£{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
