import $ from "jquery"
import { useEffect } from "react";
export const App = () => {
useEffect(() => {
  alert($("#input").val())
})
  return(
      <>
      <div>
        <h1>React App.</h1>
      </div>
      <div>
        <input name="input" id="input" value="jQuery with ReactJS"/>
      </div>
      </>
     )
  }
export default App
