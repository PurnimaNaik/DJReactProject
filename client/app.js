import React, { Component } from 'react';

//importing article component
import Article from '../src/article';
//importing Toggle component
import Toggle from 'react-toggle'
//importing images
import greenArrow from '../assets/greenArrow.png';
import redArrow from '../assets/redArrow.png';
import menuIcon from '../assets/menuIcon.svg';
import wsjLogo from '../assets/wsjLogo.png';
import rightArrow from '../assets/rightArrow.png';
import leftArrow from '../assets/leftArrow.png';
import userIcon from '../assets/userIcon.svg';
import cancel from '../assets/cancel.svg';
//importing style
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import style from '../client/style/main.css';
import '../node_modules/react-toggle-switch/dist/css/switch.min.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      error: null,
      loaded: false,

      heading: "",
      subheading: "",
      summary: "",
      timeStamp: "",
      menuVisible: false,
      
      switchedOnMarket: true,
      switchedOnLife: true,
      switchedOnPolitics: false,
      switchedOnMobile: true,

      activeIndexMarkets: 1,
      articleMarketsItem: [],
      articleMarketsListLength: [],
      reachedLeftEndMarkets: true,
      reachedRightEndMarkets: false,

      activeIndexLife: 1,
      articleLifeItem: [],
      articleLifeListLength: [],
      reachedLeftEndLife: true,
      reachedRightEndLife: false,

      activeIndexPolitics: 1,
      articlePoliticsItem: [],
      articlePoliticsListLength: [],
      reachedLeftEndPolitics: true,
      reachedRightEndPolitics: false,

      activeIndexMobile: 1,
      articleMobileItem: [],
      articleMobileListLength: [],
      reachedLeftEndMobile: true,
      reachedRightEndMobile: false,

    };
  }

  componentDidMount() {
    //fetching data clientside
    fetch('/api/articles').then((data) => {
      return data.json();
    }).then((data) => {

      //storing the count of articles of 4 categories
      let articleMarketsListNew = [];
      for (let i = 0; i < data.items.length; i++) {

        if (data.items[i].category == "Markets") {
          articleMarketsListNew.push(data.items[i]);
        }
      }

      let articleLifeListNew = [];
      for (let i = 0; i < data.items.length; i++) {

        if (data.items[i].category == "Life") {
          articleLifeListNew.push(data.items[i]);
        }
      }

      let articlePoliticsListNew = [];
      for (let i = 0; i < data.items.length; i++) {

        if (data.items[i].category == "Politics") {
          articlePoliticsListNew.push(data.items[i]);
        }
      }

      let articleMobileListNew = [];
      for (let i = 0; i < data.items.length; i++) {

        if (data.items[i].category == "Mobile") {
          articleMobileListNew.push(data.items[i]);
        }
      }

      //saving the count of articles of 4 categories in state
      this.setState({
        articles: data.items,
        loaded: true,
        articleMarketsListLength: articleMarketsListNew.length,
        articleLifeListLength: articleLifeListNew.length,
        articlePoliticsListLength: articlePoliticsListNew.length,
        articleMobileListLength: articleMobileListNew.length,
      });

    }).catch((error) => {
      console.log(error);
      this.setState({
        error: error,
        loaded: true,
      });
    });
  }

  onNextSlide(categoryName) {

    //looking up the category and incrementing (or resetting) the active index
    //also setting the reachedLeftEnd and reachedRightEnd flags

    if (categoryName == "Markets") {
      if (this.state.activeIndexMarkets == (this.state.articleMarketsListLength - 1)) {
        this.setState({
          reachedRightEndMarkets: true,
          reachedLeftEndMarkets: false,
        });
      }
      if (this.state.activeIndexMarkets < (this.state.articleMarketsListLength)) {
        this.setState({
          activeIndexMarkets: this.state.activeIndexMarkets + 1,
          articleMarketsItem: [],
          reachedLeftEndMarkets: false,
        });
      }
      else {
        this.setState({
          activeIndexMarkets: 1,
          articleMarketsItem: [],
          reachedRightEndMarkets: true,
        });
      }
    }

    else if (categoryName == "Life") {
      if (this.state.activeIndexLife == (this.state.articleLifeListLength - 1)) {
        this.setState({
          reachedRightEndLife: true,
          reachedLeftEndLife: false,
        });
      }
      if (this.state.activeIndexLife < (this.state.articleLifeListLength)) {
        this.setState({
          activeIndexLife: this.state.activeIndexLife + 1,
          articleLifeItem: [],
          reachedLeftEndLife: false,
        });
      }
      else {
        this.setState({
          activeIndexLife: 1,
          articleLifeItem: [],
          reachedRightEndLife: true,
        });
      }
    }

    else if (categoryName == "Politics") {

      if (this.state.activeIndexPolitics == (this.state.articlePoliticsListLength - 1)) {
        this.setState({
          reachedRightEndPolitics: true,
          reachedLeftEndPolitics: false,
        });
      }
      if (this.state.activeIndexPolitics < (this.state.articlePoliticsListLength)) {
        this.setState({
          activeIndexPolitics: this.state.activeIndexPolitics + 1,
          articlePoliticsItem: [],
          reachedLeftEndPolitics: false,
        });
      }
      else {
        this.setState({
          activeIndexPolitics: 1,
          activeIndexPolitics: [],
          reachedRightEndPolitics: true,
        });
      }
    }

    else if (categoryName == "Mobile") {

      if (this.state.activeIndexMobile == (this.state.articleMobileListLength - 1)) {
        this.setState({
          reachedRightEndMobile: true,
          reachedLeftEndMobile: false,
        });
      }
      if (this.state.activeIndexMobile < (this.state.articleMobileListLength)) {
        this.setState({
          activeIndexMobile: this.state.activeIndexMobile + 1,
          articleMobileItem: [],
          reachedLeftEndMobile: false,
        });
      }
      else {
        this.setState({
          activeIndexMobile: 1,
          articleMobileItem: [],
          reachedRightEndMobile: true,
        });

      }
    }
  }

  onPrevSlide(categoryName) {

    //looking up the category and decrementing (or resetting) the active index
    //also setting the reachedLeftEnd and reachedRightEnd flags

    if (categoryName == "Markets") {
      if (this.state.activeIndexMarkets == 2) {
        this.setState({
          activeIndexMarkets: this.state.activeIndexMarkets - 1,
          articleMarketsItem: [],
          reachedLeftEndMarkets: true,
        });
      }
      else if (this.state.activeIndexMarkets > 1) {
        this.setState({
          activeIndexMarkets: this.state.activeIndexMarkets - 1,
          articleMarketsItem: [],
          reachedRightEndMarkets: false,
        });
      }
      else {
        this.setState({
          activeIndexMarkets: 1,
          articleMarketsItem: [],
          reachedLeftEndMarkets: true,
        });
      }
    }

    else if (categoryName == "Life") {
      if (this.state.activeIndexLife == 2) {
        this.setState({
          activeIndexLife: this.state.activeIndexLife - 1,
          articleLifeItem: [],
          reachedLeftEndLife: true,
        });
      }
      else if (this.state.activeIndexLife > 1) {
        this.setState({
          activeIndexLife: this.state.activeIndexLife - 1,
          articleLifeItem: [],
          reachedRightEndLife: false,
        });
      }
      else {
        this.setState({
          activeIndexLife: 1,
          articleLifeItem: [],
          reachedLeftEndLife: true,

        });
      }
    }

    else if (categoryName == "Politics") {
      if (this.state.activeIndexPolitics == 2) {
        this.setState({
          activeIndexPolitics: this.state.activeIndexPolitics - 1,
          articlePoliticsItem: [],
          reachedLeftEndPolitics: true,
        });
      }
      else if (this.state.activeIndexPolitics > 1) {
        this.setState({
          activeIndexPolitics: this.state.activeIndexPolitics - 1,
          articlePoliticsItem: [],
          reachedRightEndPolitics: false,
        });
      }
      else {
        this.setState({
          activeIndexPolitics: 1,
          activeIndexPolitics: [],
          reachedLeftEndPolitics: true,
        });
      }
    }

    else if (categoryName == "Mobile") {
      if (this.state.activeIndexMobile == 2) {
        this.setState({
          activeIndexMobile: this.state.activeIndexMobile - 1,
          articleMobileItem: [],
          reachedLeftEndMobile: true,
        });
      }
      else if (this.state.activeIndexMobile > 1) {
        this.setState({
          activeIndexMobile: this.state.activeIndexMobile - 1,
          articleMobileItem: [],
          reachedRightEndMobile: false,
        });
      }
      else {
        this.setState({
          activeIndexMobile: 1,
          articleMobileItem: [],
          reachedLeftEndMobile: true,
        });
      }
    }
  }

  //toggling menuVisible flag 
  toggleMenu() {
    this.setState((prevState, props) => ({
      menuVisible: !prevState.menuVisible,
    }));
  }

  //toggling switchedOnMarket flag and empty the articleMarketsItem array in state
  toggleSwitchMarket = () => {
    this.setState(prevState => {
      return {
        switchedOnMarket: !prevState.switchedOnMarket,
        articleMarketsItem: [],
      };
    });
  };

  //toggling switchedOnLife flag and empty the articleLifeItem array in state
  toggleSwitchLife = () => {
    this.setState(prevState => {
      return {
        switchedOnLife: !prevState.switchedOnLife,
        articleLifeItem: [],
      };
    });
  };

  //toggling switchedOnPolitics flag and empty the articlePoliticsItem array in state
  toggleSwitchPolitics = () => {
    this.setState(prevState => {
      return {
        switchedOnPolitics: !prevState.switchedOnPolitics,
        articlePoliticsItem: [],
      };
    });
  };

  //toggling switchedOnMobile flag and empty the articleMobileItem array in state
  toggleSwitchMobile = () => {
    this.setState(prevState => {
      return {
        switchedOnMobile: !prevState.switchedOnMobile,
        articleMobileItem: [],
      };
    });
  };

  render() {
    const { loaded, error, articles } = this.state;

    if (error) {
      //rendering this when there's error getting data
      return <div>Sorry! Something went wrong</div>
    } else if (!loaded) {
      //rendering while content is loading
      return <div>Loading...</div>
    } else {

      //creating empty 'list' and 'item' array for all 4 categories
      let articleMarketsList = [];
      let articleMarketsItem = [];

      let articleLifeList = [];
      let articleLifeItem = [];

      let articlePoliticsList = [];
      let articlePoliticsItem = [];

      let articleMobileList = [];
      let articleMobileItem = [];



      //populating the Marketlist array if switchedOnMarket flag is true
      if (this.state.switchedOnMarket) {
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].category == "Markets") {
            articleMarketsList.push(articles[i]);
          }
        }

        //populating the Marketitem array based on the active index
        //also sending required props to Article component
        for (let i = 0; i < this.state.activeIndexMarkets; i++) {
          if (i == (this.state.activeIndexMarkets - 1)) {
            this.state.articleMarketsItem.push(
              <Article key={i}
                headline={articleMarketsList[i].headline}
                summary={articleMarketsList[i].summary}
                category={articleMarketsList[i].category}
                image={articleMarketsList[i].image}
                time={articleMarketsList[i].date_published}
                activeIndex={this.state.activeIndexMarkets}
                prevSlide={this.onPrevSlide.bind(this)}
                nextSlide={this.onNextSlide.bind(this)}
                reachedLeftEnd={this.state.reachedLeftEndMarkets}
                reachedRightEnd={this.state.reachedRightEndMarkets}
                shareLink={articleMarketsList[i].share_link}
              >
              </Article>
            );
          }
        }
      }

      //populating the Lifelist array if switchedOnLife flag is true
      if (this.state.switchedOnLife) {
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].category == "Life") {
            articleLifeList.push(articles[i]);
          }
        }

        //populating the Lifeitem array based on the active index
        //also sending required props to Article component
        for (let i = 0; i < this.state.activeIndexLife; i++) {
          if (i == (this.state.activeIndexLife - 1)) {
            this.state.articleLifeItem.push(
              <Article key={i}
                headline={articleLifeList[i].headline}
                summary={articleLifeList[i].summary}
                category={articleLifeList[i].category}
                image={articleLifeList[i].image}
                time={articleLifeList[i].date_published}
                activeIndex={this.state.activeIndexLife}
                prevSlide={this.onPrevSlide.bind(this)}
                nextSlide={this.onNextSlide.bind(this)}
                reachedLeftEnd={this.state.reachedLeftEndLife}
                reachedRightEnd={this.state.reachedRightEndLife}
                shareLink={articleLifeList[i].share_link}
              >
              </Article>
            );
          }
        }
      }

      //populating the Politicslist array if switchedOnPolitics flag is true
      if (this.state.switchedOnPolitics) {
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].category == "Politics") {
            articlePoliticsList.push(articles[i]);
          }
        }

        //populating the Politicsitem array based on the active index
        //also sending required props to Article component
        for (let i = 0; i < this.state.activeIndexPolitics; i++) {
          if (i == (this.state.activeIndexPolitics - 1)) {
            this.state.articlePoliticsItem.push(
              <Article key={i}
                headline={articlePoliticsList[i].headline}
                summary={articlePoliticsList[i].summary}
                category={articlePoliticsList[i].category}
                image={articlePoliticsList[i].image}
                time={articlePoliticsList[i].date_published}
                activeIndex={this.state.activeIndexMobile}
                prevSlide={this.onPrevSlide.bind(this)}
                nextSlide={this.onNextSlide.bind(this)}
                reachedLeftEnd={this.state.reachedLeftEndPolitics}
                reachedRightEnd={this.state.reachedRightEndPolitics}
                shareLink={articlePoliticsList[i].share_link}
              >
              </Article>
            );
          }
        }
      }

      //populating the Mobilelist array if switchedOnMobile flag is true
      if (this.state.switchedOnMobile) {
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].category == "Mobile") {
            articleMobileList.push(articles[i]);
          }
        }

        //populating the Mobileitem array based on the active index
        //also sending required props to Article component
        for (let i = 0; i < this.state.activeIndexMobile; i++) {
          if (i == (this.state.activeIndexMobile - 1)) {
            this.state.articleMobileItem.push(
              <Article key={i}
                headline={articleMobileList[i].headline}
                summary={articleMobileList[i].summary}
                category={articleMobileList[i].category}
                image={articleMobileList[i].image}
                time={articleMobileList[i].date_published}
                activeIndex={this.state.activeIndexMobile}
                prevSlide={this.onPrevSlide.bind(this)}
                nextSlide={this.onNextSlide.bind(this)}
                reachedLeftEnd={this.state.reachedLeftEndMobile}
                reachedRightEnd={this.state.reachedRightEndMobile}
                shareLink={articleMobileList[i].share_link}
              >
              </Article>
            );
          }
        }
      }

      //creating custom className based on menuVisible in state
      var menuVisibility = "hide";
      if (this.state.menuVisible) {
        menuVisibility = "show";
      }

      //creating const div components to render based on switchedOn flags
      const marketNews = this.state.switchedOnMarket ? <div> {this.state.articleMarketsItem} </div> : <div></div>
      const lifetNews = this.state.switchedOnLife ? <div>{this.state.articleLifeItem} </div> : <div></div>
      const politicsNews = this.state.switchedOnPolitics ? <div>{this.state.articlePoliticsItem} </div> : <div></div>
      const mobileNews = this.state.switchedOnMobile ? <div>{this.state.articleMobileItem} </div> : <div></div>

      return (

        <div>
          <div id="flyout_menu" className={menuVisibility}>
            <div className="menu_content">
              <img onClick={this.toggleMenu.bind(this)} src={cancel} />
              <h3>Customize your feed</h3>

              <label>
                <span id="category_name">Market</span>
                <Toggle
                  defaultChecked={this.state.switchedOnMarket}
                  onChange={this.toggleSwitchMarket.bind(this)} />
              </label>

              <label>
                <span id="category_name_life">Life</span>
                <Toggle
                  defaultChecked={this.state.switchedOnLife}
                  onChange={this.toggleSwitchLife.bind(this)} />
              </label>

              <label>
                <span id="category_name">Politics</span>
                <Toggle
                  defaultChecked={this.state.switchedOnPolitics}
                  onChange={this.toggleSwitchPolitics.bind(this)} />
              </label>

              <label>
                <span id="category_name">Mobile</span>
                <Toggle
                  defaultChecked={this.state.switchedOnMobile}
                  onChange={this.toggleSwitchMobile.bind(this)} />
              </label>

            </div>
          </div>


          <div className="index_strip">
            <div className="index_strip_cluster">
              <a id="index_name" href="" className="individual_index_strip_title">DIJA </a>
              <a id="index_percent" href="" className="individual_index_strip_title">1.13%</a>
              <img className="green_arrow" src={greenArrow} />
            </div>

            <div className="index_strip_cluster">
              <a id="index_name" href="" className="individual_index_strip_title">Crude Oil </a>
              <a id="index_percent_loss" href="" className="individual_index_strip_title">0.03%</a>
              <img className="red_arrow" src={redArrow} />
            </div>

            <div className="index_strip_cluster">
              <a id="index_name" href="" className="individual_index_strip_title">Nikkei </a>
              <a id="index_percent" href="" className="individual_index_strip_title">0.50%</a>
              <img className="green_arrow" src={greenArrow} />
            </div>
          </div>


          <div className="header">
            <img onClick={this.toggleMenu.bind(this)} className="menu_icon" src={menuIcon} />
            <a href="https://www.wsj.com/"><img className="wsjLogo" src={wsjLogo} /></a>
            <a href="https://accounts.wsj.com/login?target=https%3A%2F%2Fwww.wsj.com"><img className="user_icon" src={userIcon} /></a>
          </div>


          <div className="test_div">
            {marketNews}
            {lifetNews}
            {politicsNews}
            {mobileNews}
          </div>

        </div>
      );
    }
  }
}

export default App;
