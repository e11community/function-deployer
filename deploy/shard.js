const camelCase = require("camelcase");

class Shard {
    constructor(name) {
        this.name = name;
        this.functionMap = new Map();
    }

    add(fileName) {
        const functionName = this._buildFunctionName(fileName)
        this.functionMap.set(functionName, fileName);
    }

    size() {
        return this.functionMap.size;
    }

    args() {
        let _args = '';
        this.functionMap.forEach( (value, key) => {
            _args += 'functions:'+key+','
        });
        return _args.slice(0,-1);
    }

    _buildFunctionName(file) {
        return camelCase(file.slice(0, -5).split('/').join('_'));
    }
}
module.exports = Shard;
