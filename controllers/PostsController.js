const sequelize = require('../data/sequelize');
const { QueryTypes } = require('sequelize');
const fs = require('fs');
const shortid = require('shortid');

module.exports = {
    
    index: async (req, res) => {
        const result = await sequelize.query(
            "SELECT id,user,url,created_at FROM posts", {
                logging: false,
                raw: true,
                type: QueryTypes.SELECT
            }
        );
        return res.status(200).json(result);
    },

    create: async (req,res) => {

        // Verificando se é uma imagem que está vindo!
        if(req.headers['content-type'].includes('image/')){
            
            const extension = req.headers['content-type'].replace('image/','');
            const filename = `${shortid.generate()}.${extension}`;
            const file = fs.createWriteStream(`public/${filename}`);

            req.on('data', chunck => {
                file.write(chunck);
            })

            req.on('end', async ()=> {
                try {
                    // Salvando no banco
                    await sequelize.query(
                        `INSERT INTO posts (user,url,created_at) VALUES ("${req.headers.user}","${filename}",${(new Date()).getTime()})`, {
                            logging: false,
                            raw: true,
                        }
                    );

                    res.status(201).json({msg:'ok', filename});
                } catch (error) {
                    console.log(error);
                    res.status(500).json({error:"Falhou"});
                    fs.unlinkSync(`public/${filename}`)
                }
                
            })

        }

    }
}
