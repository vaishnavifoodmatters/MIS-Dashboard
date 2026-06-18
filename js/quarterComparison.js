
function buildQuarterRows() {

    const fy2526 =
        window.dashboardData.previousYear.quarterRevenue;

    const fy2627 =
        window.dashboardData.currentYear.quarterRevenue;

    const quarters = [

        "Q1",
        "Q2",
        "Q3",
        "Q4"

    ];

    return quarters.map((quarter,index)=>{

        const oldValue =
            fy2526[index] || 0;

        const currentValue =
            fy2627[index] || 0;

        const growth =

            oldValue > 0

            ?

            ((currentValue - oldValue)
            / oldValue) * 100

            :

            0;

        return `

        <tr>

            <td>${quarter}</td>

            <td>
                ₹${(oldValue/10000000).toFixed(2)} Cr
            </td>

            <td>
                ₹${(currentValue/10000000).toFixed(2)} Cr
            </td>

            <td class="${
                growth >= 0
                ? "positive-growth"
                : "negative-growth"
            }">

                ${growth.toFixed(1)}%

            </td>

        </tr>

        `;

    }).join("");

}
function getBestQuarter() {

    const quarters =
        window.dashboardData.currentYear.quarterRevenue;

    const maxValue =
        Math.max(...quarters);

    const index =
        quarters.indexOf(maxValue);

    return {
        quarter:`Q${index+1}`,
        value:maxValue
    };

}
function buildQuarterComparison() {

    const fy2526 =
        window.dashboardData.previousYear;

    const fy2627 =
        window.dashboardData.currentYear;

    const bestQuarter =
        getBestQuarter();

    const totalRevenue =
        fy2627.quarterRevenue.reduce(
            (a,b)=>a+b,
            0
        );

    const container =
        document.getElementById(
            "dashboardContainer"
        );

    container.innerHTML = `

    <div class="revenue-kpi-grid">

        <div class="revenue-kpi-card">

            <h3>Best Quarter</h3>

            <h2>
                ${bestQuarter.quarter}
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>Best Quarter Revenue</h3>

            <h2>
                ₹${(bestQuarter.value/10000000).toFixed(2)} Cr
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>Total FY26-27 Revenue</h3>

            <h2>
                ₹${(totalRevenue/10000000).toFixed(2)} Cr
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>Quarters Compared</h3>

            <h2>4</h2>

        </div>

    </div>

    <div class="revenue-table-card">

        <h2>📊 Quarter Growth Analysis</h2>

        <table class="outlet-table">

            <thead>

                <tr>

                    <th>Quarter</th>
                    <th>FY25-26</th>
                    <th>FY26-27</th>
                    <th>Growth %</th>

                </tr>

            </thead>

            <tbody>

                ${buildQuarterRows()}

            </tbody>

        </table>

    </div>

    <div class="revenue-chart-card">

        <h2>📈 Quarter Revenue Comparison</h2>

        <div class="revenue-chart-wrapper">

            <canvas id="quarterComparisonChart"></canvas>

        </div>

    </div>

    `;

    createQuarterComparisonChart();

}