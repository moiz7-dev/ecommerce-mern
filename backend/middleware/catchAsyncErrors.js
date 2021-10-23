module.exports = theFunc => (req, res, next) => {
    // Promise.resolve(theFunc(req, res, next)).catch( err => next(err));
    Promise.resolve(theFunc(req, res, next)).catch(next);
}