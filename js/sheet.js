const Sheet = {


    // دریافت مشتری‌ها
    getCustomers() {

        return api(
            "read",
            "Customers"
        );

    },



    // ثبت مشتری
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



    // ویرایش مشتری
    updateCustomer(rowNumber, customerName, mochiPrice) {


        return api(
            "update",
            "Customers",
            {

                row: rowNumber,

                data: [

                    customerName,

                    Number(mochiPrice)

                ]

            }
        );


    },



    // حذف مشتری
    deleteCustomer(rowNumber) {


        return api(
            "delete",
            "Customers",
            {

                row: rowNumber

            }
        );


    },




    // دریافت سفارش‌ها
    getOrders() {

        return api(
            "read",
            "Orders"
        );

    },




    // ثبت سفارش
    addOrder(customerId, quantity, price) {


        const total =
        Number(quantity) * Number(price);



        return api(
            "write",
            "Orders",
            [

                crypto.randomUUID(),

                customerId,

                Number(quantity),

                Number(price),

                total,

                new Date().toLocaleString("fa-IR")

            ]
        );


    }



};
