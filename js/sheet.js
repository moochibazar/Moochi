const Sheet = {

    getCustomers() {

        return api("read", "Customers");

    },

    addCustomer(customerName, mochiPrice) {

        return api("write", "Customers", [

            crypto.randomUUID(),

            customerName,

            "MC" + Date.now(),

            Number(mochiPrice),

            new Date().toISOString()

        ]);

    }

};
