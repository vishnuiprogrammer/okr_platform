
const deleteAccessToken = async (req, res) => {
    try {
        
        res.clearCookies("")
    } catch (error) {
        
        console.log(error);
        return res.status(400).json({message : error.message})
    }
}