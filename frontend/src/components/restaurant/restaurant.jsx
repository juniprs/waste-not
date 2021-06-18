import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import ShowMap from "../maps/show_map";
import { fetchRestaurants } from "../../actions/restaurant_actions";
import Display from "../results/display";
import Banner from "../banner/banner";
import SetMapOrigin from "../set_map_origin/set_map_origin";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;1,300;1,400&display=swap');
</style>;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FixedBanner = styled(Banner)`
  position: absolute;
  height: 10vh;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  position: absolute;
  top: 10vh;
  width: 100%;
  height: 90vh;
  display: flex;
`;

const RestaurantWrapper = styled.div`
  width: 50%;
  font-family: "Rubik", sans-serif;
  color: hsl(0, 0%, 22%);
`;

const RestaurantFilterWrapper = styled.div`
  /* width: 100%; */
  height: 15%;
  padding: 10px;
  border-bottom: 1px solid hsla(0, 0%, 90%, 90%);

  p {
    padding-left: 3px;
    margin-bottom: 4px;
    margin-top: 5px;
    font-size: 16.5px;
    font-weight: bold;
    text-shadow: 1px 1px hsla(0, 0%, 75%, 25%);
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-weight: 100;
    font-size: 15px;
    // color: hsl(0, 0%, 25%);
  }

  input[type="radio"] {
    margin-right: 10px;
  }
`;

const RadioButton = styled.input`
  cursor: pointer;

  :after {
    width: 14px;
    height: 14px;
    border-radius: 14px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: hsl(96, 0%, 90%);
    content: "";
    display: inline-block;
    border: 2px solid hsla(96, 0%, 80%, 90%);
  }

  :checked:after {
    background-color: #ffa500;
    border: 2px solid hsla(32, 100%, 48%, 1);
  }
`;

const RestaurantCardsWrapper = styled.div`
  width: 100%;
  height: calc(85% - 21px);
  overflow-y: scroll;
  font-size: 16px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Restaurant = () => {
  const MI_TO_GEO = 1 / 60;
  const dispatch = useDispatch();
  const [restaurants, center] = useSelector(({ entities, ui }) => [
    Object.values(entities.restaurants),
    ui.map.origin,
  ]);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // need to close the modal if the user is
  // being redirected here by a modal dialog
  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const [filter, setFilter] = useState(5);

  const allowedgeo = [
    center.lat + filter * MI_TO_GEO,
    center.lat - filter * MI_TO_GEO,
    center.lng + filter * MI_TO_GEO,
    center.lng - filter * MI_TO_GEO,
  ];

  const allowedrest = restaurants.filter((res) => {
    return (
      res.location.latitude <= allowedgeo[0] &&
      res.location.latitude >= allowedgeo[1] &&
      res.location.longitude <= allowedgeo[2] &&
      res.location.longitude >= allowedgeo[3]
    );
  });

  return (
    <Container>
      <FixedBanner />
      <Wrapper>
        <RestaurantWrapper>
          <Controls>
            <SetMapOrigin />
            <RestaurantFilterWrapper>
              <ul style={{ listStyle: "none" }}>
                <p>Distance</p>
                <li>
                  <RadioButton
                    type="radio"
                    checked={filter === 5}
                    value={5}
                    onChange={(e) => setFilter(parseInt(e.target.value))}
                  />
                  5 mi
                </li>
                <li>
                  <RadioButton
                    type="radio"
                    checked={filter === 10}
                    value={10}
                    onChange={(e) => setFilter(parseInt(e.target.value))}
                  />
                  10 mi
                </li>
                <li>
                  <RadioButton
                    type="radio"
                    checked={filter === 25}
                    value={25}
                    onChange={(e) => setFilter(parseInt(e.target.value))}
                  />
                  25 mi
                </li>
              </ul>
            </RestaurantFilterWrapper>
          </Controls>
          <RestaurantCardsWrapper>
            <Display restaurants={allowedrest} />
          </RestaurantCardsWrapper>
        </RestaurantWrapper>
        <ShowMap
          zoom={filter}
          center={center}
          style={{ width: "50%", height: "90vh" }}
          locations={allowedrest}
        />
      </Wrapper>
    </Container>
  );
};

export default Restaurant;
