import React, { useState, useRef, useEffect } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { BsFileEarmarkImageFill } from 'react-icons/bs';
import { MdStarBorder } from 'react-icons/md';
import { MdStar } from 'react-icons/md';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';
import StarRating from '../reusableComponents/StarRating.jsx';
import Button from '../reusableComponents/Button.jsx';
import './ProductCard2.scss';

const ProductCard2 = ({ type, product, onButtonClick, removedId }) => {
  const [filledButton, setFilledButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef();

  useEffect(() => {
    if (type === 'relatedProducts' && product.info.id === removedId) {
      setFilledButton(false);
    }
  }, [removedId]);

  const { avgRating, info, styles } = product;
  const defaultStyle = styles.results
    .find(style => style['default?'] === true) || styles.results[0];
  const images = defaultStyle.photos.map(img => img.thumbnail_url);

  let formattedPrice = 0;
  if (+defaultStyle.original_price.slice(info.default_price.length - 2) === 0) {
    formattedPrice = `$${parseInt(defaultStyle.original_price)}`;
  } else {
    formattedPrice = `$${defaultStyle.original_price}`;
  }

  const handleButtonClick = () => {
    if (type === 'relatedProducts') {
      setFilledButton(true);
    }
    onButtonClick(info.id);
  };

  let renderedButton;
  if (type === 'relatedProducts') {
    renderedButton = (
      <Button
        className='secondary active'
        onClick={handleButtonClick}
      >
        {!filledButton
          ? <MdStarBorder className='button-icon'/>
          : <MdStar className='button-icon'/>
        }
      </Button>
    );
  } else {
    renderedButton = (
      <Button
        className='secondary active'
        onClick={handleButtonClick}
      >
        <TiDeleteOutline className='button-icon remove'/>
      </Button>
    );
  }

  if (type === 'addProduct') {
    renderCardContent = (
      <div className='add-product'>
        <div className='add-sign'>
          <GrAdd/>
        </div>
        <div className='text'>Add to Outfit</div>
      </div>
    );
  }

  const onHandleClick = (direction) => {
    const slider = sliderRef.current;
    let width = getComputedStyle(slider).getPropertyValue('--added-Single-Width');
    if (width.includes('px')) {
      width = parseInt(width.slice(0, -2));
    } else {
      width = parseInt(width);
    }

    const cardWidth = sliderRef.current.childNodes[0].getBoundingClientRect().width;
    const index = currentIndex + 1;

    if (direction === 'left') {
      if (index === 1) {
        return;
      }
      width += cardWidth;
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right') {
      if (index === sliderRef.current.childNodes.length) {
        return;
      }
      width -= cardWidth + 0.5;
      setCurrentIndex(currentIndex + 1);
    }
    slider.style.setProperty('--added-Single-Width', `${width}px`);
  };

  let renderedImages = [];
  if (images.length) {
    renderedImages = images.map(url =>
      <div key={url}>
        <img src={url}/>
      </div>
    );
  }

  let arrowLeftStyle = currentIndex !== 0
    ? { color: 'black' } : { color: 'transparent' };

  let rightArrowStyle = currentIndex + 1 !== images.length
    ? { color: 'black' } : { color: 'transparent' };
  return (
    <div className='product-slideshow-container'>
      {renderedButton}
      <div className='slideshow-content' ref={sliderRef}>
        {images && renderedImages}
      </div>
      <div className='product-slideshow-navigation'>
        <div
          className='left'
          onClick={() => onHandleClick('left')}>
          <BsFillCaretLeftFill
          />
        </div>
        <div
          className='right'
          onClick={() => onHandleClick('right')}>
          <BsFillCaretRightFill
          />
        </div>
      </div>
      {/* <div className='product-card-detail'> */}
      <div className='product-detail'>
        <div className='title'>{info.category.toUpperCase()}</div>
        <div className='product-name'>{info.name}</div>
        <div className='product-price'>{formattedPrice}</div>
        <StarRating rating={avgRating}/>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProductCard2;