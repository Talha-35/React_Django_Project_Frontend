import React, { useState , useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CardDetail from "../components/CardDetail";
import { useParams } from "react-router-dom";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow : 'hidden'
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
  const { slug } = useParams();
  const [postDetail, setPostDetail] = useState()
  const fetchData = async () => {
    const res = await axios.get(`https://blog-backend-ysf.herokuapp.com/${slug}/detail`)
    setPostDetail(res?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <BlogCard /> */}
          <CardDetail post={postDetail} />
        </Grid>
      </Grid>
    </div>
  );
};
export default DetailPage;
