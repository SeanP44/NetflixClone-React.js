import React, { Component } from "react";
import Popup from 'reactjs-popup';
import { imageBaseUrl } from "../../services/axios"
import reviewRating from '../../assets/icons8-Star.png'

const API_KEY = "a3b73a3c197c6a38df7f59949e54440c";


class Search extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }
  state = {
    val: "",
    searchVal: [],
    showRes: false
  };

  componentDidMount() {
    this.mounted = true;
  }

  handleChange = e => {
    this.setState({ val: e.target.value });
    if (e.target.value !== "")
      fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
        .then(r => r.json())
        .then(data => {
          if (this.mounted)
            this.setState({ searchVal: data.results, showRes: true });
        })
        .catch(err => console.log(err));
    else if (e.target.value === "") this.setState({ showRes: false });
  };

  closeRes = () => {
    this.setState({ showRes: false });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { val, searchVal, showRes } = this.state;

    const moviesList = searchVal.length
      ? searchVal.map(movie => {
        return (
          <Popup trigger={<li key={movie.id}>{movie.title}</li>} modal>
            <div className='popup'>

              <img key={movie.id} className={`details-image`} src={`${imageBaseUrl}${movie.poster_path || movie.backdrop_path}`} alt={movie.name} />
              <div className='popup-container'>

                <p className='pop-uptitle'>Title:</p>
                <p className='popup-contents'>{movie.title || movie.name || movie.original_name}</p>

                <p className='pop-uptitle'>Overview:</p>
                <p className='popup-overview'>{movie.overview}</p>

                <p className='pop-uptitle'>Release date:</p>
                <p className='popup-contents'>{movie.release_date}</p>

                <p className='pop-uptitle'>Rating:</p>

                <div className='movie-rating-rowpopup'>
                  <img className='reviewRating-row' src={reviewRating} alt='rating' />
                  <p className='movie-title-rating'> {Math.round(movie.vote_average)}/10</p>
                </div>
              </div>
            </div>
          </Popup>

        );
      })
      : null;

    return (
      <React.Fragment>
        <input
          type="text"
          name="searchVal"
          onChange={this.handleChange}
          className="search-input"
          placeholder="Search for movie..."
          value={val}
        />
        {showRes && (
          <div className="search-values">
            <ul className="movielist">{moviesList}</ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
