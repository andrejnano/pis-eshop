/*
|------------------------------------------------------------------------------
| Normalized API response syntax/format
|------------------------------------------------------------------------------
| Generic HTTP Response data format:
|   res.data =  { success: Boolean, timestamp: String, [data | error]: Object }
*/


/*
|------------------------------------------------------------------------------
| SUCCESS RESPONSE
|------------------------------------------------------------------------------
|
| res => initial response object
| data => JSON data / response body
| statusCode => HTTP status code
|
| function SuccessResponse(res, data, statusCode)
| * sets JSON Content-Type Header
| * encapsulates 'data'
| * includes timestamp of the response
| * sets HTTP status with 'statusCode'
|
*/
module.exports.SuccessResponse = function(res, data, statusCode) {

  // Set HTTP header
  res.setHeader('Content-Type', 'application/json')

  // This will be accessible by client as 'data' property in the response schema
  let returnData = {
    success: true,
    timestamp: new Date()
  }

  // Append the raw response 'data' object
  // or leave a message if there is no additional data
  if (typeof data === 'object' && data !== null) {
    returnData = Object.assign(returnData, data)
  } else {
    returnData = Object.assign(returnData, { message: 'This response has no data.' })
  }

  // Set the HTTP status code, 'status' property in the response schema
  res.statusCode = typeof statusCode === 'number' ? statusCode : 200

  return res.send(returnData)
}


/*
|------------------------------------------------------------------------------
| ERROR RESPONSE
|------------------------------------------------------------------------------
|
| res => initial response object
| error => error object or message
| statusCode => HTTP status code
|
| function ErrorResponse(res, error, statusCode)
| * sets JSON Content-Type Header
| * encapsulates 'error'
| * includes timestamp of the response
| * sets HTTP status with 'statusCode'
|
*/
module.exports.ErrorResponse = function(res, error, statusCode) {

  // Set HTTP header
  res.setHeader('Content-Type', 'application/json')

  // This will be accessible by client as 'data' property in the response schema
  let returnData = {
    success: false,
    timestamp: new Date()
  }

  // If the error object has a message (String) property, use it in place of the original error object
  // If the error object is defined, just return it as property 'error'
  // Otherwise leave a message as property 'error'
  if (error === null || typeof error === 'undefined') {
    returnData = Object.assign(returnData, { error: 'Unknown error, no description given.'})
  } else if (typeof error !== 'undefined' && error.hasOwnProperty('message')) {
    returnData = Object.assign(returnData, { error: error.message })
  } else if (typeof error !== 'undefined') {
    returnData = Object.assign(returnData, { error: error })
  }

  // Set the HTTP status code, 'status' property in the response schema
  res.statusCode = typeof statusCode !== 'undefined' ? statusCode : 400

  return res.send(returnData)
}
