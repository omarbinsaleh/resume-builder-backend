## User Registration API

The user, who does not have an account, should create an account using the sign up form. Using the form, user will provide the following information:

- name
- email
- password
- profile image - profile image URL

When a new user tries sign up by submitting the form with these information mentioned above, the Frontend processes the data and make a POST request to the backend with the data using a predefined API end point, which in this case is `http://localhost:8000/api/auth/register` . 

When the backend receives a POST request from Frontend and if it finds that the request was made to this `http://localhost:8000/api/auth/register`  API end point, it calls a function or controller named `registerUser` which will then perform the following tasks:

- ✅ Extract the necessary information from the request body. All the data sent by the Frontend will be accessible from the request body. In our case, the information we be receiving in the backend are name, email, password and the profile image URL.
- ✅ It checks to see if any user already exists in the database with the same email. if it does find a user with the same email, it ends the request and response cycle immediately and send a response to the Frontend with a status code of (400) and an appropriate message.
- ✅ Hash the password using the `bcryptjs` package
- ✅ Create a new user
- ✅ Generate a JWT token using the `jsonwebtoken` package. The information provided in the payload is the ID of the newly created user.
- ✅ Send a response to the Frontend with the status code (200) and a success message as well as a data object holding the id, name, email, profile image URL of the newly created user and the token generated earlier.
- ✅ In case, while handling the tasks mentioned above, any error occurs, it will send a response to the client or the Frontend with the status code (500) and an appropriate message.

## Login User API

To login, an existing user will be provided with a login form where the user will enter his or her email and password. When the user hit the login button, the login form will validate if all the required information is provided or not. After all the necessary validation is done, the Frontend will make POST request to a predefined API end point, which is `http://localhost:8000/api/auth/login` 

The backend on the other hand is looking for a request coming from the Frontend. When it detects a request and it finds that it is a POST request which was made to this `http:localhost/api/auth/login` API end point, It immediately calls a function or controller named `loginuser` , which in turn will perform the following tasks:

- ✅ Extract the necessary user information such as email, password from the request body. The request body usually contains all the data that was sent by the Frontend while making the request to the backend server. In our case, these information are the user email and password.
- ✅ After extracting the data, It will check to see if the user really exists in the database with the email provided. Not finding user with the email provided indicates that that particular user who is trying to login is not an existing user and in that case the backend will terminate the request and response cycle by sending a response with the status code (500) and a meaning full message describing the issue being occurred .
- ✅ When the user is found to be an existing user in the database, it will further check if the password provided actually matches with the old password which the user provided when creating his or her account. In case, if the password is found to be incorrect and does not match with the old one, then it will terminate the request and response cycle by sending a response with the status code 500 and an appropriate message to the Frontend.
- ✅ Generate a JWT token using the `jsonwebtoken` package. The payload contains the ID of the existing user
- ✅ After all the validation process is done, it sends a success response to the Frontend with the status code 200 and a user object which will contain the user information such user ID, name, email, profile image URL and the  token generated earlier.

## Get User Profile API

Sometimes, user might want to check or see his or her profile information. For that purpose, every existing user will be provided with a backend API, which in this case is `http://localhost:8000/api/auth/profile` . This is a private API end point. Whenever an existing user wants to retrieve his or her profile information, The Frontend will make a POST request to the backend using the API end point mentioned earlier. The Frontend must make sure that when the POST request is made to this backend API end point `http://localhost:8000/api/auth/profile` , the request will be made along with Authorization Header which holds the token generated while Sign Up or Login process.

As it is a private API, it runs a middleware function named `protect` whose purpose is to check if there is Authorization Header holding the bearer token. The followings are the tasks performed by the `protect` function.

- ✅ Extract bearer token from the `req.headers.authorization`
- ✅ Check if the token exist in the authorization header. If not, it ends the request - response cycle and sends a response with the status code 401 and a message to indicate that No such token is found.
- ✅ Store the token in a variable and decode the token using the `jwt.verify(token, secret)` method to get the user ID.
- ✅ Find the user from the database using the User ID found in the token.
- ✅ Save the user information in the request object with a key named user.
- ✅ The call the next middleware using the `next()` method.

Now information of the user in question are accessible in the request object. And in the last step, the controller will find the user from the database using that particular User ID and send the information to the Frontend with the status code 200 and a success message to indicate the the user’s information is successfully returned, otherwise a response will be sent with the status code 500 and an error message indicating that something went wrong and couldn’t find the user information.

## Delete User By Email API

For the client to delete an user using the user’s email, it needs to make a DELETE request to the backend API end point - `http://localhost:8000/api/auth/user` with the user email through the request body.

Whenever the backend finds a DELETE request from the client and, it triggers a controller named `deleteUserByEmail` which will then perform the following tasks

- ✅ Extract the user email from the `req.body`
- ✅ Check if the email is provided or not. If not, it terminates the request-response cycle with the status code 400 and a message to tell the client that the email was not found in the `req.body`
- ✅ Find and delete the user from the database using the user email.
- ✅ Send a response with a status code 200 and an object containing these information - success equal to true, a message indicating that the delete operation is successful and the deleted user

