import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Container, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import styles from './Dashboard.module.css'
import Cards from '../cards/Cards'
import Chart from '../chart/Chart'
import PieChart from '../piechart/PieChart'
import SwithCountry from '../switchcountry/SwitchCountry'
import {
  fetchAsyncGetTotal,
  fetchAsyncGetDaily,
  selectData,
} from '../covidSlice'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: 85,
  },
}))

const Dashboard: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const data = useSelector(selectData)

  useEffect(() => {
    dispatch(fetchAsyncGetTotal())
    dispatch(fetchAsyncGetDaily())
  }, [dispatch])

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid 19 Live Dashboard
          </Typography>
          {data && (
            <Typography variant="body1">
              {new Date(data.lastUpdate).toDateString()}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Container className={classes.content}>
      <h3>
        Recovered persons（回復者数）は、
        2022.7.31現在、API側から0で返ってきてしまっている模様
        https://covid19.mathdro.id/api/recovered
      </h3>
        <div className={styles.container}>
          <SwithCountry />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Chart />
          </Grid>

          <Grid item xs={12} md={5}>
            <PieChart />
          </Grid>

          <Grid item xs={12} md={12}>
            <Cards />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Dashboard
