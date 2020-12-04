import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { commerce } from "../../lib/commerce";
import Product from "./Product/Product";
import useStyles from "./products-styles";

const productss = [
  { id: 1, name: "a", price: "399", description: "Nice" },
  { id: 2, name: "b", price: "199", description: "Good" },
];

const Products = ({ onHandleCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products &&
          products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onHandleCart={onHandleCart} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
