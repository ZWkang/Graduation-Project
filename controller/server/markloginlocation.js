const locationM = {}

exports.getUserLoaction = async function (userId){
    const result = await locationM.findOne({user_id:userId});
    return result;
}

