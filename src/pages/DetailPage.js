import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CardDetail from "../components/CardDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // alignItems : 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const DetailPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <BlogCard /> */}
          <CardDetail />
        </Grid>
      </Grid>
    </div>
  );
};
export default DetailPage;
