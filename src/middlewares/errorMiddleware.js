/* eslint-disable no-unused-vars */
const errorMiddleware = (error, req, res, next) => {
	
	if (error.name === 'ValidationError'){
		return res.status(400).json({ message: error.message });
	}
  
	if(error.name === 'JsonWebTokenError') {
		return res.status(403).json({message: 'JWT error: ' + error.message});
	}

	const statusCode = error.statusCode ?? 500;
	return res.status(statusCode).json({message: error.message});
};

module.exports = {
	errorMiddleware
};