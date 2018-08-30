import React, { Component } from 'react';

//importing popup component
import Popup from '../src/popup';
//importing ReactTimeAgo component
import ReactTimeAgo from 'react-time-ago';
//importing style
import style from '../src/style/article.css';
//importing images
import rightArrow from '../assets/rightArrow.png';
import leftArrow from '../assets/leftArrow.png';
import rightArrowDisabled from '../assets/rightArrowDisabled.png';
import leftArrowDisabled from '../assets/leftArrowDisabled.png';
import threeDots from '../assets/threeDots.svg';

class Article extends Component {
  constructor(props) {
    super(props);

    //initial state
    this.state = {
      activeIndex: props.activeIndex,
      category: props.category,
      showPopup: false,
      disableLeftArrow: "",
      disableRightArrow: "",
    };
  }

  //toggling the showPopup flag
  togglePopup() {
    this.setState((prevState, props) => ({
      showPopup: !prevState.showPopup
    }));
  }

  //calling onNextSlide() in app.js and passing the categoryName on the click of right arrow
  onSetCategoryNextSlide() {
    this.props.nextSlide(this.state.category);
  }
  //calling onPrevSlide() in app.js and passing the categoryName on the click of left arrow
  onSetCategoryPrevSlide() {
    this.props.prevSlide(this.state.category);
  }

  doNothing() {
  }

  render() {

    const {summary, headline, category, image, time, activeIndex, reachedLeftEnd, reachedRightEnd, shareLink } = this.props;

    //defining a 'replaceAt' function to replace characters stored as Strings
    String.prototype.replaceAt = function (index, replacement) {
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    //converting 2018-04-03T15:42-00:00 to 2018-04-03T15:42:00:00
    var modifiedTimeString = this.props.time.replaceAt(16, ":");

    //converting 2018-04-03T15:42:00:00 to 2018-04-03T15:42:00
    modifiedTimeString = modifiedTimeString.slice(0, 19) + modifiedTimeString.slice(22);

    //converting 2018-04-03T15:42:00 to 2018-04-03T15:42:00Z
    var timeString = modifiedTimeString + "Z"

    // creating a variable 'dateVar' of type Date with custom time input. 
    // using 'dateVar' later to render the time elapsed since article was published.
    var dateVar = new Date(timeString);

    //showing popup based on showPopup in state
    const popUpDisplay = this.state.showPopup ? <Popup togglePopup={this.togglePopup.bind(this)} ></Popup> : '';

    //creating custom image source based on reachedLeftEnd and reachedRightEnd prop 
    var leftArrowImageSource = leftArrow;
    var rightArrowImageSource = rightArrow;

    if (reachedLeftEnd) {
      leftArrowImageSource = leftArrowDisabled;
    }

    if (reachedRightEnd) {
      rightArrowImageSource = rightArrowDisabled;
    }


    return (
      <div>

        <div className="category_header">
          <a href="https://www.wsj.com/">{category}</a>
        </div>

        <div style={{ backgroundImage: `url(${image})` }} className="individial_article">
          {popUpDisplay}

          <div className="arrows">
            <img onClick={this.props.reachedLeftEnd ? this.doNothing : this.onSetCategoryPrevSlide.bind(this)} className="left_arrow" src={leftArrowImageSource} />
            <img onClick={this.props.reachedRightEnd ? this.doNothing : this.onSetCategoryNextSlide.bind(this)} className="right_arrow" src={rightArrowImageSource} />
          </div>

          <div className="individial_article_content">

            <a href={this.props.shareLink}>
              <div className="heading">
                {headline}
              </div>
              <div className="summary">
              <div className="article-summary">{summary}</div>
              </div>
            </a>

            <div className="timeStamp_options">
              <div className="timeStamp">
                <ReactTimeAgo>{dateVar}</ReactTimeAgo>
              </div>
              <img onClick={this.togglePopup.bind(this)} className="three_dots" src={threeDots} />
            </div>

          </div>

        </div>

      </div>
    );
  }
};

export default Article;
