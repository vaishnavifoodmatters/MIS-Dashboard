function buildRevenueCategoryRows() {

    const fy2526Data =
    window.dashboardData.fy2526;

    const fy2627Data =
    window.dashboardData.fy2627;

    const growth =
    getRevenueGrowth();

    const revenueGap =
    fy2627Data.revenue -
    fy2526Data.revenue;

    const fy2526 =
    fy2526Data.revenueMix;

    const fy2627 =
    fy2627Data.revenueMix;

    const categories = [

        {
            name:"Food",
            old:fy2526.food,
            current:fy2627.food
        },

        {
            name:"Beverage",
            old:fy2526.beverage,
            current:fy2627.beverage
        },

        {
            name:"Liquor",
            old:fy2526.liquor,
            current:fy2627.liquor
        },

        {
            name:"Service Charge",
            old:fy2526.service,
            current:fy2627.service
        },

        {
            name:"Scrap",
            old:fy2526.scrap,
            current:fy2627.scrap
        }

    ];

    return categories.map(item => {

        const growth =

            item.old > 0

            ?

            ((item.current - item.old)
            / item.old) * 100

            :

            0;

        return `

        <tr>

            <td>${item.name}</td>

            <td>
                ₹${(item.old/10000000).toFixed(2)} Cr
            </td>

            <td>
                ₹${(item.current/10000000).toFixed(2)} Cr
            </td>

            <td class="${
                growth >= 0
                ? 'positive-growth'
                : 'negative-growth'
            }">
            ${growth.toFixed(1)}%
            </td>

        </tr>

        `;

    }).join("");

}
function buildRevenueComparison() {

    const container =
        document.getElementById(
            "dashboardContainer"
        );

    container.innerHTML = `

    <div class="revenue-table-card">

        <h2>📈 Revenue Category Growth</h2>

        <table class="outlet-table">

            <thead>

                <tr>
                    <th>Category</th>
                    <th>FY25-26</th>
                    <th>FY26-27</th>
                    <th>Growth %</th>
                </tr>

            </thead>

            <tbody>

                ${buildRevenueCategoryRows()}

            </tbody>

        </table>

    </div>

    <div class="revenue-chart-card">

        <h2>🍽 Revenue Category Comparison</h2>

        <div class="revenue-chart-wrapper">

            <canvas id="revenueCategoryChart"></canvas>

        </div>

    </div>

    `;

    createRevenueCategoryChart();

}
function createMonthlyOutletChart() {

    const canvas =
        document.getElementById(
            "monthlyOutletChart"
        );

    if (!canvas) return;

    const data =
        getMonthlyComparisonData();

    new Chart(canvas, {

        type: "bar",

        data: {

            labels:
                data.map(x => x.outlet),

            datasets: [

                {

                    label: "April",

                    data:
                        data.map(
                            x =>
                            x.previousRevenue
                            / 10000000
                        )

                },

                {

                    label: "May",

                    data:
                        data.map(
                            x =>
                            x.currentRevenue
                            / 10000000
                        )

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}
function getRevenueGrowth() {

    const oldRevenue =
        window.dashboardData
        .fy2526
        .revenue;

    const currentRevenue =
        window.dashboardData
        .fy2627
        .revenue;

    return oldRevenue > 0

        ? ((currentRevenue - oldRevenue)
            / oldRevenue) * 100

        : 0;

}