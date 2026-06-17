function buildDashboard() {

    const data =
        window.dashboardData?.fy2627;

    if (!data) {
        console.log("No Dashboard Data Found");
        return;
    }

    const outletRanking =
        data.outletRanking || [];

    const outletPerformance =
        data.outletPerformance || [];

    const top5Outlets =
        outletRanking.slice(0, 5);

    const revenue =
        data.revenue || 0;

    const grossMargin =
        data.grossMargin || 0;

    const ebitda =
        data.ebitda || 0;

    const cogs =
        data.cogs || 0;

    const container =
        document.getElementById("dashboardContainer");

    container.innerHTML = `

    <!-- KPI SECTION -->

    <div class="kpi-grid">

        <div class="kpi-card">
            <h3>Total Revenue</h3>
            <h2>₹${(revenue / 10000000).toFixed(2)} Cr</h2>
        </div>

         <div class="kpi-card">
            <h3>COGS</h3>
            <h2>₹${(cogs / 10000000).toFixed(2)} Cr</h2>
        </div>

        <div class="kpi-card">
            <h3>Gross Margin</h3>
            <h2>₹${(grossMargin / 10000000).toFixed(2)} Cr</h2>
        </div>

        <div class="kpi-card">
            <h3>EBIDTA</h3>
            <h2>₹${(ebitda / 10000000).toFixed(2)} Cr</h2>
        </div>

    </div>

    <!-- ROW 1 -->

    <div class="dashboard-grid">

        <div class="table-card">

            <h2>📊 Outlet EBITDA Performance</h2>

            <table class="outlet-table">

                <thead>

                    <tr>
                        <th>Outlet</th>
                        <th>Revenue</th>
                        <th>GM %</th>
                        <th>EBIDTA</th>
                        <th>EBIDTA %</th>
                    </tr>

                </thead>

                <tbody>

                    ${outletPerformance.map(outlet => `

                    <tr>

                        <td>${outlet.outlet}</td>

                        <td>
                            ₹${(outlet.revenue / 10000000).toFixed(2)} Cr
                        </td>

                        <td>
                            ${outlet.gmPercent.toFixed(1)}%
                        </td>

                        <td>
                            ₹${(outlet.ebitda / 10000000).toFixed(2)} Cr
                        </td>

                        <td>
                            ${outlet.ebitdaPercent.toFixed(1)}%
                        </td>

                    </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

        <div class="chart-card">

            <h2>📊 Quarter Revenue Comparison</h2>

            <div class="chart-wrapper">

                <canvas id="quarterRevenueChart"></canvas>

            </div>

        </div>

    </div>

    <!-- ROW 2 -->

    <div class="dashboard-grid">

        <div class="chart-card">

            <h2>🍽 Revenue Mix</h2>

            <div class="chart-wrapper">

                <canvas id="revenueMixChart"></canvas>

            </div>

        </div>

        <div class="chart-card">

            <h2>🏆 Top 5 Outlets</h2>

            ${top5Outlets.map((item, index) => `

                <div class="ranking-row">

                    <div>

                        <span class="rank-number">
                            ${index + 1}
                        </span>

                        ${item.outlet}

                    </div>

                    <div>

                        ₹${(item.revenue / 10000000).toFixed(2)} Cr

                    </div>

                </div>

            `).join("")}

        </div>

    </div>

    `;
    createQuarterRevenueChart();
    createRevenueMixChart();
}
