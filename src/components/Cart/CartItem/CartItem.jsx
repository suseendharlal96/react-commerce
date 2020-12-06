import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { connect } from "react-redux";

import useStyles from "./style";
import * as actions from "../../../store/actions";

const CartItem = ({ item, ...props }) => {
  const classes = useStyles();

  return (
    <Card className="cart-item">
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => props.updateCart(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => props.updateCart(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => props.removeItemFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCart: (id, quantity) => dispatch(actions.updateCart(id, quantity)),
  removeItemFromCart: (id) => dispatch(actions.removeItemFromCart(id)),
});

export default connect(null, mapDispatchToProps)(CartItem);
