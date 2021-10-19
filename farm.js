
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

const getCostsForCrop = crop => {
    return crop.crop.seedPrice * crop.numCrops;
}

const getRevenueForCrop = crop => {
    return crop.crop.salePrice * crop.numCrops;
}

const getProfitForCrop = crop => {
    return getRevenueForCrop(crop) - getCostsForCrop(crop);
}















const aubergine = {
    name: "aubergine",
    yield: 5,
    seedPrice: 3,
    salePrice: 5
};

const corn = {
    name: "corn",
    yield: 3,
    seedPrice: 2,
    salePrice: 3
};


const crop = [
    { crop: aubergine, numCrops: 10},
    { crop: corn, numCrops: 20}
];

const getTotalProfit = cropArray => {
    let totalProfit = 0
    for (let crop of cropArray) {
        totalProfit += getProfitForCrop(crop);
    }
    return totalProfit;
}

module.exports = {
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}