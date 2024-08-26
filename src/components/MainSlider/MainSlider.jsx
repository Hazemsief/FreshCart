import React from 'react';
import Slider from 'react-slick';
import picture1 from '../../assets/images/grocery-banner.png';
import picture2 from '../../assets/images/grocery-banner-2.jpeg';
import Slide1 from '../../assets/images/slider-image-3.jpeg';
import Slide2 from '../../assets/images/slider-image-2.jpeg';
import Slide3 from '../../assets/images/slider-image-1.jpeg';

export default function MainSlider() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <div className='flex mt-10'>

      {/* Slider on the right side */}
      <div className='w-2/3 '>
        <Slider {...sliderSettings}>
          <div>
            <img className='w-full h-[400px] object-cover' src={Slide1} alt="Slide 1" />
          </div>
          <div>
            <img className='w-full h-[400px] object-cover' src={Slide2} alt="Slide 2" />
          </div>
          <div>
            <img className='w-full h-[400px] object-cover' src={Slide3} alt="Slide 3" />
          </div>
        </Slider>
      </div>
      
      {/* Fixed Images on the left side */}
      <div className='w-1/3 flex flex-col'>
        <img className='w-full h-[200px] object-cover' src={picture1} alt="picture1" />
        <img className='w-full h-[200px] object-cover' src={picture2} alt="picture2" />
      </div>
    </div>
  );
}
