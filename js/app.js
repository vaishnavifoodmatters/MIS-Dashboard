window.addEventListener("DOMContentLoaded", loadMISFiles);

async function loadMISFiles() {

    try {

        console.log("Loading MIS files...");

        // =========================
        // LOAD FY25-26
        // =========================

        const fy2526Response = await fetch(
            "data/FY2025-2026 _ Budgeted and Actual MIS - (2).xlsx"
        );

        if (!fy2526Response.ok) {
            throw new Error("Unable to load FY25-26 workbook.");
        }

        const fy2526Buffer =
            await fy2526Response.arrayBuffer();

        const workbook2526 =
            XLSX.read(fy2526Buffer, {
                type: "array"
            });

        console.log("FY25-26 Loaded");
        console.log(workbook2526.SheetNames);

        // =========================
        // LOAD FY26-27
        // =========================

        const fy2627Response = await fetch(
            "data/Actual MIS - May,2026  (15-06-2026).xlsx"
        );

        if (!fy2627Response.ok) {
            throw new Error("Unable to load FY26-27 workbook.");
        }

        const fy2627Buffer =
            await fy2627Response.arrayBuffer();

        const workbook2627 =
            XLSX.read(fy2627Buffer, {
                type: "array"
            });

        console.log("FY26-27 Loaded");
        console.log(workbook2627.SheetNames);

        // =========================
        // PROCESS BOTH WORKBOOKS
        // =========================

        const previousYear =
            processWorkbook(workbook2526, "25-26");

        const currentYear =
            processWorkbook(workbook2627, "26-27");

        window.dashboardData = {
            previousYear,
            currentYear
        };

        console.log("Dashboard Data:");
        console.log(window.dashboardData);

        console.log("Previous Year Sheets:");
        console.log(Object.keys(window.dashboardData.previousYear.monthlyData));

        console.log("Current Year Sheets:");
        console.log(Object.keys(window.dashboardData.currentYear.monthlyData));

        // =========================
        // BUILD DASHBOARD
        // =========================

        buildDashboard();

    }

    catch (error) {

        console.error("App Error:", error);

    }

}