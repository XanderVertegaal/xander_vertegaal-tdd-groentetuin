const { getYieldForPlant, 
        getYieldForCrop, 
        getTotalYield,
        getCostsForCrop,
       getRevenueForCrop,
       getProfitForCrop } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
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
        expect(getTotalYield({crops})).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});


describe('Costs for crop', () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const crop = { crop: corn, numCrops: 10}
    const seedPrice = 2;

    test("10 crops for 2 currency each equals 20", () => {
        expect(getCostsForCrop(seedPrice, crop)).toBe(20);
    });

    test("Free seeds > zero costs", () => {
        expect(getCostsForCrop(0, crop)).toBe(0);
    });
})

describe('Revenue for crop', () => {
    const aubergine = {
        name: "aubergine",
        yield: 5,
    };
    const crop = { crop: aubergine, numCrops: 10}
    const salePrice = 3;

    test("10 crops for 3 currency each equals 30", () => {
        expect(getRevenueForCrop(salePrice, crop)).toBe(30);
    });

    test("Free giveaway produce > zero revenue", () => {
        expect(getRevenueForCrop(0, crop)).toBe(0);
    });
})

describe('Profit for crop', () => {
    const aubergine = {
        name: "aubergine",
        yield: 5,
    };
    const crop = { crop: aubergine, numCrops: 10}
    
    const seedPrice = 2;
    const salePrice = 3;

    test("30 revenue and 20 loss > 10 profit", () => {
        expect(getProfitForCrop(seedPrice, salePrice, crop)).toBe(10);
    });

    test("Free seeds, free crops > no loss or profit", () => {
        expect(getProfitForCrop(0, 0, crop)).toBe(0);
    });
})