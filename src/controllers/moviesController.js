const db = require('../database/models')
const {Op} = require('sequelize')

module.exports = {
    list: (req,res) => {
        db.Movie.findAll()
        .then(movies => {
            return res.render('moviesList', {
            movies})
        }).catch(error => console.log(error))
    },
    detail: (req, res) =>{
        db.Movie.findByPk(req.params.id)
        .then(movie => {
            return res.render('moviesDetail', {movie})
        }).catch(error => console.log(error));
    },
    new: (req,res) => {
        db.Movie.findAll({
            order: [['release_date', 'DESC']], 
            limit: 5
        })
        .then(movies => res.render('newestMovies', {movies}))
        .catch(error => console.log(error));
    },
    recommended: (req, res) =>{
        db.Movie.findAll({
            where:{
                rating:{
                    [Op.gte]: 8
                }},
            where:{
                [Op.and]: 
                    [{rating:{[Op.gte]:9}}, 
                    {awards:{[Op.gte]:2}}]
            },
            order:[['rating', 'DESC'], ['awards', 'DESC']]
        }).then(movies => res.render('recommendedMovies', {movies}))
        .catch(error => console.log(error))
    }
}