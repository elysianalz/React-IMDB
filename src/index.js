import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Cinema extends React.Component {

	render(){
		return (
			<div className="cinema" style={this.props.style}>

				<div className="exit" onClick={this.props.onClick}>x</div>
				
				<div className="cinema-info">

					<div className="meta">
						<img className="poster" src={this.props.poster}/>
						<div className="meta-table">
							<table>
								<tr><th>Media Information</th></tr>
								<tr>
									<td>Media type</td>
									<td>{this.props.type}</td>
								</tr>
								<tr>
									<td>Year</td>
									<td>{this.props.year}</td>
								</tr>
								<tr>
									<td>Released</td>
									<td>{this.props.released}</td>
								</tr>
								<tr>
									<td>Run time</td>
									<td>{this.props.runtime}</td>
								</tr>
								<tr>
									<td>Language</td>
									<td>{this.props.language}</td>
								</tr>
								<tr>
									<td>Origin</td>
									<td>{this.props.country}</td>
								</tr>
								<tr>
									<td>Awards</td>
									<td>{this.props.awards}</td>
								</tr>
								<tr>
									<td>Ratings</td>
									<td>{this.props.ratings}</td>
								</tr>
							</table>
						</div>
					</div>

					<div className="main">
						<div>
							<h2>{this.props.title}</h2>
							<p>{this.props.genre}</p>
						</div>

						<div>
							<div><p>{this.props.plot}</p></div>
							<div><p><b>Actors </b> {this.props.actors}</p></div>
							<div><p><b>Director </b> {this.props.directors}</p></div>
							<div><p><b>Written by </b>{this.props.writers}</p></div>
						</div>
					</div>

				</div>
				
			</div>
		)
	}
}

class Movie extends React.Component {
	render(){
		return (
			<div className="movie" onClick={this.props.onClick}>
				<div>
					<img className="poster" src={this.props.poster} />
				</div>
				<div>
					<p>{this.props.title} ({this.props.year})</p>
					<p>{this.props.type}</p>
				</div>
			</div>
		);
	}
}

class ResultChest extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			movie: "",
			view: false,
			feedback: "",
		}
	}

	exit() {
		let view = this.state.view;
		view = false;
		this.setState({
			view: view,
		})
	}

	handleClick(id){

		let apiEndPoint = 'https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=c5289df8&plot=full&i='+id;
		let xhttp = new XMLHttpRequest();
		let movie = "";
		let self = this;
		let view = self.state.view;
		let offset = self.state.offset;

		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				movie = JSON.parse(this.responseText);
				view = true;
				self.setState({
					movie: movie,
					view: view,
				})
			}
		}
			
		xhttp.open('GET', apiEndPoint, true);
		xhttp.send();	

	}

	renderMovies(movies){
		const arr = [];

		if(movies) {
			for(var i=0; i < movies.length; i++){
				let id = movies[i].imdbID;
				arr.push(<Movie 
							poster={movies[i].Poster} 
							title={movies[i].Title} 
							year={movies[i].Year}
							type={movies[i].Type}
							key={id}
							onClick={() => this.handleClick(id)}
						/>);
			}
		}

		return (arr);
	}
		
	render(){
		return (
			<div className="result-chest">	
				{this.props.movies ? this.renderMovies(this.props.movies) : 
									 <h1 className="feedback">SEARCH OUR DATABASE</h1>}
				{this.state.view ? <div className="overlay"></div> : null}
				{this.state.view ? <Cinema
										style={{marginTop: `${window.pageYOffset-110}px`}} 
										onClick={() => this.exit()} 
										poster={this.state.movie.Poster}
										title={this.state.movie.Title}
										year={this.state.movie.Year}
										released={this.state.movie.Released}
										genre={this.state.movie.Genre}
										directors={this.state.movie.Director}
										writer={this.state.movie.Writer}
										actors={this.state.movie.Actors}
										type={this.state.movie.Type}
										plot={this.state.movie.Plot}
										language={this.state.movie.Language}
										country={this.state.movie.Country}
										awards={this.state.movie.Awards}
										/> : null}
			</div>
		);
	}
}

class Search extends React.Component {
	render(){
		return (
			<div className="nav">
				<span>React Movie Database</span>
				<input className="search" type="text" onChange={this.props.onChange} />
			</div>
		)
	}
}

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			movies: "",
		}
	}

	requester(title){

		let apiEndPoint = 'https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=c5289df8';
		let movie = "&s="+title;
		let xhttp = new XMLHttpRequest();
		let movies = "";
		let self = this;

		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				movies = JSON.parse(this.responseText);
				self.setState({
					movies: movies,
				})
			}
		}
			
		xhttp.open('GET', apiEndPoint+movie, true);
		xhttp.send();		
	}

	handleChange(e){
		this.requester(e.target.value.toString());
	}

	render(){
		return (
			<div className="app">
				<Search onChange={(e) => this.handleChange(e)} />
				<ResultChest movies={this.state.movies.Search} />
			</div>
		)
	}		

}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);