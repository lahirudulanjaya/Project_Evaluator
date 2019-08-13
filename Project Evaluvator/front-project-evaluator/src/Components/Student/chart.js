// import React, { PureComponent } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';

// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];

// const CustomizedDot = (props) => {
//   const {
//     cx, cy, stroke, payload, value,
//   } = props;

  

//   return (
//     <svg x={cx - 100} y={cy - 100} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
//       <path d="M512.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
//     </svg>
//   );
// };

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9y9zrpjp/';

//   render() {
//     return (
//       <LineChart
//         width={1500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={<CustomizedDot />} />
//         <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//       </LineChart>
//     );
//   }
// }


import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
  AreaChart, Area,
} from 'recharts';
import {connect} from 'react-redux'
import {getmilestones} from '../../actions/milestoneActions'
import { getuserprofile } from '../../actions/authActions'
import { throws } from 'assert';
import Axios from 'axios'
const data = [
  {
    name: 'Project Initiation', weeks: 0,
  },
  {
    name: 'Priliminary', weeks: 4, 
  },
  {
    name: 'SRS', weeks: 6, 
  },
  {
    name: 'Interium', weeks: 10,
  },
  {
    name: 'Final', weeks: 12, 
  }
];

 class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nskpgcrz/';

  constructor(props){
    super(props)
    this.state={

    }
    this.props.getuserprofile()
  }
  componentDidMount(){
      console.log(this.props.user)
    Axios.get('http://localhost:4000/api/pg/getstudents/'+this.props.user.Registrationnumber).then(resp=>{
          if(resp.data>0)
          this.props.getmilestones(resp.data[0].Projectname)
      })
  }
  componentWillReceiveProps(nextprops){
     
      console.log(nextprops)
  }

  render() {
    return (
      <div>
        <h4>Current Position</h4>
        <LineChart
          width={1500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 45, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weeks" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
       
   
      </div>
    );
  }
}


const mapStateToProps = state => {
    return{
  
      milestone: state.milestone, 
      user: state.auth.user

   
  }};
  
  
  export default connect(mapStateToProps,{getmilestones,getuserprofile})(Example);
