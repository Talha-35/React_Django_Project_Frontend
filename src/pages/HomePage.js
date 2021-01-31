import React, { useEffect, useState , useContext } from "react";
import Container from "@material-ui/core/Container";
import CardList from "../components/CardList";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import logo from '../assets/load.gif';
import { makeStyles } from "@material-ui/core/styles";
import PaginatPage from '../components/Pagination';

const HomePage = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState([])
  const [currentPage, setCurrentPage] = useState(2);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const {postList, setPostList, fetchDataList}=useContext(AuthContext)

  
  const useStyles = makeStyles((theme) => ({
    styleLogo:{
      justifyContent: "center",
      marginTop:50
    }
  }));

  const classes = useStyles();
  
  async function fetchData() {
    setLoading(true)
    try {
      const results = await axios.get(
        "https://blog-backend-ysf.herokuapp.com/list/"
      );
      setPostData(results?.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [postList]);

  // Get current posts

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }


    {if (loading) {
      return (
        <div className={classes.container} >
        <img className={classes.styleLogo} src={logo} alt="loading..." />
        </div>
      )
    }

    else 
    return(
    <Container>
      <PaginatPage postsPerPage={postsPerPage} 
      totalPosts={postData.length} 
      paging={paginate} />
      <CardList postData={currentPosts} />
    </Container>
    )
    }
};
export default HomePage;