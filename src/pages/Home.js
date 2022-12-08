import { useEffect } from "react";

const Home = () => {
        useEffect(() => {
          window.location.replace('http://localhost:8080/home')
        }, [])
      
    return ( 
    <>
    
    </> 
    );
}
 
export default Home;