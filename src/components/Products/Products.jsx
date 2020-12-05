import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Product from "./Product/Product";
import useStyles from "./products-styles";
import * as actions from "../../store/actions";

const Products = ({ onHandleCart, ...props }) => {
  const classes = useStyles();
  // const [products, setProducts] = useState(null);
  useEffect(() => {
    props.getProducts();
  }, []);
  // const getProducts = async () => {
  //   try {
  //     const { data } = await commerce.products.list();
  //     console.log(data);
  //     setProducts(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {props.loading ? (
          <p>Loading...</p>
        ) : (
          props.products &&
          props.products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </main>
  );
};

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  loading: state.productReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(actions.getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
