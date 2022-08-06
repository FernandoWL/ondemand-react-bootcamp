import React from 'react'
import Featured from '../../components/Featured';
import Layout from '../../components/layout/Layout';
import Categories from '../../components/Categories';
import Slider from '../../components/Slider';

const Home = () =>{
  return <Layout type="withoutNav">
    <Slider/>
    <Categories/>
    <Featured/>
  </Layout>
}

export default Home;