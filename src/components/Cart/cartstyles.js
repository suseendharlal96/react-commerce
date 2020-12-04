import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "5%",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    position: "fixed",
    backgroundColor:'rgba(0,0,0,0.55)',
    color:'#fff',
    padding:'10px',
    bottom:'0',
    left:'0px',
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
}));