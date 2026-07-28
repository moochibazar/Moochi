const Sheet = {


    // دریافت همه مشتری‌ها
    getCustomers() {

        return api(
            "read",
            "Customers"
        );

    },



    // ثبت مشتری جدید
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


    }



};
