const glob = require("glob");
const Shard = require('./shard');
const Options = require('./options');

class Sharder {
    constructor() {
        this._options = new Options();
        this._shards = new Map();
        this._allFunctionFiles = null;
    }

    shard() {
        this._findAllFunctions();
        this._packageFunctions();
        return this._shards;
    }

    _packageFunctions() {
        let currentShard = 0;
        let currentShardSize = 0;
        let name = 'group' + currentShard;
        this._shards.set(name, new Shard(name));
        this._allFunctionFiles.forEach( (file, idx) => {
            if ( currentShardSize >= this._options.shardSize ) {
                currentShard++;
                currentShardSize = 0;
                let name = 'group' + currentShard;
                this._shards.set(name, new Shard(name));
            }
            const name = 'group'+currentShard;
            const shard = this._shards.get(name);
            shard.add(file);
            currentShardSize++;
        });
    }

    _findAllFunctions() {
        this._allFunctionFiles = glob.sync(this._options.functionPath+'/**/*.'+this._options.nameSegment+'.js', 
            { cwd: this._options.functionPath, ignore: [this._options.functionPath+'/node_modules/**']});
    }
}
module.exports = Sharder;
