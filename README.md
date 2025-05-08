# Middlewares

## Authentication Middleware `(authMiddleware.js)`
The following functions are available in under the Authentication Middleware
### `Protect` Middleware
this middleware function does the following tasks
   - extract authorization header from the `req.header.authorization`. This header contains the JWT token
   - check if the token string realy exists and starts with the string 'Bearer'.
   - then using the `.split()` method provided by `String` object, the Authentication string is divided into two parts (one is the word 'Bearer' and the other one is the token).
   - then save the token in a variable named `token`
   - verify the token using `jwt.verify()` method which will return a decoded object containing the information with which the token was originally generated, in our case this information is user id.
   - then check if the user is an existing user with this particular user id found in the decoded information.
   - add the user information in the request object under a property named `user`, if the user exists.
   -