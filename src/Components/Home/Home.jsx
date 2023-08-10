import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { database } from "../../Firebaseconfig";
import { signOut } from "firebase/auth";
import Header from "../Header/Header";

const apikey = "8cca59bd768c799ee1c76d68448b2f08"
const url = "https://api.themoviedb.org/3"
const imgurl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const nowPlaying = "now_playing"
const popular = "popular"
const topRated = "top_rated"




const Card = ({ img }) => (
  <img className="card" src={img} alt="cover" />

)
const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgurl}/${item.poster_path}`} />
        ))
      }

    </div>
  </div>
)



function Home() {

  
  const history = useNavigate()

  const handleClick =()=>{
    signOut(database).then(val=>{
      history('/')
    })
  }




  const [upcomingMovies, setupcomingMovies] = useState([])
  const [nowPlayingMovies, setnowplayingMovies] = useState([])
  const [popularMovies, setpopularMovies] = useState([])
  const [topRatedMovies, settopRatedMovies] = useState([])
  const [genre, setGenre] = useState([])

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);
      setupcomingMovies(results);
    }
    const fetchnowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);
      setnowplayingMovies(results);
    }
    const fetchpopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);
      setpopularMovies(results);
    }
    const fetchtopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      settopRatedMovies(results);
    }
    const getAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setGenre(genres);

    }
    getAllGenre()
    fetchUpcoming()
    fetchnowPlaying()
    fetchpopular()
    fetchtopRated()
  }, [])



  return (
    <>
     <Header/>
      <section className="home">
        <div className="banner" style={{
          backgroundImage: popularMovies[0] ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})` : "rgb(30,30,30)"
        }}>

          {popularMovies[0] && (<h1>{popularMovies[0].original_title}</h1>)}
          {popularMovies[0] && (<p>{popularMovies[0].overview}</p>)}
          
           <div>
           <button>Play <BiPlay /></button>
            <button>My List<AiOutlinePlus /></button>
          
           </div>

        </div>
        <Row title={"Upcoming Movies"} arr={upcomingMovies} />
        <Row title={"Popular On Netflix"} arr={popularMovies} />
        <Row title={"Now Playing"} arr={nowPlayingMovies} />
        <Row title={"Top Rated Movies"} arr={topRatedMovies} />
        <div className="genrebox">
          {genre.map((items) => (
            <Link key={items.id} to={`/genre/${items.id}`}>{items.name}</Link>
          ))}
        </div>
        <div className="signout" >
          <button id="btn" onClick={handleClick}>SignOut</button>
        </div>



      </section>
    </>
  )
}

export default Home
