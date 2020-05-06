var exec = require('child_process').exec;
const Options = require('./options');

class Shell {
    constructor() {
        this._options = new Options();
    }

    async  exec(command) {
        let count = 0;
        let results = {};
        while (true) {
            try {
                results = await this._exec(command);
                return results;
            } catch(e) {
                if (++count == this._options.retries) throw e;
                console.log('retry count: ' + count);
                await this._sleep(5000);
            }
        }
    }

    async _exec(command) {
        const child = exec(command);
        child.stdout.on('data', function (data) {
            console.log(data);
        });
        child.stderr.on('data', function (data) {
            console.log(data);
        });
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
        });
    }

    _sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }   
}
module.exports = Shell;
