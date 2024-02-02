// client/src/components/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleUpdateStock = async (id, newStock) => {
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, {
        stock: newStock,
      });
      // Refresh the product list after updating stock
      const response = await axios.get("http://localhost:3001/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <Card key={product.id} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography>SKU: {product.SKU}</Typography>
            <Typography>Category: {product.Category}</Typography>
            <Typography>Price: ${product.Price}</Typography>
            <Typography>Stock: {product.Stock}</Typography>
            <input
              type="number"
              placeholder="New Stock"
              onChange={(e) => handleUpdateStock(product.id, e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProductList;
