window.addEventListener(
    "DOMContentLoaded",
    loadMISFiles
);

async function loadMISFiles() {

    try {

        const fy2526Response =
            await fetch(
                "data/FY2025-2026 _ Budgeted and Actual MIS - (2).xlsx"
            );

        const fy2627Response =
            await fetch(
                "data/FY2026-2027_Budgeted and Actual MIS.xlsx"
            );

        const fy2526Buffer =
            await fy2526Response.arrayBuffer();

        const fy2627Buffer =
            await fy2627Response.arrayBuffer();

        const workbook2526 =
            XLSX.read(
                fy2526Buffer,
                { type: "array" }
            );
        console.log("FY25-26 Loaded");
        console.log(workbook2526.SheetNames);

        const workbook2627 =
            XLSX.read(
                fy2627Buffer,
                { type: "array" }
            );
        console.log("FY26-27 Loaded");
        console.log(workbook2627.SheetNames);

        window.dashboardData = {

            fy2526:
                processWorkbook(
                    workbook2526,
                    "25-26"
                ),

            fy2627:
                processWorkbook(
                    workbook2627,
                    "26-27"
                )

        };

        console.log(
            "Dashboard Data",
            window.dashboardData
        );

        buildDashboard("fy2627");

    }

    catch(error){

        console.error(error);

    }

}
function processWorkbook(workbook, year) {

    const workbookData = {};

    workbook.SheetNames.forEach(sheetName => {

        workbookData[sheetName] =

            XLSX.utils.sheet_to_json(

                workbook.Sheets[sheetName],

                { header: 1 }

            );

    });

    const fySheet =

        workbookData[
            workbook.SheetNames.find(
                name => name.includes("FY")
            )
        ];

    const quarterSheets =

        workbook.SheetNames.filter(
            name => name.includes("Q")
        );

    const quarterRevenue =

        quarterSheets.map(sheet =>

            getQuarterRevenue(
                workbookData[sheet]
            )

        );

    return {

        revenue:
            getRevenue(fySheet),

        grossMargin:
            getGrossMargin(fySheet),

        ebitda:
            getEBITDA(fySheet),

        cogs:
            getCOGS(fySheet),

        revenueMix:
            getRevenueMix(fySheet),

        outletRanking:
            getDynamicOutletRevenue(fySheet),

        outletPerformance:
            getOutletPerformance(fySheet),

        quarterRevenue:
            quarterRevenue,
        
        monthlyData:
            workbookData

    };

}