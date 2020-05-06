const commandLineArgs = require('command-line-args')
const DEFAULT_SHARD_SIZE = 15;
const DEFAULT_FUNCTION_PATH = './'
const DEFAULT_PROJECT_ID = null;
const DEFAULT_RETRIES = 3;
const DEFAULT_NAME_SEGMENT = 'f';

class Options {
    constructor() {
        const optionDefinitions = [
            { name: 'shardSize', type: Number},
            { name: 'functionPath', type: String},
            { name: 'projectid', type: String},
            { name: 'retries', type: Number},
            { name: 'nameSegment', type: String}
        ]
        this._options = commandLineArgs(optionDefinitions)
    }

    get shardSize() {
        return this._options.shardSize || DEFAULT_SHARD_SIZE;
    }

    get functionPath() {
        return this._options.functionPath || DEFAULT_FUNCTION_PATH;
    }

    get projectid() {
        return this._options.projectid || DEFAULT_PROJECT_ID;
    }

    get retries() {
        return this._options.retries || DEFAULT_RETRIES;
    }

    get nameSegment() {
        return this._options.nameSegment || DEFAULT_NAME_SEGMENT;
    }
}
module.exports = Options;
