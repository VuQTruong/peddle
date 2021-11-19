import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SlickImages(props: any) {
  const { items, onChange } = props;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slider',
    afterChange: (current: any) => {
      onChange(current);
    },
  };

  return (
    <div className='slide__container'>
      {/* @ts-ignore */}
      <Slider {...settings}>
        {items.map((item: any, index: number) => (
          <div className='slide__item' key={index}>
            <img src={item} alt='item' />
          </div>
        ))}
      </Slider>
    </div>
  );
}
