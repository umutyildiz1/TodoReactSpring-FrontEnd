import {Navbar} from 'react-bootstrap'
function Nav_bar(){
return (
    <Navbar bg="dark">
    <h1 style = {{color:"white"}}>Todo App</h1>
    <a style = {{width:"100px",display:"block",position:"absolute",border:"3px solid lightgray",borderRadius:"15px",color:"white",right:"150px",textAlign:"center",cursor:"pointer"}}>Sign Up</a>
    <a style = {{width:"100px",display:"block",position:"absolute",border:"3px solid lightgreen",borderRadius:"15px",color:"lightgreen",right:"25px",textAlign:"center",cursor:"pointer"}}>Login</a>
  </Navbar>
)
}

export default Nav_bar;