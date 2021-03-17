import { useState, useEffect }  from "react";
import { getInputDataById }     from '../serverFetch'
import { makeStyles }           from '@material-ui/core/styles';
import Typography               from '@material-ui/core/Typography';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  }                             from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  flex: {
    display: 'flex',
    paddingLeft: theme.spacing(1),
    width: '100%',
    flexGrow: '1'
  },
  padLeft:{
    paddingLeft: theme.spacing(1)
  },
  chartDiv: {
    width: '100%',
    flexGrow: '1'
  },
  accord: {
      flexDirection: 'column'
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
  },
  mainColour:{
      color: theme.palette.text.primary
  }
}));

export default function DataLog ({customId}) {

    const classes = useStyles();

    const [userData, setUserData] = useState([])

    useEffect(() => {
      if(customId){
        getInputDataById(customId)
            .then(data => setUserData(data))
            .catch(error => console.log(error))
      }
    }, [])

    if(userData.length === 0){
        return (null)
    } else {
      return ( 
          <div className={classes.root}>
              <Typography  gutterBottom variant="subtitle1">
                  Chart of {userData.details}:
              </Typography>
              <div className={classes.chartDiv}>
              <br />
              <Chart data={userData.inputtedData} unit={userData.inputDataUnit}/>
              </div>     
          </div>
      )
    }
}


function Chart ({data, unit}) {

  const classes = useStyles()

  return (
  <ResponsiveContainer width="100%" minHeight={200}>
  <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
      top: 5, right: 30, left: 10, bottom: 5,
      }}
  >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="shortTitle" />
      <YAxis label={unit}/>
      <Tooltip />
      <Line type="monotone" dataKey="datum" stroke={classes.mainColour.color} />
  </LineChart>
  </ResponsiveContainer>
  )
}