## Upload Image API

API End Point: `http://loacalhost:8000/api/auth/upload-image` 

Request Method: POST

Access: Public

The purpose of this API end point is to save image in the upload directory. When  the client make a POST request to this end point, the backend with help of the `Multer` package process the image. 

Here, when the client make a POST request to this API end point which is `http://localhost:8000/api/auth/upload-image` , the following middleware functions are run

- `upload.single(’image’)`
    
    Here one thing to note is that the `upload` in the `upload.single("image");`  is an instance of the `Multer` middleware wrapper function.
    
    By calling this function, the `Multer` is configured to look for a field named “image” and return a correct middleware function which will handle parsing the uploaded file and add a file object to the request object like `req.file` . This `req.file` object contains all the meta data about the uploaded file like the following. 
    
    ```jsx
    {
    	fieldname: 'image',
    	originalname: 'cat.png',
    	encoding: '7bit',
    	mimetype: 'image/png',
    	destination: 'upload/',
    	filename: '1716764839301-image.png',
    	path: 'upload/1716764839301-image.png'
    	size: 10245
    }
    ```
    
- `uploadImage`
    
    It first checks for the file object in the request object and if the file object does not exist in the request object, then it ends or terminates the request-response cycle with a status code of 400 a message to indicate that No file was found as if the client did not upload any file or something went wrong while processing the uploaded file by `Multer` .
    
    Create an URL for the uploaded file or image and send that URL to the client with a status code of 200 and a success message.
    
    ```jsx
    const uploadImage = (req, res) => {
    	if (!req.file) {
    		return res.status(400).json({success: false, message: "No file uploaded"})
    	};
    	
    	const imageURL = `${req.protocol}://${req.get("host")/uploads/${req.file.filename}`;
    	
    	return res.status(200).json({success: true, message: "File uploaded successfully", imageURL});
    };
    ```
    

### 🧾 More on the `Multer`

Here `Multer` is a node.js middleware for handling `multipart/form-data` , specially is used for uploading files. `Multer` adds a `body` object and a `file` or `files` object to the `request` object. The `body` object contains the values of the text fields of the form, the `file` or `files` object contains the files uploaded via the form.

```jsx
// Import the multer package
const multer = require('multer');

