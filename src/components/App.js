import { useState } from "react";
import { NavBar } from "./NavComponent/NavBar";
import { Routes, Route } from "react-router-dom";
import { Featured } from "./FeaturedSection/Featured";
import "../styles/App.css";
import { SeeAll } from "./SeeAllComponent/SeeAll";

function App() {
  const [getProjectId, setProjectId] = useState("bnwzu32b5ab8")

  // total 1845 songs
  //total 400 albums


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element = {[
            <Featured filterKey = "featured" filterValue = "Top Albums" cardType = "album"/>,
            <Featured filterKey="featured" filterValue="Top 50 of this month" cardType="song" />,
            <Featured filterKey="featured" filterValue="Top 20 of this week" cardType="song" />,
            <Featured filterKey="mood" filterValue="happy" cardType="song" />,
            <Featured filterKey="featured" filterValue="Soul soother" cardType="song" />,
            <Featured filterKey="featured" filterValue="Evergreen melodies" cardType="song" />,
            <Featured filterKey="mood" filterValue="romantic" cardType="song" />,
            <Featured filterKey="mood" filterValue="excited" cardType="song" />,
            <Featured filterKey="mood" filterValue="sad" cardType="song" />]}/>
        <Route path="/:cardType/:filterKey/:filterValue" element= {<SeeAll/>}/>
      </Routes>

      {/* 1.featured songs 
      2.featured Albums 
      3.featured Artists 

      4.albums by artists,mood,activity

      5.Album display by Popular, Trending, Featured this Week, Recommended, and Podcasts. */}


      {/* <SeeAll cardType = "album"/> */}



    </div>
  );
}

export default App;
