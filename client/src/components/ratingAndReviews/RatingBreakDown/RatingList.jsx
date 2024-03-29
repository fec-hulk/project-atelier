import React, {useEffect, useState} from 'react';
import StarBreakDown from './StarBreakDown.jsx';
import Recommended from './Recommended.jsx';
import BarBreakDown from './BarBreakDown.jsx';
import StarRating from '../../reusableComponents/StarRating.jsx';
import './RatingList.scss';

let totalVotesCalculate = (ratings) => {
  let totalVotes = 0;
  for (const key in ratings) {
    totalVotes += Number(ratings[key]);
  }
  return { totalVotes };
};

let recommendPercentCal = (recommended) => {
  return (Number(recommended.true) / (Number(recommended.true) + Number(recommended.false))) * 100;
};

const RatingList = ({reviewMetaData, onSortStarRatingReview, starFilter, setStarFilter, averageRating, productReviews}) => {

  const [totalVotes, setTotalVotes] = useState(0);
  const [recommendPercent, setRecommendPercent] = useState(100);
  const [ratings, setRatings] = useState({});
  const [characters, setCharacters] = useState({});

  useEffect(() => {
    if (Object.keys(reviewMetaData).length) {
      let totalVotesCal = totalVotesCalculate(reviewMetaData.ratings);
      setTotalVotes(totalVotesCal.totalVotes);
      setRecommendPercent(recommendPercentCal(reviewMetaData.recommended));
      setRatings(reviewMetaData.ratings);
      setCharacters(reviewMetaData.characteristics);
    }
  }, [reviewMetaData]);

  return (
    <div className='ratings-container'>
      <div className='average-star-rating'>
        <span className='average-rating-text' style={averageRating === 0 ? {fontSize: '1.3rem'} : null}>
          {averageRating === 0 ? 'No Ratings' : averageRating}
        </span>
        {averageRating > 0 && <StarRating className='review-star-rating' rating={averageRating}/>}
      </div>
      <Recommended recommendPercent={recommendPercent}/>
      <StarBreakDown totalVotes={totalVotes} onSortStarRatingReview={onSortStarRatingReview} starFilter={starFilter} setStarFilter={setStarFilter} productReviews={productReviews}/>
      <BarBreakDown characters={characters}/>
    </div>
  );
};
export default RatingList;