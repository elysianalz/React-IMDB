import React from 'react';
import ReactDOM from 'react-dom';

export default class Requester extends React.Component {
	
	movieInfo(){

	}

	poster(movies, self){
		movies = JSON.parse(this.responseText);
		self.setState({
			movies: movies,
		})
	}

	requester(search, type, funct){
		let apiEndPoint = 'https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=c5289df8';
		let movie = "&s="+search;
		let xhttp = new XMLHttpRequest();
		let movies = "";
		let self = this;

		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				funct();
			}
		}
			
		xhttp.open('GET', apiEndPoint+movie, true);
		xhttp.send();	
	}

} 