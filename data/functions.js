/*
/////////////////////////////////////////////
use to work with json format.. switch to mlab database.
/////////////////////////////////////////////



const userList = require('./favorites');

module.exports = {
// return all Users
	getAllUsers() {	
		return userList.users;
	},
// return favorite books of the User by id
	getFavoritesById(user_id) {
		for (let i in userList.users) {
			if(user_id == userList.users[i].user_id )
				return userList.users[i].favorites;
		}
		return "Erorr: user id not faund!"
	},
// return an array of favorite books by genre of the User by id 
	favoritesByGenre(user_id, genre) {
		var genres = Array();
		for (let i in userList.users) {
			if(user_id == userList.users[i].user_id ){
				for(let j in userList.users[i].favorites){
					if(genre == userList.users[i].favorites[j].genre)
						genres.push(userList.users[i].favorites[j]);
				}
				if(genres[0] !== 'undefined')
					return genres;
				else
					return `user ${user_id} dont have a book from genre ${genre} in his favorites.`;
			}
		}
		return `Erorr: user ${user_id} not faund!`;
	}
};
*/


   

