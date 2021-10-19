const { getYieldForPlant, 
        getYieldForCrop, 
        getTotalYield,
        getCostsForCrop,
       getRevenueForCrop,
       getProfitForCrop,
       getTotalProfit } = require("./farm");

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
    let corn = {
        name: "corn",
        yield: 3,
        seedPrice: 2
    };
    let crop = { crop: corn, numCrops: 10}

    test("10 crops for 2 currency each equals 20", () => {
        expect(getCostsForCrop(crop)).toBe(20);
    });

    test("Free seeds > zero costs", () => {
        let corn = {
            name: "corn",
            yield: 3,
            seedPrice: 0
        };

        let crop = { crop: corn, numCrops: 10}
        expect(getCostsForCrop(crop)).toBe(0);
    });
})

describe('Revenue for crop', () => {
    test("10 crops for 3 currency each equals 30", () => {
        let aubergine = {
            name: "aubergine",
            yield: 5,
            salePrice: 3
        };
        let crop = { crop: aubergine, numCrops: 10}
        expect(getRevenueForCrop(crop)).toBe(30);
    });

    test("Free giveaway produce > zero revenue", () => {
        let aubergine = {
            name: "aubergine",
            yield: 0,
            salePrice: 0
        };
        let crop = { crop: aubergine, numCrops: 10}
        expect(getRevenueForCrop(crop)).toBe(0);
    });
})

describe('Profit for crop', () => {
    let aubergine = {
        name: "aubergine",
        yield: 5,
        seedPrice: 2,
        salePrice: 3
    };

    let crop = { crop: aubergine, numCrops: 10}

    test("30 revenue and 20 loss > 10 profit", () => {
        expect(getProfitForCrop(crop)).toBe(10);
    });

    test("Free seeds, free crops > no loss or profit", () => {
        let aubergine = {
            name: "aubergine",
            yield: 5,
            seedPrice: 0,
            salePrice: 0
        };
        let crop = { crop: aubergine, numCrops: 10}
        expect(getProfitForCrop(crop)).toBe(0);
    });
})

describe('Total profit for crop', () => {

    test("Two crops, no environmental factors", () => {
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

        expect(getTotalProfit(crop)).toBe(40)
    })
});