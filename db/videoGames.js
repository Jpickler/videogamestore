const { error } = require('console');
const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        console.log(`made it to the getAllVideoGames function in the db folder`)
        const { rows: videoGames } = await client.query(`
            SELECT * FROM videoGames;
        `);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        console.log(`made it to the getVideoGameById in db folder`)
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    const {name, description, price, inStock, isPopular, imgUrl} = body;
    try {
        console.log (`this is body`, body)
        const { rows: videoGames } = await client.query(`
            INSERT INTO videoGames ("name", "description", "price", "inStock", "isPopular", "imgUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
            
            `, [name, description, price, inStock, isPopular, imgUrl]);
        console.log(`just ran the query`)
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    console.log(`made it to the update video game function`);
    try{
        const {name, description, price, inStock, isPopular, imgUrl} = fields;
        client.query(`
        UPDATE videogames
        SET name = $1,
        description = $2,
        price = $3, 
        inStock = $4, 
        isPopular = $5, 
        imgUrl = $6
        WHERE id=$7
        RETURNING *
        `, [name, description, price, inStock, isPopular, imgUrl, id])

    }catch(err){
        console.log(err)
        throw error;  
    }
    // LOGIC GOES HERE
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}