// Determine how and where to store the image
const storage = multer.discStorage({
	destination: (req, file, cb) => {
		cb(null, '/uploads');
	},
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}-${file.originalname}`
		cb(null, fileName);
	}
});

// Filter out the allowed file type
const fileFilter = (req, file, cb) => {
	allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	
	if (allowedTypes.includes(file.mimeType)) {
		cb(null, true);
	} else {
		cb (new Error('Only .png, .jpeg, .jpg formate are allowed', false));
	};
};

// Initialize the multer middleware
const upload = multer({storage, fileFilter});

// Export the middleware
module.exports = { upload };
```

### 🧾 Let’s Breakdown the `req.file` object

If a user uploads `MyProfilePicture.jpg`, `req.file` might look like:

```jsx
{
  fieldname: 'myFile', // it refers to the name that was given to the input field
  originalname: 'MyProfilePicture.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '1716764839301-MyProfilePicture.jpg',
  path: 'uploads/1716764839301-MyProfilePicture.jpg',
  size: 28372
}
```

- `originalname`: Name of the file on the user's device.
- `filename`: Name that `multer` used to store the file on the server.

---

### 🧠 Use Case

- You might want to display or log the original file name to the user.
- You **should not** rely on `originalname` for saving files directly (due to naming collisions and security risks).

## Create a New Resume API

API end point: `http://localhost:8000/api/resume`

Request Method: POST

Access: Private or Protected Route

The client will make a POST request to this API to create a new resume. The client are required to make sure that the following information are sent to the backend while making the POST request to the backend.

- `Body` : it will contain the following information at least
    - Title of the resume
- `Authorization Header` : This header will hold the bearer token which was created when the user sign-in or sign-up into the system.

In the backend, when it finds a POST request to this API end point from the client, it runs the following middleware function such `private`  and `createResume` 

### `private` Custom Middleware

As it is a private API, it will perform some validation in the middle. And these validation include the following tasks

- ✅ it checks for the `Authorization`  header and search for the token string in that header.
- ✅ if it finds the token string and the token string starts with the word ‘Bearer’ then it will perform the following tasks
    - Separate the token from the token string and save the token in a variable named `token`
    - Decode the token for the hidden user ID in the decoded object.
    - Using the user ID, find the user from the database
    - Add the user information in the request object so that, if needed, other middleware can access the user information later from the request object like `req.user`
    - After adding the user information to the request object, it calls the `next()` function and will proceed toward executing the rest of the middleware or controllers in the way.
- ✅ In case if it does not find the token string or the token string does not start with the word ‘Bearer’, then it terminate the request-response cycle with a status code of 401 and a message indicating that No token is found or the token is not what is expected.
- ✅ And finally, if something goes wrong while doing these task, it terminate the request-response cycle with a status code of 500 and an error message;

### `createResume` Controller

This controller will do the following tasks

- ✅ Extract the resume title from the `req.body`
- ✅ Create the default resume data with following information and store in a variable named `defaultResumeData`
    - Profile Information
        - Profile Image
        - Profile Preview URL
        - Full Name
        - Designation
        - Summary
    - Contact Information
        - Email
        - Phone
        - Location
        - LinkedIn
        - GitHub
        - Website
    - Work Experiences
        
        An array of objects where each object contains following information
        
        - Company
        - Role
        - Start Date
        - End Date
        - Description
    - Education
        
        An array of objects where each object contains following information
        
        - Degree
        - Institution
        - Start Date
        - End Date
    - Skills
        
        An array of objects where each object contains following information
        
        - Name
        - Progress
    - Projects
        
        An array of objects where each object contains following information
        
        - Title
        - Description
        - GitHub Link
        - Live Link  / Live Demo
    - Certifications
        
        An array of objects where each object contains following information
        
        - Title
        - Issuer
        - Year
    - Languages
    - Interests
- ✅ Create a New Resume
- ✅ Send a response to the client with the status code of 200 and a success message as well as the New Resume created.
- ✅ If something goes wrong while processing these tasks, send an error response with the status code of 500 and an error message

## API for Getting Logged-In User's Resumes

API end point: `http://localhost:8000/api/resume`

Request Method: GET

Access: Private or Protected Route

In order to get all the resumes created by a particular user, the client are required to make a GET request to this API end point with the `Authorization` header to send the bearer token.

When the backend receives a GET request and the request was made to this API end point, it performs the following tasks:

### `protect` Custom Middleware

As it is a private API, it will perform some validation in the middle. And these validation include the following tasks

- ✅ it checks for the `Authorization`  header and search for the token string in that header.
- ✅ if it finds the token string and the token string starts with the word ‘Bearer’ then it will perform the following tasks
    - Separate the token from the token string and save the token in a variable named `token`
    - Decode the token for the hidden user ID in the decoded object.
    - Using the user ID, find the user from the database
    - Add the user information in the request object so that, if needed, other middleware can access the user information later from the request object like `req.user`
    - After adding the user information to the request object, it calls the `next()` function and will proceed toward executing the rest of the middleware or controllers in the way.
- ✅ In case if it does not find the token string or the token string does not start with the word ‘Bearer’, then it terminate the request-response cycle with a status code of 401 and a message indicating that No token is found or the token is not what is expected.
- ✅ And finally, if something goes wrong while doing these task, it terminate the request-response cycle with a status code of 500 and an error message;

### `getUserResumes` Controller

This controller will ultimately return all the resumes listed under a particular user ID by performing the following tasks:

- ✅ Extract the user ID from the `req.user` and save the ID in a variable named `userId`
- ✅ Using the user ID, find all the available resumes listed under this user ID and save in a variable name `resumes`
- ✅ If there is no resumes found, then send an error response to the client with the status code of 400 and an appropriate message
- ✅ Send the resumes found to the client
- ✅ In case while doing all these tasks, if any error happens , send an error response to the client with the status code of 500 and a message indicating that something went wrong.

## API for Getting a Resume By ID

API end point: `http://localhost:8000/api/resume/:id`

Request Method: GET

Access: Private

For client to retrieve a single resume data using it's ID, It needs to hit this API `http://localhost:8000/api/resume/:id`. This API is a private API which means that while making request to this API, the clients are required to send the authorization token with the request. When the client make a GET request to this API, the backend will run a custome middleware function which is named as `protect` and a controller named `getResumeById`

Note: The backend generates a new authorization token and then send that newly generated token to the client side so that the client store the token and could send that token back to the backend with every requests. This process happens everytime when the client makes a POST request to any of the following API end points

    - `http://localhost:8000/api/auth/register`  An API for registering a new user
    - `http://localhost:8000/api/auth/login`  An API to login an existing user into the system

### `protect` Custom Middleware

As it is a private API, it will perform some validation in the middle. And these validation include the following tasks

- ✅ it checks for the `Authorization`  header and search for the token string in that header.
- ✅ if it finds the token string and the token string starts with the word ‘Bearer’ then it will perform the following tasks
    - Separate the token from the token string and save the token in a variable named `token`
    - Decode the token for the hidden user ID in the decoded object.
    - Using the user ID, find the user from the database
    - Add the user information in the request object so that, if needed, other middleware can access the user information later from the request object like `req.user`
    - After adding the user information to the request object, it calls the `next()` function and will proceed toward executing the rest of the middleware or controllers in the way.
- ✅ In case if it does not find the token string or the token string does not start with the word ‘Bearer’, then it terminate the request-response cycle with a status code of 401 and a message indicating that No token is found or the token is not what is expected.
- ✅ And finally, if something goes wrong while doing these task, it terminate the request-response cycle with a status code of 500 and an error message;