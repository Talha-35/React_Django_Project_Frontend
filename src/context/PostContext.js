import { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

function PostContextProvider(props) {
  const [postData, setPostData] = useState();

  const fetchData = async () => {
    const result= await axios.get(
      'https://rd-restful-blog.herokuapp.com/list/',
    );
    setPostData(result.data)
}

  useEffect(() => {
    
  }, []);

  return (
    <PostContext.Provider value={{ currentUser }}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;