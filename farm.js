
const getYieldForPlant = (plant) => {
    return plant.yield;
}

const getYieldForCrop = (crop) => {
    return crop.numCrops * crop.crop.yield;
}

/*

input: call as getTotalYield({crops}), for some reason.

{ objCrops: {
    crops: [
            {
                crop: {
                    crop: 'corn',
                    yield: 5
                },
                numCrops: 5
            },
            {
                crop: {
                    crop: 'aubergine',
                    yield: 3
                },
                numCrops: 4
            }
        ]
}
}

*/

const getTotalYield = (outerObjCrops) => { // Argument is an array with crop objects; called as ({array})
    const arrCrops = outerObjCrops.crops    
    let totalYield = 0
    for (let crop of arrCrops) {
        totalYield += getYieldForCrop(crop)
    }
    return totalYield;
}

// console.log(getTotalYield({crops}));

const getCostsForCrop = (seedPrice, crop) => {
    return seedPrice * crop.numCrops;
}

const getRevenueForCrop = (salePrice, crop) => {
    return salePrice * crop.numCrops
}

const getProfitForCrop = (seedPrice, salePrice, crop) => {
    return getRevenueForCrop(salePrice, crop) - getCostsForCrop(seedPrice, crop);
}

module.exports = {
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop
}