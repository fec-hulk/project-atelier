import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

const RELATED_PPODUCTS_URL = '/api/relatedProducts';

const RelatedItemsAndOutfitCreation = ({ currentProductId, product, onChangeProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get(`${RELATED_PPODUCTS_URL}/${currentProductId}`)
      .then(({ data }) => {
        const filteredProducts = [];
        data.forEach(item => {
          if (filteredProducts.every(el => el.info.id !== item.info.id)) {
            filteredProducts.push(item);
          }
        });
        setRelatedProducts(filteredProducts);
      });
  }, [currentProductId]);

  return (
    <div className='products-and-outfits'>
      <div className='related-products'>
        {relatedProducts.length > 0
          ? (
            <RelatedProducts
              relatedProducts={relatedProducts}
              onChangeProduct={onChangeProduct}
              currentProduct={product}
            />
          )
          : (
            <h3 className='related-product-notice'>No Related Products Found</h3>
          )
        }
      </div>
      <div className='your-outfit'>
        <YourOutfit
          currentProduct={product}
          productId={currentProductId}
          onChangeProduct={onChangeProduct}
        />
      </div>
    </div>
  );
};

export default RelatedItemsAndOutfitCreation;
