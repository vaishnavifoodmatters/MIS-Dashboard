function findRow(sheetData, keyword) {

    if (!sheetData) {
        console.log("Sheet Data Missing");
        return null;
    }

    return sheetData.find(row =>
        row.some(cell =>
            String(cell || "")
                .toLowerCase()
                .includes(keyword.toLowerCase())
        )
    );

}

// =========================
// REVENUE
// =========================

function getRevenue(sheetData) {

    if (!sheetData) return 0;

    const row =
        findRow(sheetData, "Total Sales Revenue");

    return row
        ? Number(row[2]) || 0
        : 0;

}

// =========================
// GROSS MARGIN
// =========================

function getGrossMargin(sheetData) {

    if (!sheetData) return 0;

    const row =
        findRow(sheetData, "Gross Margin");

    return row
        ? Number(row[2]) || 0
        : 0;

}

// =========================
// EBIDTA
// =========================

function getEBITDA(sheetData) {

    if (!sheetData) return 0;

    const row = sheetData.find(row =>
        row.some(cell => {

            const text =
                String(cell || "")
                    .toUpperCase();

            return text.includes("EBIDTA") ||
                   text.includes("EBITDA");

        })
    );

    return row
        ? Number(row[2]) || 0
        : 0;

}

// =========================
// QUARTER REVENUE
// =========================

function getQuarterRevenue(sheetData) {

    const row =
        findRow(sheetData, "Total Sales Revenue");

    if (!row) return 0;

    for(let i = 1; i < row.length; i++){

        if(
            typeof row[i] === "number" &&
            row[i] > 100000
        ){
            return row[i];
        }

    }

    return 0;
}

// =========================
// OUTLET REVENUE
// =========================

function getCOGS(sheetData) {

    const row =
        findRow(sheetData, "Total COGS & Packaging");

    console.log("COGS Row:", row);

    return row ? Number(row[2]) : 0;
}

function getRevenueMix(sheetData) {

    const foodRow =
        findExactRow(sheetData,"Food");

    const beverageRow =
        findExactRow(sheetData,"Beverage");

    const liquorRow =
        findExactRow(sheetData,"Liquor");

    const serviceRow =
        findExactRow(sheetData,"Service Charge");

    const scrapRow =
        findExactRow(sheetData,"Scrap Sales");

    return {

        food:
            Number(foodRow?.[2]) || 0,

        beverage:
            Number(beverageRow?.[2]) || 0,

        liquor:
            Number(liquorRow?.[2]) || 0,

        service:
            Number(serviceRow?.[2]) || 0,

        scrap:
            Number(scrapRow?.[2]) || 0

    };

}

function findExactRow(sheetData, keyword) {

    if (!sheetData) return null;

    return sheetData.find(row =>

        row.some(cell =>

            String(cell || "")
                .trim()
                .toLowerCase() ===
            keyword.toLowerCase()

        )

    );

}
function getDynamicOutletRevenue(sheetData) {

    const headerRow = sheetData[2];

    const revenueRow =
        findRow(sheetData, "Total Sales Revenue");

    if (!headerRow || !revenueRow) {
        return [];
    }

    const outlets = [];

    headerRow.forEach((cell, index) => {

        if (
            typeof cell === "string" &&
            cell.trim() !== ""
        ) {

            let outlet =
                cell.trim();

            if (outlet === "Table Total") {
                outlet = "The Table";
            }

            // EXCLUDE TOTALS & HO
            if (
                outlet.includes("HO") ||
                outlet.includes("Total with HO") ||
                outlet.includes("Outlets Total")
            ) {
                return;
            }

            const revenue =
                Number(revenueRow[index]) || 0;

            if (revenue > 0) {

                outlets.push({
                    outlet,
                    revenue
                });

            }

        }

    });

    return outlets.sort(
        (a, b) => b.revenue - a.revenue
    );

}
function getOutletPerformance(sheetData) {

    const headerRow = sheetData[2];

    const revenueRow =
        findRow(sheetData, "Total Sales Revenue");

    const gmRow =
        findRow(sheetData, "Gross Margin");

    const ebitdaRow = sheetData.find(row =>
        row.some(cell => {

            const text =
                String(cell || "")
                    .toUpperCase();

            return text.includes("EBIDTA") ||
                   text.includes("EBITDA");

        })
    );

    if (!headerRow || !revenueRow) {
        return [];
    }

    const outlets = [];

    headerRow.forEach((cell, index) => {

        if (
            typeof cell === "string" &&
            cell.trim() !== ""
        ) {

            let outlet =
                cell.trim();

            if (outlet === "Table Total") {
                outlet = "The Table";
            }

            // EXCLUDE TOTALS & HO
            if (
                outlet.includes("HO") ||
                outlet.includes("Total with HO") ||
                outlet.includes("Outlets Total")
            ) {
                return;
            }

            const revenue =
                Number(revenueRow[index]) || 0;

            const grossMargin =
                Number(gmRow?.[index]) || 0;

            const ebitda =
                Number(ebitdaRow?.[index]) || 0;

            if (revenue > 0) {

                outlets.push({

                    outlet,
                    revenue,

                    gmPercent:
                        revenue > 0
                        ? (grossMargin / revenue) * 100
                        : 0,

                    ebitda,

                    ebitdaPercent:
                        revenue > 0
                        ? (ebitda / revenue) * 100
                        : 0

                });

            }

        }

    });

    return outlets.sort(
        (a, b) => b.revenue - a.revenue
    );

}
function getOutletRevenueFromSheet(sheetData) {

    const headerRow = sheetData[2];

    const revenueRow =
        findRow(
            sheetData,
            "Total Sales Revenue"
        );

    if (!headerRow || !revenueRow) {
        return [];
    }

    const outlets = [];

    headerRow.forEach((cell,index)=>{

        if(
            typeof cell === "string" &&
            cell.trim() !== ""
        ){

            let outlet =
                cell.trim();

            if(outlet === "Table Total"){
                outlet = "The Table";
            }

            if(
                outlet.includes("HO") ||
                outlet.includes("Total with HO") ||
                outlet.includes("Outlets Total")
            ){
                return;
            }

            outlets.push({

                outlet,

                revenue:
                    Number(
                        revenueRow[index]
                    ) || 0

            });

        }

    });

    return outlets;

}