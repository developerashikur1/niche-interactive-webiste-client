import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import GlobalModels from '../GlobalModels/GlobalModels';
import History from '../History/History';
import Slider from '../Slider/Slider'
import Header from '../../Shared/Header/Header'
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Slider></Slider>
            <History></History>
            <GlobalModels></GlobalModels>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;