const Sharder = require('./sharder');
const Shell = require('./shell');
const Options = require('./options');

class Deployer {
    constructor() {
        this._options = new Options();
        this._totalFunctionsDeployed = 0;
    }

    async deploy() {
        try {
            this._shards = new Sharder().shard();
            this._start();
            await this._deploy();
            this._complete();
        } catch(e) {
            throw e;
        }
        return 0;
    }

    _start() {
        this.start = new Date()
        this.hrstart = process.hrtime()
    }

    _complete() {
        console.log('deployment completed, deployed a total of '+ this._totalFunctionsDeployed + ' functions.');
        let end = new Date() - this.start,
            hrend = process.hrtime(this.hrstart)
        let mins = Math.round(((end/60000) + Number.EPSILON) * 100) / 100
        console.log('Execution time: %dms %dmins', end, mins);
        console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
        
    }

    _buildCommand(args) {
        this._command = null;
        if ( this.projectId ) {
            this._command = 'firebase deploy '+ '--project=' + this.projectId + ' --only ' + args;
        } else {
            this._command = 'firebase deploy --only ' + args
        }
    }

    async _deploy() {
        const shell = new Shell();
        for ( const shardPair of this._shards ) {
            const shard = shardPair[1];
            if ( shard.size() > 0 ) {
                let results = { stdout: null, stderr:null };
                try {
                    this._buildCommand(shard.args());
                    results = await shell.exec(this._command);
                    this._totalFunctionsDeployed += shard.size();
                } catch(e) {
                    throw e;
                }
                if ( results.stderr ) {
                    throw new Error(results.stderr);
                }
            }
        }
    }
}
module.exports = Deployer;
    