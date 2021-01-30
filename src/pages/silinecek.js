import React,{useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";
import Badge from "@material-ui/core/Badge";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postDataWithToken } from '../helper/FetchData'
import { useHistory } from "react-router-dom";
import axios from "axios";

//STYLE

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    paddingRight: 150,
    paddingLeft: 150,
  },

  button: {
    margin: theme.spacing(1),
    height: 55,
  },
  button2: {
    margin: theme.spacing(1),
  },
  commentForm: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 35,
  },
  root2: {
    maxWidth: 350,
    marginTop: 50,
    paddingLeft: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));






//FUNCTION
export default function CardDetail({ slug }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const matches = useMediaQuery("(min-width:750px)");
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .max(100, "this comment ist too long")
      .min(1,"You must write something")
  });
  
  const initialValues = {
    content: "",
  };
  
//   console.log('slug2',slug)
// async function onSubmit(values){
//   try{
//     const Token = localStorage.getItem("Token");
//     const response = axios.post(`https://blog-backend-ysf.herokuapp.com/${slug}/comment/`,values,{
//       headers: {
//         Authorization: `Token ${Token}`,
//       },
      
//     })
//   } catch(err){
//     console.log(err)
//   }
//   console.log('value',values)
//   console.log('slug',slug)
//   history.push("/:slug/detail");
// }
  
async function fetchData() {
  try {
    const res = await axios.get(
      `https://blog-backend-ysf.herokuapp.com/${slug}/detail`
    );
    
    setPostDetail(res?.data);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  fetchData();
}, [comment]);

  
  const onSubmit = (values) => {
    postDataWithToken(`https://blog-backend-ysf.herokuapp.com/${slug}/comment/`, values)
    .then((data) => {
      console.log('values',values)
      setComment(data)
      history.push("/:slug/detail");
      formik.values.content = ''
      setComment('')
      console.log("slug",slug)
    })
    .catch((err) => {
      console.log(err);
    });
  }
      
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
 

  return (
    <Card className={matches ? classes.root : classes.root2} author={postDetail?.author}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {postDetail?.author[0]}
          </Avatar>
        }
        title={postDetail?.title}
        subheader={moment(postDetail?.publish_date).startOf("hour").fromNow()}
      />
      <Typography style={{ fontSize: 18, margin: 20, color: "crimson" }}>
        created by {postDetail?.author}
      </Typography>

      <CardMedia
        className={classes.media}
        image={postDetail?.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {postDetail?.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Badge badgeContent={postDetail?.like_count} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="Visibility">
          <Badge badgeContent={postDetail?.view_count} color="secondary">
            <VisibilityIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="ChatBubbleOutline">
          <Badge badgeContent={postDetail?.comment_count} color="secondary">
            <ChatBubbleOutlineIcon />
          </Badge>
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Typography style={{ color: "#187965" }}>See Comments</Typography>
      </CardActions>

      {/* <CssTextField className={classes.margin} id="custom-css-standard-input" fullWidth label="Comment" /> */}
      <form className={classes.commentForm} onSubmit={formik.handleSubmit}>
        <TextField
          name='content'
          id="content"
          style={{ display: "inline-block", float: "right" }}
          label="Comments"
          placeholder="leave your Comment"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={formik.content}
          value={formik.values.content}
          onBlur={formik.handleBlur}
          {...formik.getFieldProps("content")}
          error={formik.touched.content && formik.errors.content}
          helperText={formik.touched.content && formik.errors.content}
        />

        <Button
          type='submit'
          style={{ fontWeight: "bold" }}
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<SendIcon>send</SendIcon>}
        >
          Send
        </Button>
      </form>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {postDetail?.comments.map((comment) => {
            return (
              <Typography paragraph>
                <b>{comment.content}</b> comment by <i>{comment.user}</i> at{" "}
                {moment(comment.time).startOf("hour").fromNow()}
              </Typography>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}









import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardDetail from "../components/CardDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuComponent from "../components/MenuComponent";
import { postDataWithToken } from '../helper/FetchData'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    flexGrow: 1,
    marginBottom: 150,
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

  // const [postDetail, setPostDetail] = useState();

  // async function fetchData() {
  //   try {
  //     const res = await axios.get(
  //       `https://blog-backend-ysf.herokuapp.com/${slug}/detail`
  //     );
      
  //     setPostDetail(res?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



  // useEffect(() => {
  //   fetchData();
  // }, []);
let author;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {localStorage.getItem("currentUser") === author ? (
          <MenuComponent slug={slug} />
        ) : null}
        <Grid item xs={12}>
          <CardDetail  slug={slug} author = {author}/> 
          {/* post={postDetail} */}

        </Grid>
      </Grid>
    </div>
  );
};
export default DetailPage;




