function buildOutletComparison(month = "April") {

    const sheet25 =
        window.dashboardData
        .fy2526
        .monthlyData[
            `Summary Sheet - ${month} 2025`
        ];

    const sheet26 =
        window.dashboardData
        .fy2627
        .monthlyData[
            `Summary Sheet - ${month} 2026`
        ];

    if (!sheet25 || !sheet26) {

        alert(`${month} sheet not found`);

        return;
    }

    const fy25 =
        getOutletRevenueFromSheet(
            sheet25
        );

    const fy26 =
        getOutletRevenueFromSheet(
            sheet26
        );

    const rows =

        fy26.map(current => {

            const previous =
                fy25.find(
                    x =>
                    x.outlet ===
                    current.outlet
                );

            const oldRevenue =
                previous?.revenue || 0;

            const growth =

                oldRevenue > 0

                ?

                (
                    (
                        current.revenue -
                        oldRevenue
                    )

                    /

                    oldRevenue

                ) * 100

                :

                0;

            return {

                outlet:
                    current.outlet,

                fy25:
                    oldRevenue,

                fy26:
                    current.revenue,

                growth

            };

        });

    const topOutlet =
        [...rows].sort(
            (a,b) =>
            b.fy26 - a.fy26
        )[0];

    const bestGrowth =
        rows.reduce(
            (a,b) =>
            a.growth > b.growth
            ? a
            : b
        );

    const worstGrowth =
        rows.reduce(
            (a,b) =>
            a.growth < b.growth
            ? a
            : b
        );

    const avgGrowth =

        rows.reduce(
            (sum,x) =>
            sum + x.growth,
            0
        ) / rows.length;

    const container =

        document.getElementById(
            "dashboardContainer"
        );

    container.innerHTML = `

    <div class="comparison-header">
        <select
            id="monthSelector"
            onchange="
                buildOutletComparison(
                    this.value
                )
            "
        >

            ${[
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
                "January",
                "February",
                "March"
            ].map(m => `

                <option
                    value="${m}"
                    ${
                        month === m
                        ? "selected"
                        : ""
                    }
                >
                    ${m}
                </option>

            `).join("")}

        </select>

    </div>

    <div class="revenue-kpi-grid">
        <div class="revenue-kpi-card">
            <h3>
                Top Revenue Outlet
            </h3>

            <h2>
                ${topOutlet?.outlet || "-"}
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>
                Best Growth
            </h3>

            <h2>
                ${bestGrowth.growth.toFixed(1)}%
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>
                Worst Growth
            </h3>

            <h2>
                ${worstGrowth.growth.toFixed(1)}%
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>
                Average Growth
            </h3>

            <h2>
                ${avgGrowth.toFixed(1)}%
            </h2>

        </div>

    </div>

    <div class="outlet-comparison-grid">

        <div class="outlet-table-card">

            <table class="outlet-table">

                <thead>

                    <tr>

                        <th>Outlet</th>

                        <th>${month}-25</th>

                        <th>${month}-26</th>

                        <th>Growth %</th>

                    </tr>

                </thead>

                <tbody>

                    ${rows.map(item => `

                        <tr>

                            <td>
                                ${item.outlet}
                            </td>

                            <td>
                                ₹${(
                                    item.fy25
                                    / 10000000
                                ).toFixed(2)} Cr
                            </td>

                            <td>
                                ₹${(
                                    item.fy26
                                    / 10000000
                                ).toFixed(2)} Cr
                            </td>

                            <td class="${
                                item.growth >= 0
                                ? "positive-growth"
                                : "negative-growth"
                            }">

                                ${item.growth.toFixed(1)}%

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

        <div class="outlet-chart-card">

            <h2>

                ${month}
                Revenue Comparison

            </h2>

            <div class="chart-wrapper">

                <canvas
                    id="outletComparisonChart">
                </canvas>

            </div>

        </div>

    </div>

    `;

    createOutletComparisonChart(
        rows,
        month
    );

}