import React from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

export const HomeScreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery("Product");

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
      return <Message variant="danger">{error.message} </Message>;
    }
  }

  return (
    <>
      <h1>Welcome to the ProShop</h1>
      <h2>Latest Products</h2>
      <Row>
        {products?.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
