function formatCrores(value) {

    if (!value || isNaN(value)) {
        return "₹0.00 Cr";
    }

    return "₹" +
        (Number(value) / 10000000).toFixed(2) +
        " Cr";

}