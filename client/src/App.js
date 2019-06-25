import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    isloading: false,
    tracks: null,
    // image: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ 
        isloading: true 
      }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('http://localhost:5000/charts');
    const result = await response.json();
    
    const { data } = result
    const message = data.message
    const { body } = message
    const tracks = {track_list: body.track_list}

    // this.scrape("http://www.musixmatch.com/lyrics/Taylor-Swift/You-Need-To-Calm-Down?utm_source=application&utm_campaign=api&utm_medium=");

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    this.setState(tracks)
  };

  render() {
    const { track_list } = this.state
    
    if (!track_list) {
      return (
        <h1>hello</h1>
      )
    }
    if (track_list) {
      return (
        <React.Fragment> 
          <div class="navbar">Nav</div>
          <div class="numOneContainer">
            <div class="numOne">
              <div class="title">
                <h1>TOP 10 POP CHARTS</h1>
              </div>
              <div class="numOneInfo">
                <div id="numOneArtist">
                { track_list[0].track.artist_name }
                </div>
                <div id="numOneTrack">
                { track_list[0].track.track_name }
                </div>
                <div id="numOneAlbum">
                { track_list[0].track.album_name }
                </div>
                <div id="numOneUrl">
                { track_list[0].track.track_share_url }
                </div>
              </div>
            </div>
          </div>
          <div className="category">
            <h2>Song</h2><h2>Artist</h2>
          </div>
          {track_list.map((song, index) => {
          return(
                <div className="topSongs">
                  <div className="number">
                    <p>{index + 1}</p>
                    {/* <img src="fuck off"/> */}
                  </div>
                  <div className="trackName">
                    <p>{ song.track.track_name }</p>
                  </div>
                  <div className="artistName">
                    <p>{ song.track.artist_name }</p>
                  </div>
                <div className="albumName">
                </div>
              </div>
            )
          })}
        </React.Fragment>
      )
    }
  }
}


export default App;