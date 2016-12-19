import React, { Component } from 'react';
import Banner from '../Components/Banner.js';
import LatestArticles from '../Components/LatestArticles.js';
import LinkButton from '../Components/LinkButton.js';
import OurStory from '../Components/OurStory.js';
import TasteOurCoffee from '../Components/TasteOurCoffee.js';
import EditableArea from '../Compose.js';

class Home extends Component {

    constructor(props) {
        super(props);

        // Test that re-rendering parent component does not influence nested widget zone
        this.state = { now : new Date().toLocaleTimeString() };        
        let that = this;
        setInterval(function () { that.setState({ now: new Date().toLocaleTimeString() }); }, 5000);
    }

    render() {
        return (
            <div className="container">
                <h2>Home page {this.state.now}</h2>
                <Banner />
                <EditableArea areaId="Test" />
                <LatestArticles />
                <LinkButton link="/articles" text="More articles" />
                <OurStory />
                <LinkButton link="/about" text="Read the whole story" />
                <TasteOurCoffee />
                <LinkButton link="/cafes" text="Find out more" />
            </div>
        );
    }
}

export default Home;