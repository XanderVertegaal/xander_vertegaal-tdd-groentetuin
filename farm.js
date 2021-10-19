const getYieldForPlant = (plant, envFactors = {nochange: 0}) => {
    let factorArray = []
    let yieldFactor = 1
    
    if (plant.factors) {
        for (let factor in envFactors) {
            let factorValue = envFactors[factor]
            if (factor in plant.factors) {
                console.log('Factor value found!', plant.factors[factor][factorValue])
                factorArray.push(plant.factors[factor][factorValue])
            }
        }
        console.log('FactorArray:', factorArray)
        yieldFactor = factorArray.reduce((total, current) => (total * (current / 100 + 1)), 1);
        console.log('YieldFactor:', yieldFactor)
        return plant.yield * yieldFactor;
    }
    else {
        return plant.yield;
    }
}


const getYieldForCrop = (cropGroup, environmentFactors) => {
    return cropGroup.numCrops * getYieldForPlant(cropGroup.crop, environmentFactors);
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