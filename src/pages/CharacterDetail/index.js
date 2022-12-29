import React, { useEffect, useState, useMemo } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { useLocation } from "react-router-dom";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { LeftArrow, RightArrow } from "../../components/Arrow/Arrow";
import { Card } from "../../components/Card/Card";
import { getAllStoriesById,getAllEventsById,getAllSeriesById,getCharacterProfileDataById }  from '../../util/util'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const CharacterDetail = () => {
  const [character,setCharacter] = React.useState();
  const [stories, setStories] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [series, setSeries] = React.useState([]);
  const [storiesoffset, setStoriesOffset] = React.useState(0);
  const [eventsoffset, setEventsOffset] = React.useState(0);
  const [seriesoffset, setSeriesOffset] = React.useState(0);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const location = useLocation();
  let userId = location.state.userId;
  const LIMIT_PER_REQUEST =10
  const loadEvents =()=>{
    getAllEventsById(
      `limit=${LIMIT_PER_REQUEST}&offset=${eventsoffset}`,
      { userId: userId},
      {},
    )
    .then((res) => {
      console.log(res.data.results,'MY DATA events')
      setEvents([...events,...res.data.results]);
      setEventsOffset(eventsoffset+8)
    })
    .catch(()=>{});
      };
  
 const loadStories =()=>{
  getAllStoriesById(
    `limit=${LIMIT_PER_REQUEST}&offset=${storiesoffset}`,
    { userId: userId},
    {},
  )
  .then((res) => {
    console.log(res.data.results,'MY DATA stories')
    setStories([...stories,...res.data.results]);
    setStoriesOffset(storiesoffset+8)
  })
  .catch(()=>{});
  };

const loadSeries =()=>{

  getAllSeriesById(
    `limit=${LIMIT_PER_REQUEST}&offset=${eventsoffset}`,
    { userId: userId},
    {},
  )
  .then((res) => {
    console.log(res.data.results,'MY DATA series')
    setSeries([...series,...res.data.results]);
    setSeriesOffset(seriesoffset+8)
  })
  .catch(()=>{});
        };
    


  useEffect(() => {
    const getProfileData = () => {
      
    getCharacterProfileDataById(
    ``,
    {userId: userId},
    {},
  )
  .then((res) => {
    console.log(res.data.results,'MY DATA profile')
    setCharacter( res.data.results[0]);
  })
  .catch(()=>{});}
    getProfileData();
    loadStories();
    loadEvents();
    loadSeries();
}, []);

const newItemsLimit = 5;



let path=character ? character.thumbnail.path+'.'+character.thumbnail.extension : ''
  return (<div>
     <h1 className="text-center">{character &&  character.name}</h1>
     <h1 className="text-center">{character && character.description}</h1>
     <img src={path} alt="My Image"   className="center-block"/>
      {/* Stories */}
      
      <div className="example" style={{ paddingTop: "2px" }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={
              <RightArrow limit={newItemsLimit} pushNewItems={loadStories} />
            }
            onWheel={onWheel}
          >
            {stories.map((story) => (
              <Card
                title={story.title}
                itemId={story.id} // NOTE: itemId is required for track items
                key={story.id}
                type={story.type}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
        {/* Events */}
        <div className="example" style={{ paddingTop: "2px" }}>
        <div>
          <ScrollMenu
            // LeftArrow={LeftArrow}
            // RightArrow={
            //   <RightArrow limit={newItemsLimit} pushNewItems={pushNewItems} />
            // }
            onWheel={onWheel}
          >
            {events.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
        {/* Series */}
        <div className="example" style={{ paddingTop: "2px" }}>
        <div>
          <ScrollMenu
            // LeftArrow={LeftArrow}
            // RightArrow={
            //   <RightArrow limit={newItemsLimit} pushNewItems={pushNewItems} />
            // }
            onWheel={onWheel}
          >
            {events.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
     
    </div>
  );
};

export default CharacterDetail;
function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
