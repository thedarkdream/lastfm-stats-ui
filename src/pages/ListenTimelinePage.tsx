import React, { useState } from "react";
import { LineChartData, LineChartProps } from "../dto/LineChartProps";
import { Chart, Colors, registerables } from 'chart.js';
import { ApiArtistsTimeline } from "../apimodel/ApiModel";
import ListenTimeline from "../components/ListenTimeline";
import { ArtistTimelineDto } from "../dto/ListenTimelineDtos";
import DatePicker from "react-datepicker"

Chart.register(...registerables);

function ListenTimelinePage() {

  // temporary username variable
  const [username, setUsername] = useState("thedarkdream");
  const [nrArtists, setNrArtists] = useState(10);
  const [divisions, setDivisions] = useState(10);

  const [startDate, setStartDate] = useState(new Date("2000-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  var colorIndex = 0;

  var colors = [
    "#FF0000", // Red
    "#0000FF", // Blue
    "#008000", // Green
    "#800080", // Purple
    "#FFFF00", // Yellow
    "#008080", // Teal
    "#800000", // Maroon
    "#00FF00", // Lime
    "#808000", // Olive
    "#000080", // Navy
    "#FFA500", // Orange
    "#00FFFF", // Aqua
    "#C0C0C0", // Silver
    "#FFC0CB", // Pink
    "#4B0082", // Indigo
    "#FF7F50", // Coral
    "#00CED1", // Dark Turquoise
    "#C71585", // Medium Violet Red
    "#FFA07A", // Light Salmon
    "#556B2F"  // Dark Olive Green
  ];
  
  const [timelineProps, setTimelineProps] = useState<LineChartData>();

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
                <label className="col-sm-2 col-form-label">Divisions</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={divisions} onChange={(e) => setDivisions(parseInt(e.target.value))} />
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

              <button className="btn btn-primary mb-2" onClick={(e) => fetchGraph()}>Fetch graph!</button>

          </div>

          <div className="col-9">
            <ListenTimeline data={timelineProps} loading={loading} />
          </div>
        </div>
      </div>
    );

    function fetchGraph(): void {
      setLoading(true);
      fetch("http://localhost:8080/" + username + "/artists/timeline?" + new URLSearchParams({
              nrArtists: nrArtists.toString(),
              nrSteps: divisions.toString(),
              dateFrom: startDate.toISOString(),
              dateTo: endDate.toISOString()
          }))
          .then((response) => response.json())
          .then((data: ApiArtistsTimeline) => {
              var mappedData = data.artistTimelines.map((artist) => { return {
                  artist: artist.artist,
                  points: artist.points.map(point => { return {
                      time: point.time,
                      listens: point.listens
                  }})
              }})

              setLoading(false);
              setTimelineProps(mapTimeline(mappedData));
          })
          .catch((err) => {
          console.log(err.message);
            setLoading(false);
          });
  }

  
function mapTimeline(data: ArtistTimelineDto[]): LineChartData {
  return {
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    data: {
      labels: mapLabels(data),
      datasets: mapDatasets(data)
    }
  }
}

function mapLabels(data: ArtistTimelineDto[]): unknown[] | undefined {
 return data[0].points.map(p => p.time);
}

function mapDatasets(data: ArtistTimelineDto[]): import("chart.js").ChartDataset<"line", (number | import("chart.js").Point | null)[]>[] {
  return data.map(artistTimeline => {
    let color = colors[colorIndex++ % colors.length];
    let lightColor = lightenColor(color, 20);
    return {
      label: artistTimeline.artist.valueOf(),
      data: artistTimeline.points.map(l => l.listens.valueOf()),
      borderWidth: 3,
      tension: 0.3,
      backgroundColor: color,
      borderColor: color,
      hoverBorderColor: color,
      hoverBackgroundColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
    }
  });
}

function lightenColor(color: string, percent: number) {
  var num = parseInt(color.replace("#",""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = (num >> 8 & 0x00FF) + amt,
      G = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};
  
}


export default ListenTimelinePage;