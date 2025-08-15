const errorMiddleware = (err, req, res, next) => {
    try{
        let error ={ ...err };

        error.message = err.message;

        console.error(err);

        //Mongo bad ObjectID
        if(err.name === 'CastError'){
            const message = 'Resource not found';

            error= new Error(message);
            error.statusCode= 404;
        }

        //Mongoose duplicate key
        if(err.code === 1100){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(error).map(val=>val.message);
            error= new Error(message.join(','));
            error.statusCode = 404;
        }

        res.status(err.statusCode || 500).json({success:false, error:error.message || 'Server Error'});
    } catch (error){
        next(error);
    }
};
export default errorMiddleware;