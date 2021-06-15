import React from 'react';
import styled from 'styled-components';
import ShowMap from '../maps/show_map'

const Wrapper = styled.div`
    width: 98.5vw;
    height: 88vh;
    border: 1px solid green;
    display: flex;
`;

const RestaurantWrapper = styled.div`
    width: 50%;
    border: 1px solid blue;
`;

const RestaurantFilterWrapper = styled.div`
    width: 100%;
    height: 15%;
    border: 1px solid red;
`;

const RestaurantCardsWrapper = styled.div`
    width: 100%;
    height: 85%;
    border: 1px solid orange;
`;

const MapWrapper = styled.div`
    width: 50%;
    height: 100%
    border: 1px solid grey;
`;

class Restaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {filter: 5}
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        this.setState({filter: parseInt(e.target.value)})
    }

    render() {
        console.log(this.state.filter)
        return (
            <Wrapper>
                <RestaurantWrapper>
                    <RestaurantFilterWrapper>
                        <ul style={{listStyle: 'none'}}>
                            <li><input type="radio" checked={this.state.filter === 5} value={5} onChange={this.handleChange}/>5 mi</li>
                            <li><input type="radio" checked={this.state.filter === 10} value={10} onChange={this.handleChange}/>10 mi</li>
                            <li><input type="radio" checked={this.state.filter === 25} value={25} onChange={this.handleChange}/>25 mi</li>             
                        </ul>
                    </RestaurantFilterWrapper>
                    <RestaurantCardsWrapper>
                        Restaurant Card
                    </RestaurantCardsWrapper>
                </RestaurantWrapper>
                <MapWrapper>
                    <ShowMap zoom={this.state.filter} locations={[]}/>
                </MapWrapper>
            </Wrapper>
        )
    }
}

export default Restaurant;
