import { React } from "react";
import { button } from "semantic-ui-react";


   const clickMe = () => {

       document.location.href('../pages/Loginpage.js')

   



   return (

      <>
      <button onClick={clickMe}>Login</button>
      </>

   );

   }

export default Login;