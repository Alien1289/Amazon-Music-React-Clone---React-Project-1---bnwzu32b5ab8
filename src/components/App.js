import { useState } from "react";
import { NavBar } from "./NavComponent/NavBar";
import { Routes, Route } from "react-router-dom";
import { Featured } from "./FeaturedSection/Featured";
import "../styles/App.css";
import { SeeAll } from "./SeeAllComponent/SeeAll";
import { MusicPlayer } from "./MusicPlayerComponent/MusicPlayer";
import { DetailedAlbum } from "./DetailsComponent/DetailedAlbum";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Search } from "./Search";

function App() {
  const [getProjectId, setProjectId] = useState("bnwzu32b5ab8")
  const [getUrl, setUrl] = useState("")
  const [getClickCount, setClickCount] = useState(0)

  // total 1845 songs
  //total 400 albums
  function clickCountSetter(){
    if (getClickCount === 1){
      setClickCount(prev => 0)
    }
  }

  return (
    <div className="App" onClick={clickCountSetter}>
      <Routes>
        <Route path="/" element={[
          <NavBar getClickCount = {getClickCount} setClickCount = {setClickCount}/>,
          <Featured filterKey="featured" filterValue="Top Albums" cardType="album"/>,
          <Featured filterKey="featured" filterValue="Top 50 of this month" cardType="song" setUrl={setUrl} />,
          <Featured filterKey="featured" filterValue="Top 20 of this week" cardType="song" setUrl={setUrl} />,
          <Featured filterKey="mood" filterValue="happy" cardType="song" setUrl={setUrl} />,
          <Featured filterKey="featured" filterValue="Soul soother" cardType="song" setUrl={setUrl} />,
          <Featured filterKey="featured" filterValue="Evergreen melodies" cardType="song" setUrl={setUrl} />,
          <Featured filterKey="mood" filterValue="romantic" cardType="song" setUrl={setUrl} />,
          <Featured filterKey="mood" filterValue="excited" cardType="song" setUrl={setUrl} />,
          <Featured filterKey="mood" filterValue="sad" cardType="song" setUrl={setUrl} />]}/>
        <Route path="/:cardType/:filterKey/:filterValue" element={[<NavBar getClickCount = {getClickCount} setClickCount = {setClickCount}/>,<SeeAll setUrl={setUrl}/>]} />
        <Route path="/podcasts" element={<DetailedAlbum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/search" element = {<Search/>}/>
        <Route path="/detailsPage/:id" element = {[<NavBar getClickCount = {getClickCount} setClickCount = {setClickCount}/>,<DetailedAlbum setUrl={setUrl}/>]}/>

      </Routes>

      <MusicPlayer getUrl={getUrl} />
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
