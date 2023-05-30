import React, { useEffect, useState } from "react";
import { ProductInterface } from "../../types/product";
import { Link, useLoaderData } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Rating } from "../components/Rating";
import axios from "axios";

export const productLoader: ({
  params,
}: {
  params: any;
}) => Promise<ProductInterface> = async ({ params }) => {
  const { data } = await axios.get(`/api/products/${params.productId}`);

  return data;
};

export const ProductScreen: React.FC = (props) => {
  console.log("props", props);
  const product = useLoaderData() as ProductInterface;
  //   const [product, setProduct] = useState<ProductInterface>(loaderProduct);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {product ? (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  numReviews={product.numReviews}
                  color="red"
                />
              </ListGroupItem>
              <ListGroupItem>Price: £{product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>£{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="d-grid">
                  <Button type="button" disabled={product.countInStock < 1}>
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        "No Product"
      )}
    </>
  );
};
