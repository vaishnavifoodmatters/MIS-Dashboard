let quarterChart = null;
let outletChart = null;
let revenueMixChart = null;

/* ==========================
   REVENUE MIX CHART
========================== */
function createRevenueMixChart() {

    const canvas =
        document.getElementById(
            "revenueMixChart"
        );

    if (!canvas) return;

    const mix =
        window.dashboardData?.fy2627?.revenueMix;

    if (!mix) return;

    if (revenueMixChart) {
        revenueMixChart.destroy();
    }

    revenueMixChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Food",
                "Beverage",
                "Liquor",
                "Service Charge",
                "Scrap"

            ],

            datasets: [{

                data: [

                    mix.food || 0,
                    mix.beverage || 0,
                    mix.liquor || 0,
                    mix.service || 0,
                    mix.scrap || 0

                ],

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "white",

                        font: {

                            size: 12

                        }

                    }

                },

                datalabels: {

                    color: "Black",

                    anchor: "center",

                    align: "center",

                    font: {

                        weight: "bold",

                        size: 11

                    },

                    formatter: (value) => {

                        if (!value) return "";

                        if (value < 1000000) {

                            return "₹" +
                                value.toLocaleString();

                        }

                        return "₹" +
                            (value / 10000000)
                            .toFixed(2) +
                            " Cr";

                    }

                }

            }

        },

        plugins: [

            ChartDataLabels

        ]

    });

}
/* ==========================
   QUARTER REVENUE CHART
========================== */

function createQuarterRevenueChart() {

    const canvas =
        document.getElementById("quarterRevenueChart");

    if (!canvas) return;

    const data =
        window.dashboardData?.fy2627;

    if (!data?.quarterRevenue) return;

    if (quarterChart) {
        quarterChart.destroy();
    }

    const ctx =
        canvas.getContext("2d");

    quarterChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Q1",
                "Q2",
                "Q3",
                "Q4"
            ],

            datasets: [{

                label: "Revenue (Cr)",

                data:
                    data.quarterRevenue.map(
                        x => (x / 10000000).toFixed(2)
                    ),

                borderRadius: 8

            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {
                        color: "white"
                    }
                }
            },

            scales: {

                x: {

                    ticks: {
                        color: "white"
                    },

                    grid: {
                        color: "#334155"
                    }
                },

                y: {

                    beginAtZero: true,

                    ticks: {
                        color: "white"
                    },

                    grid: {
                        color: "#334155"
                    }
                }
            }
        }
    });

}

/* ==========================
   OUTLET REVENUE CHART
========================== */

function createOutletRevenueChart() {

    const canvas =
        document.getElementById("outletRevenueChart");

    if (!canvas) return;

    const outlets =
        window.dashboardData?.fy2627?.outletRanking;

    if (!outlets || !outlets.length)
        return;

    if (outletChart) {
        outletChart.destroy();
    }

    const top5 =
        outlets.slice(0, 5);

    outletChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels:
                top5.map(x => x.outlet),

            datasets: [{

                label: "Revenue (Cr)",

                data:
                    top5.map(
                        x => (x.revenue / 10000000).toFixed(2)
                    ),

                borderRadius: 8

            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {
                        color: "white"
                    }
                }
            },

            scales: {

                x: {

                    ticks: {
                        color: "white"
                    },

                    grid: {
                        color: "#334155"
                    }
                },

                y: {

                    beginAtZero: true,

                    ticks: {
                        color: "white"
                    },

                    grid: {
                        color: "#334155"
                    }
                }
            }
        }
    });

}

let revenueCategoryChart = null;

function createRevenueCategoryChart() {

    const canvas =
        document.getElementById(
            "revenueCategoryChart"
        );

    if (!canvas) return;

    if (revenueCategoryChart) {

        revenueCategoryChart.destroy();

    }

    const fy2526 =
        window.dashboardData.fy2526.revenueMix;

    const fy2627 =
        window.dashboardData.fy2627.revenueMix;

    revenueCategoryChart =
    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Food",
                "Beverage",
                "Liquor",
                "Service Charge",
                "Scrap"

            ],

            datasets: [

                {

                    label:"FY25-26",

                    data:[

                        fy2526.food,
                        fy2526.beverage,
                        fy2526.liquor,
                        fy2526.service,
                        fy2526.scrap

                    ]

                },

                {

                    label:"FY26-27",

                    data:[

                        fy2627.food,
                        fy2627.beverage,
                        fy2627.liquor,
                        fy2627.service,
                        fy2627.scrap

                    ]

                }

            ]
        },

        options: {

            responsive:true,

            maintainAspectRatio:false,

            plugins: {

                legend: {

                    labels: {
                        color:"white"
                    }
                }
            },

            scales: {

                x: {

                    ticks: {
                        color:"white"
                    }
                },

                y: {

                    ticks: {
                        color:"white"
                    }
                }
            }
        }
    });

}
let revenueComparisonChart = null;

function createRevenueComparisonChart() {

    const canvas =
        document.getElementById(
            "revenueComparisonChart"
        );

    if (!canvas) return;

    if (revenueComparisonChart) {

        revenueComparisonChart.destroy();

    }

    revenueComparisonChart =
    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "FY25-26",
                "FY26-27"

            ],

            datasets: [{

                label: "Revenue",

                data: [

                    window.dashboardData
                    .fy2526.revenue,

                    window.dashboardData
                    .fy2627.revenue

                ]

            }]
        }

    });

}
let quarterComparisonChart = null;

function createQuarterComparisonChart() {

    const canvas =
        document.getElementById(
            "quarterComparisonChart"
        );

    if (!canvas) return;

    const fy2526 =
        window.dashboardData
        .fy2526
        .quarterRevenue;

    const fy2627 =
        window.dashboardData
        .fy2627
        .quarterRevenue;

    if (quarterComparisonChart) {
        quarterComparisonChart.destroy();
    }

    quarterComparisonChart =
    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [
                "Q1",
                "Q2",
                "Q3",
                "Q4"
            ],

            datasets: [

                {
                    label: "FY25-26",

                    data:
                        fy2526.map(
                            x => x / 10000000
                        )
                },

                {
                    label: "FY26-27",

                    data:
                        fy2627.map(
                            x => x / 10000000
                        )
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {
                        color: "white"
                    }

                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "white"
                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {
                        color: "white"
                    }

                }

            }

        }

    });

}
let outletComparisonChart = null;

function createOutletComparisonChart(
    rows,
    month
) {

    const canvas =

        document.getElementById(
            "outletComparisonChart"
        );

    if (!canvas) return;

    if (outletComparisonChart) {

        outletComparisonChart.destroy();

    }

    outletComparisonChart =
    new Chart(canvas, {

        type: "bar",

        data: {

            labels:
                rows.map(
                    x => x.outlet
                ),

            datasets: [

                {

                    label:
                        `${month}-25`,

                    data:
                        rows.map(
                            x =>
                            x.fy25
                            / 10000000
                        )

                },

                {

                    label:
                        `${month}-26`,

                    data:
                        rows.map(
                            x =>
                            x.fy26
                            / 10000000
                        )

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "white"

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "white"

                    }

                }

            }

        }

    });

}