const Sheet = {


    addCustomer(customerName, mochiPrice) {


        return api(
            "write",
            "Customers",
            [

                crypto.randomUUID(),

                customerName,

                "MC" + Date.now(),

                Number(mochiPrice),

                new Date().toLocaleString("fa-IR")

            ]

        );


    },



    getCustomers() {


        return api(
            "read",
            "Customers"
        );


    }


};
