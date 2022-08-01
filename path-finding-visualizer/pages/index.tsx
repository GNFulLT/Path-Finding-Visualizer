import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '../components/Grid/Grid'
import ListTypeBar from '../components/ListTypeBar/ListTypeBar'
import Navbar from '../components/Navbar/Navbar'
import { useMouse } from '../Hooks/useMouse'


const Home: NextPage = () => {
  return (
   <div>
    <Navbar></Navbar>
    <ListTypeBar></ListTypeBar>
    <Grid className='center' rowCount={30} columnCount={70}></Grid>
   </div>
  )
}

export default Home
