let workbookData = {};

function processWorkbook(workbook, yearKey) {

    workbookData = {};

    workbook.SheetNames.forEach(sheetName => {

        workbookData[sheetName] =
            XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName],
                { header: 1 }
            );

    });

    const fyData =
        workbookData[`FY${yearKey}`];

    const revenue =
        getRevenue(fyData);

    const grossMargin =
        getGrossMargin(fyData);

    const ebitda =
        getEBITDA(fyData);

    const cogs =
        getCOGS(fyData);

    const revenueMix =
        getRevenueMix(fyData);

    const outletRanking =
        getDynamicOutletRevenue(fyData);

    const outletPerformance =
        getOutletPerformance(fyData);

    const q1Data =
        workbookData[`Q1 FY${yearKey}`];

    const q2Data =
        workbookData[`Q2 FY${yearKey}`];

    const q3Data =
        workbookData[`Q3 FY${yearKey}`];

    const q4Data =
        workbookData[`Q4 FY${yearKey}`];

    const quarterRevenue = [

        q1Data ? getQuarterRevenue(q1Data) : 0,
        q2Data ? getQuarterRevenue(q2Data) : 0,
        q3Data ? getQuarterRevenue(q3Data) : 0,
        q4Data ? getQuarterRevenue(q4Data) : 0

    ];

    return {

        revenue,
        grossMargin,
        ebitda,
        cogs,

        revenueMix,

        outletRanking,
        outletPerformance,

        quarterRevenue

    };

}