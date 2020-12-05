import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import useStyles from "./product-styles";

const Product = ({ product, ...props }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="h6"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          onClick={() => props.addToCart(product.id, 1)}
          aria-label="add to cart"
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => dispatch(actions.addToCart(id, 1)),
});

export default connect(null, mapDispatchToProps)(Product);
