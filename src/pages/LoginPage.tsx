import React, { useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
import TopArtists from "../components/TopArtists";
import { ApiTopArtists } from "../apimodel/ApiModel";
import { ArtistListensDto } from "../dto/ArtistListensDto";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

var AWS = require('aws-sdk');


function LoginPage() {

  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();



  return (
    <div>
      <button onClick={clickedme}>click me</button>
    </div>
  );

  function clickedme(event: React.MouseEvent<HTMLButtonElement>) {
    var params = {
      AccessToken: 'STRING_VALUE' /* required */
    };
    cognitoidentityserviceprovider.getUser(params, function(err: { stack: any; }, data: any) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
}


export default LoginPage;