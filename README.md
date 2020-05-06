# Engineering11 Function Deployer

@enginering11/function-deployer is a library to automatically deploy Firebase Functions in groups.

Engineering11 built this module to accommodate deploying a large number of functions (100+) in a CI/CD environment based on the currently recommended approach of grouping functions. 


## Prerequisites
- A Firebase project setup that includes functions
- A function naming convention of [functionname]*.f.js* (ex: myfunction.f.js) **see credits
## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install function-deloyer.

```bash
npm install @engineering11/function-deployer --save-dev
```

## Usage
From package.json
```json
"scripts": {
    ...
    "deployall": "node ./node_modules/@engineering11/function-deployer/deployall.js",
},
```
Then from the functions directory in your Firebase project
```bash
npm run deployall
```

Or from the command line in the functions directory of your Firebase project
```bash
node ./node_modules/@engineering11/function-deployer/deployall.js
```
Optional command line parameters
- shardSize -- specify the max number of functions to be deployed in a group, default=15
- functionPath -- specify the functions path, default='./'
- projectid -- specify the Firebase project ID, default is the current authenticated Firebase project
- retries -- number of retires for the deploy command, default=3
- nameSegment -- value of segment for function naming convention that identifies that it's a function, default='f' (ex: given the function name *myfunction.f.js* where **'f'** is the naming convention that identifies it as a function:
`deployall -nameSegment=f`)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits
Tarik Huber for [this]( https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da) article

## License
[MIT](https://choosealicense.com/licenses/mit/)