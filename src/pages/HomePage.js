import React, { useEffect, useState , useContext } from "react";
import Container from "@material-ui/core/Container";
import CardList from "../components/CardList";
import axios from "axios";
import {AuthContext} from "../context/AuthContext"

const HomePage = () => {
  // const [postData, setPostData] = useState([]);
  const {postList, setPostList, fetchDataList}=useContext(AuthContext)

  // async function fetchData() {
  //   try {
  //     const results = await axios.get(
  //       "https://blog-backend-ysf.herokuapp.com/list/"
  //     );
  //     setPostData(results?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // console.log(postList)
  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <Container>
      <CardList postData={postList} />
    </Container>
  );
};
export default HomePage;
