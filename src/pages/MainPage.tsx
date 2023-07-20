import React, { useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
import TopArtists from "../components/TopArtists";
import { ApiTopArtists } from "../apimodel/ApiModel";
import { ArtistListensDto } from "../dto/ArtistListensDto";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

Chart.register(...registerables);

function MainPage() {

  // temporary username variable
  const [username, setUsername] = useState<string>();
  const [nrArtists, setNrArtists] = useState(10);

  const [startDate, setStartDate] = useState(new Date("2000-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  const [artistListens, setArtistListens] = useState<Array<ArtistListensDto>>();

  useEffect(() => {
    username && localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    let user: string | null = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    } else {
      setUsername("thedarkdream");
    }
  }, []);
  
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 menuPadding">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Nr. artists</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={nrArtists} onChange={(e) => setNrArtists(parseInt(e.target.value))} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Date from</label>
                <div className="col-sm-10">
                  <DatePicker className="form-control" selected={startDate} onChange={(date) => date && setStartDate(date)} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Date to</label>
                <div className="col-sm-10">
                  <DatePicker className="form-control" selected={endDate} onChange={(date) => date && setEndDate(date)} />
                </div>
              </div>

              <button className="btn btn-primary mb-2" onClick={(e) => fetchTopArtists()}>Fetch top artists!</button>

          </div>

          <div className="col-9">
          <TopArtists entries={artistListens} />
          </div>
        </div>
      </div>
    );
  
  function fetchTopArtists(): void {
    fetch("http://localhost:8080/" + username + "/artists")
        .then((response) => response.json())
        .then((data: ApiTopArtists) => {
            var mappedData: ArtistListensDto[] = data.artists.map((entry) => { return { artist: entry.name, listens: entry.listens } } )
            setArtistListens(mappedData);
        })
        .catch((err) => {
        console.log(err.message);
        });
  }
}


export default MainPage;