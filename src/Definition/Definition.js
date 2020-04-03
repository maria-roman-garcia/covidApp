import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import './Definition.scss';
import MenuLateral from '../Definition/menuLateral/MenuLateral'
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';

const photos = [
  {
    src: `${img1}`,
    altText: 'Slide 1'
  },
  {
    src: `${img2}`,
    altText: 'Slide 2'
  },
  {
    src: `${img3}`,
    altText: 'Slide 3'
  }
];

const Definition = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === photos.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? photos.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = photos.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className = "carouselItem" style={{backgroundImage:`url(${item.src})`}}>
          <div className="carouselText">
            <h1>COVID-19</h1>
          </div>
        </div>
      </CarouselItem>
    );
  });

  
  return (
    <div className="Definition">
       <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={photos} activeIndex={activeIndex} onClickHandler={goToIndex}/>
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    <MenuLateral/>
    </div>
  );
}

export default Definition;