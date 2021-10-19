const getYieldForPlant = (plant, envFactors = {nochange: 0}) => {
    let factorArray = []
    let yieldFactor = 1
    
    if (plant.factors) {
        for (let factor in envFactors) {
            let factorValue = envFactors[factor]
            if (factor in plant.factors) {
                factorArray.push(plant.factors[factor][factorValue])
            }
        }
        yieldFactor = factorArray.reduce((total, current) => (total * (current / 100 + 1)), 1);
        return plant.yield * yieldFactor;
    }
    else {
        return plant.yield;
    }
}


const getYieldForCrop = (cropGroup, envFactors) => {
    return cropGroup.numCrops * getYieldForPlant(cropGroup.crop, envFactors);
}

const getTotalYield = (outerObjCrops, envFactors) => { // Argument is an array with crop objects; called as ({array})
    const arrCrops = outerObjCrops.crops    
    let totalYield = 0
    for (let crop of arrCrops) {
        totalYield += getYieldForCrop(crop, envFactors)
    }
    return totalYield;
}

const getCostsForCrop = crop => {
    return crop.crop.seedPrice * crop.numCrops;
}

const getRevenueForCrop = (crop, envFactors) => {
    return crop.crop.salePrice * getYieldForCrop(crop, envFactors);
}

const getProfitForCrop = (crop, envFactors) => {
    return getRevenueForCrop(crop, envFactors) - getCostsForCrop(crop);
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