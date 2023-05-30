import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "../components/Product";
import { ProductInterface } from "../../types/product";
import axios from "axios";

export const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Welcome to the ProShop</h1>
      <h2>Latest Products</h2>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
