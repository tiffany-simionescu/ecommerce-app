import React from 'react';
import StarRating from 'react-star-ratings';
import { Menu } from 'antd';

const { SubMenu, Item } = Menu; // Menu.SubMenu

export const showAverageWithStarCount = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log('length', length);

    ratingsArray.map((r) => total.push(r.star))
    // 0 = initial value
    let totalReduced = total.reduce((prev, next) => prev + next, 0);
    // console.log('totalReduced', totalReduced);

    let highest = length * 5;
    // console.log('highest', highest);

    let result = (totalReduced * 5) / highest;
    // console.log('result', result);

    return (
      <Menu 
        className="text-center pt-1 pb-3" 
        mode="vertical" 
        style={{ width: "200px", margin: "0px auto"}}
      >
          <SubMenu
            title={(
               <div>
                <span>
                  <StarRating 
                    rating={result}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    editing={false}
                  />
                  ({p.ratings.length}) 
                </span>
              </div>
            )}
            className="text-center"
          >
            <Item className="text-center">
                {`${result} out of 5 stars`}
            </Item>
          </SubMenu>
        
      </Menu>
    )
  }
};

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log('length', length);

    ratingsArray.map((r) => total.push(r.star))
    // 0 = initial value
    let totalReduced = total.reduce((prev, next) => prev + next, 0);
    // console.log('totalReduced', totalReduced);

    let highest = length * 5;
    // console.log('highest', highest);

    let result = (totalReduced * 5) / highest;
    // console.log('result', result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating 
            rating={result}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editing={false}
          />
          ({p.ratings.length}) 
        </span>
      </div>
    )
  }
};