import React from 'react';
import PropTypes from 'prop-types';
import { Virtual, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemCard from './ItemCard';

export default function Recommended({ foodsList, typeCard }) {
  return (
    <div>
      <h3>Recommended</h3>
      <Swiper
        modules={ [Virtual, EffectFade] }
        spaceBetween={ 5 }
        slidesPerView={ 2 }
        virtual
        effect="coverflow"
        breakpoints={ {
          1000: {
            slidesPerView: 4,
          },
        } }
      >
        {
          foodsList.map((food, index) => (
            <SwiperSlide key={ index } virtualIndex={ index }>
              <ItemCard
                typeCard={ typeCard }
                recipeInfo={ food }
                index={ index }
                testid={ `${index}-recomendation-card` }
                titleTestId={ `${index}-recomendation-title` }
                variant="minimal"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}

Recommended.propTypes = {
  foodsList: PropTypes.arrayOf(PropTypes.shape({
    typeCard: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    recipeInfo: PropTypes.shape({
      strMeal: PropTypes.string,
      strDrink: PropTypes.string,
      strMealThumb: PropTypes.string,
      strDrinkThumb: PropTypes.string,
    }).isRequired,
    testid: PropTypes.string.isRequired,
    titleTestId: PropTypes.string,
    variant: PropTypes.string,
  })).isRequired,
  typeCard: PropTypes.string.isRequired,
};
