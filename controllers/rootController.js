export const rootIndexAction = async (req, res) => {
    res.render('index', {data: req.sessionID});
}