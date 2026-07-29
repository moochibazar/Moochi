const WAGE_ONE = 5000;
const WAGE_TWO = 10000;

async function calculateWages() {
    try {
        const orders = await Sheet.getOrders();

        let totalMochi = 0;

        orders.forEach(order => {
            const qty = Number(order.quantity || order.qty || order.count || 0);
            totalMochi += qty;
        });

        return {
            totalMochi,
            wageOne: totalMochi * WAGE_ONE,
            wageTwo: totalMochi * WAGE_TWO
        };
    } catch (err) {
        console.error(err);
        return {
            totalMochi: 0,
            wageOne: 0,
            wageTwo: 0
        };
    }
}
