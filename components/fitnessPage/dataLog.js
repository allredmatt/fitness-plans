import { useState, useEffect }  from "react";
import { getInputDataById }     from '../serverFetch'
import { makeStyles }           from '@material-ui/core/styles';
import Typography               from '@material-ui/core/Typography';
import Paper                    from '@material-ui/core/Paper'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  }                             from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'min(100%, 600px)',
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  mainColour:{
      color: theme.palette.text.primary
  }
}));

export default function DataLog ({customId, flexDirection}) {

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
          <Paper className={classes.root}>
              <Typography  gutterBottom variant="subtitle1">
                  Chart of {userData.details}:
              </Typography>
              <div >
              <br />
              <Chart data={userData.inputtedData} unit={userData.inputDataUnit}/>
              </div>     
          </Paper>
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
      <XAxis dataKey="shortTitle" tick={{fill: '#fafafa'}}/>
      <YAxis label={{value: unit, angle: -90, position: 'insideLeft', fill:'#fafafa' }} domain={['dataMin', 'dataMax']} tick={{fill: '#fafafa'}}/>
      <Tooltip />
      <Line type="monotone" dataKey="datum" stroke={classes.mainColour.color} />
  </LineChart>
  </ResponsiveContainer>
  )
}