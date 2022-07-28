import React from "react";

import { Grid } from "@material-ui/core";
import { SearchBar, VideoDetail, VideoList } from "./Components";
import youtube from "./Api/Youtube";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };
  handleSubmit = async (searchTerm) => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 7,
        key: "AIzaSyA5V8Db0UViNE6QWP16O3cPk3QUk4pJFRI",
        q: searchTerm,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  render() {
    const { selectedVideo, videos } = this.state;
    return (
      <Grid justifyContent="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
