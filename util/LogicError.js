/**
 * Created by AstaTus on 2016/3/25.
 */
"use strict";

//Utils module loaded
var util = require('util');

/**
 * Error Class ValueOutOfRangeError
 * */
function LogicError(code) {

    /*INHERITANCE*/

    //super constructor
    Error.call(this);

    //super helper method to include stack trace in error object
    Error.captureStackTrace(this, this.constructor);

    //Set the name for the ERROR
    //set our function’s name as error name.
    this.name = this.constructor.name;
    this.code = code;
}

// inherit from Error
util.inherits(LogicError, Error);

//Export the constructor function as the export of this module file.
exports = module.exports = LogicError;