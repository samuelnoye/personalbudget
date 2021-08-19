//let db = module.require("../config/db");
//const { reset } = require("nodemon");

let db = [{id:1, title:'test1', budget:100}];

module.exports = {

    getAllEnvelopes(req, res) {
        try {
            //return db.slice(0);
            res.status(200).send(db.slice(0));

        } catch (err) {
            res.status(400).send(err);
        }

    },

    getAnEnvelope(req, res) {
        try {
        const id = req.params.id;
        for (let envelope of db) {
            if (envelope.id == id) {
                res.status(200).send(envelope);
                return;
            }
        }
        res.status(404).send({message: "Envelope not found"});
        return;

    } catch (err) {
        res.status(500).send(err);
   }

    },

    createEnvelope(req, res) {
        try{
        const _id = Date.now();
        const {title, budget } = req.body;

        const newEnvelope = {
            id:_id,
            title,
            budget
        }

        db.push(newEnvelope);
        res.status(201).send(newEnvelope);
        return;
    } catch (err) {
        res.status(500).send(err);
    }
        
    },

    updateEnvelope(req, res) {
        try {
            const { title, budget } = req.body;
            const id = req.params.id;

            for (let envelope of db) {
                if(envelope.id == id ) { 
                    envelope.title = title
                    envelope.budget = budget
                    res.status(200).send(envelope)
                    return;
                }
            }
            res.status(404).send({message: "Envelope not found"});
            return;
            }
           
    catch (err) {
        res.status(500).send(err);
    } 
},

    deleteEnvelope(req, res) {
        try {
            const id = req.params.id;
            let bool = false
            for(let env of db ) {
                if (env.id == id) {
                    bool = true
                    break
                }
            }
          
            if(bool) {
            res.status(204).send({message: `Envelope with id ${id} deleted`})
                
            }
            else {
                res.status(404).send({message: `id ${id} not found`})
                return;
            }
            db = db.filter(envelope => envelope.id != id)
    }
       catch(err) {
        res.status(500).send(err);
       }
},
    transfer(req, res) {
        try {
            const { fromId, toId} = req.params;
            const { amount } = req.body;
            let sourceEnv 
            let destEnv 

            for(let envelope of db) {
                if(envelope.id == fromId) {
                    sourceEnv = envelope
                    break
                }
            }
            for(let envelope2 of db) {
                if(envelope2.id == toId) {
                    destEnv = envelope2
                    break
                }
            }

            if (sourceEnv.budget < amount) {
                return res.status(400).send({
                    message: "Amount to transfer exceeds envelope budget funds"
                })
            }

           // if (destEnv.budget < amount) {}

            sourceEnv.budget -= amount;
		    destEnv.budget = destEnv.budget + parseInt(amount);

		return res.status(201).send([sourceEnv, destEnv]);

        }
        catch(err) {
            res.status(500).send(err)
        }



    }

};