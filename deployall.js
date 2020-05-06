const Deployer = require('./deploy/deployer')
_main().then( (code) => {process.exit(code)})
        .catch(err => {console.error(err); process.exit(1)});
/**
 *  Optional command line params:
 *      shardSize -- specify the max number of functions to be deployed in a group, default=15
 *      functionPath -- specify the functions path, default='./'
 *      projectid -- specify the Firebase project ID, default is the current authenticated Firebase project
 *      retries -- number of retires for the deploy command, default=3
 *      nameSegment -- value of segment for function naming convention that identifies that it's a function
 *          ex: function name = myfunction.f.js where the 'f' is the naming convention that identifies it as a function
 *                  deployall -nameSegment=f
 */
async function _main() {
    try {
        await new Deployer().deploy();
    } catch(e) {
        throw e;
    }
    return 0;
}
