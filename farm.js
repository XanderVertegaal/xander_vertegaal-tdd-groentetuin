
const getYieldForPlant = (plant) => {
    return plant.yield;
}

const getYieldForCrop = (crop) => {
    return crop.numCrops * crop.crop.yield;
}


const corn = {
    name: "corn",
    yield: 3,
};
const pumpkin = {
    name: "pumpkin",
    yield: 4,
};
const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
];

/*

input:

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

const getTotalYield = (outerObjCrops) => {
    const arrCrops = outerObjCrops.crops    
    let totalYield = 0
    for (let crop of arrCrops) {
        totalYield += getYieldForCrop(crop)
    }
    return totalYield;
}

// console.log(getTotalYield({crops}));


module.exports = {
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield
}