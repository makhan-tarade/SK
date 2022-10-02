const mongoose = require('mongoose');

// Check-ins
const checkinsSchema = mongoose.Schema({
    user: [{ type: String }],
    city: { type: String },
    state: { type: String },
    country: { type: String },
    visited: { type: String },
    checkin_pic: { type: String },   
    created: { type: Date },  
});

const checkinModal = mongoose.model('checkins', checkinsSchema);

// Sports
const sportSchema = mongoose.Schema({
    user: [{ type: String }],
    city: { type: String },
    state: { type: String },
    country: { type: String },
    visited: { type: String },
    sport_pic: { type: String },   
    created: { type: Date },  
});

const sports = mongoose.model('sports', sportSchema);

// Music
const musicSchema = mongoose.Schema({
    user: [{ type: String }],
    music_name: { type: String },   
    music_pic: { type: String },   
    created: { type: Date },  
});

const music = mongoose.model('music', musicSchema);

// Movies
const moviesSchema = mongoose.Schema({
    user: [{ type: String }],
    movies_name: { type: String },   
    movies_pic: { type: String },   
    created: { type: Date },  
});

const movies = mongoose.model('movies', moviesSchema);

// Tv Shows
const tvShowSchema = mongoose.Schema({
    user: [{ type: String }],
    tvshow_name:{type: String},
     
    tvshow_pic: { type: String },   
    created: { type: Date },  
});

const tvshows = mongoose.model('tvshows', tvShowSchema);

// Books
const bookSchema = mongoose.Schema({
    user: [{ type: String }],
    book_name: { type: String },
       
    book_pic: { type: String },   
    created: { type: Date, default: Date.now() },  
});

const books = mongoose.model('books', bookSchema);

module.exports = {
    checkins: checkinModal,
    sports: sports,
    music: music,
    movies: movies,
    tvshows: tvshows,
    books: books,
}