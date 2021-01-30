import React,{ useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import CardDetail from "../components/CardDetail";
import { useParams } from "react-router-dom";
import MenuComponent from '../components/MenuComponent'
import { fetchDataDetail } from "../helper/FetchData";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow:'hidden',
    flexGrow: 1,
    marginBottom:150
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
 
}));

const DetailPage = () => {
  const { slug } = useParams();
  const classes = useStyles();

  const [postDetail, setPostDetail] = useState()

  fetchDataDetail(slug)
  .then((data) => { 
    setPostDetail(data)
    
  })
  .catch((err) => {
    // toast.error(err.message || " an error occured");
    console.log(err)      
  });
    

  useEffect(() => {
    fetchDataDetail()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {localStorage.getItem('Token') ? <MenuComponent slug = { slug }/> : null}
        <Grid item xs={12}>
          <CardDetail post={ postDetail } fetchData={fetchDataDetail} />
        </Grid>
      </Grid>
    </div>
  );
};
export default DetailPage;