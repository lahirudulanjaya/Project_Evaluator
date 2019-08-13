import React ,{ Component }  from 'react';


import SessionListTable from './Component/SessionListTable';
import {MDBContainer,MDBFooter} from 'mdbreact'


class Scoodinater extends Component{

    constructor(props){
        super(props)

        this.state={
            projectnames:[]
        }
    }

   componentWillReceiveProps()
   {
       console.log(this.props)
   }
    render(){
        return(
            <div className="container">

                <div className="row">
                    <div className="col-sm-12">
                    
                       <SessionListTable></SessionListTable>

                    </div>
                </div>

                <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
   textAlign: "center"}}>
      <MDBFooter color="blue" className="font-small pt-4 mt-4" >
    
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.teamExxo.com"> teamExxo.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
            </div>
        )
    }
} 



export default (Scoodinater)
