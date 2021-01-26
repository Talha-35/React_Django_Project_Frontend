import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
import CardList from '../components/CardList';
import axios from 'axios';

const HomePage = () => {

  const fetchData = async () => {
    const result= await axios.get(
      'https://rd-restful-blog.herokuapp.com/list/',
    );
    console.log("result.data :", result.data)
    return (result.data)
}

useEffect(() =>{
  const response = fetchData()
  console.log("response :  ", response)

})
  

  return (
    <Container>
      <CardList />     
    </Container>
  );
};
export default HomePage;