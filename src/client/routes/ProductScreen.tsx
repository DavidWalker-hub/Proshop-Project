import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Rating } from "../components/Rating";
import { useGetProductDetailsQuery } from "../redux/slices/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { ProductInterface } from "../../types/product";

export const ProductScreen: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState<number>(1);
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId as string);

  const handleAddToCart = (product: ProductInterface) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      })
    );
    navigate("/cart");
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <Message variant="danger">
          <>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </>
        </Message>
      );
    } else {
      return <Message variant="danger">{error.message}</Message>;
    }
  }

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

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormSelect
                          size="sm"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...new Array(product.countInStock).keys()].map(
                            (stockQty) => {
                              const qty = stockQty + 1;
                              return (
                                <option key={qty} value={qty}>
                                  {qty}
                                </option>
                              );
                            }
                          )}
                        </FormSelect>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem className="d-grid">
                  <Button
                    type="button"
                    disabled={product.countInStock < 1}
                    onClick={() => handleAddToCart(product)}
                  >
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
