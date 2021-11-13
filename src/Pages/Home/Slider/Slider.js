import React from 'react';
import { Carousel } from 'react-bootstrap';


const Slider = () => {
    const sliderImage = [
        {image:'https://i.ibb.co/bsdwSZD/main-2-CBR1000-RRR.jpg', id:1},
        {image:'https://i.ibb.co/b34vyqY/main-3-CBR600-RR.jpg', id:2},
        {image:'https://i.ibb.co/9h5VX2g/main-cb1000r1805.jpg', id:3},
        {image:'https://i.ibb.co/tMSjrsd/main-goldwing1805.jpg', id:4},
        {image:'https://i.ibb.co/PZSTFGm/main-history1805.jpg', id:5},
    ]
    return (
        <div>
            <Carousel>

            {/* slider iamge */}
                {sliderImage.map(image=><Carousel.Item interval={1000} key={image.id}>
                    <img
                    className="d-block w-100"
                    src={image.image}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>{image.id}</h3>
                    </Carousel.Caption>
                </Carousel.Item>)}
            </Carousel>
        </div>
    );
};

export default Slider;