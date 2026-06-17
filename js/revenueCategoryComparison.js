function buildRevenueCategoryComparison(
    month = "April",
    category = "Food"
) {

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

    if(!sheet25 || !sheet26){

        alert("Month sheet not found");

        return;
    }

    const rows =
        getCategoryComparisonData(
            sheet25,
            sheet26,
            category
        );

    const bestGrowth =
        [...rows].sort(
            (a,b)=>b.growth-a.growth
        )[0];

    const worstGrowth =
        [...rows].sort(
            (a,b)=>a.growth-b.growth
        )[0];

    const totalRevenue26 =
        rows.reduce(
            (sum,x)=>sum+x.current,
            0
        );

    const avgGrowth =
        rows.reduce(
            (sum,x)=>sum+x.growth,
            0
        ) / rows.length;

    const container =
        document.getElementById(
            "dashboardContainer"
        );

    container.innerHTML = `

    <div class="comparison-header">

        <div class="comparison-filters">

            <select
                id="monthSelector"
                onchange="
                buildRevenueCategoryComparison(
                    this.value,
                    document.getElementById('categorySelector').value
                )">

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
                ].map(m=>`

                    <option
                    value="${m}"
                    ${
                        m===month
                        ? "selected"
                        : ""
                    }>
                    ${m}
                    </option>

                `).join("")}

            </select>

            <select
                id="categorySelector"
                onchange="
                buildRevenueCategoryComparison(
                    document.getElementById('monthSelector').value,
                    this.value
                )">

                <option ${
                category==="Food"
                ? "selected"
                : ""
                }>Food</option>

                <option ${
                category==="Beverage"
                ? "selected"
                : ""
                }>Beverage</option>

                <option ${
                category==="Liquor"
                ? "selected"
                : ""
                }>Liquor</option>

                <option ${
                category==="Service Charge"
                ? "selected"
                : ""
                }>Service Charge</option>

            </select>

        </div>

    </div>

    <div class="revenue-kpi-grid">

        <div class="revenue-kpi-card">

            <h3>Top Growth Outlet</h3>

            <h2>
                ${bestGrowth?.outlet}
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>Worst Growth Outlet</h3>

            <h2>
                ${worstGrowth?.outlet}
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>Average Growth</h3>

            <h2>
                ${avgGrowth.toFixed(1)}%
            </h2>

        </div>

        <div class="revenue-kpi-card">

            <h3>
                ${category} Revenue
            </h3>

            <h2>
                ₹${(
                    totalRevenue26
                    /10000000
                ).toFixed(2)} Cr
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

                    ${rows.map(item=>`

                        <tr>

                            <td>
                                ${item.outlet}
                            </td>

                            <td>
                                ₹${(
                                    item.previous
                                    /10000000
                                ).toFixed(2)} Cr
                            </td>

                            <td>
                                ₹${(
                                    item.current
                                    /10000000
                                ).toFixed(2)} Cr
                            </td>

                            <td class="${
                                item.growth>=0
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
                ${category}
                Comparison

            </h2>

            <div class="chart-wrapper">

                <canvas
                id="categoryComparisonChart">
                </canvas>

            </div>

        </div>

    </div>

    `;

    createRevenueCategoryComparisonChart(
        rows,
        month,
        category
    );
}
function getCategoryComparisonData(
    sheet25,
    sheet26,
    category
){

    const data25 =
        getRevenueMixByOutlet(
            sheet25
        );

    const data26 =
        getRevenueMixByOutlet(
            sheet26
        );

    const keyMap = {

        "Food":"food",

        "Beverage":"beverage",

        "Liquor":"liquor",

        "Service Charge":"service"

    };

    const key =
        keyMap[category];

    return data26.map(current=>{

        const previous =
            data25.find(
                x=>
                x.outlet===
                current.outlet
            );

        const oldValue =
            previous?.[key] || 0;

        const currentValue =
            current[key] || 0;

        const growth =

            oldValue > 0

            ?

            (
                (
                    currentValue -
                    oldValue
                )

                /

                oldValue

            ) * 100

            :

            0;

        return {

            outlet:
                current.outlet,

            previous:
                oldValue,

            current:
                currentValue,

            growth

        };

    });

}
let revenueCategoryChart = null;

function createRevenueCategoryComparisonChart(
    rows,
    month,
    category
){

    const canvas =
        document.getElementById(
            "categoryComparisonChart"
        );

    if(!canvas) return;

    if(revenueCategoryChart){

        revenueCategoryChart.destroy();

    }

    revenueCategoryChart = new Chart(

        canvas,

        {

            type:"bar",

            data:{

                labels:
                    rows.map(
                        x => x.outlet
                    ),

                datasets:[

                    {

                        label:
                            `${month}-25`,

                        data:
                            rows.map(
                                x =>
                                x.previous
                                / 10000000
                            )

                    },

                    {

                        label:
                            `${month}-26`,

                        data:
                            rows.map(
                                x =>
                                x.current
                                / 10000000
                            )

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        labels:{

                            color:"white"

                        }

                    },

                    title:{

                        display:true,

                        text:
                            `${category} Revenue Comparison`,

                        color:"white"

                    }

                },

                scales:{

                    x:{

                        ticks:{

                            color:"white"

                        }

                    },

                    y:{

                        ticks:{

                            color:"white"

                        }

                    }

                }

            }

        }

    );

}