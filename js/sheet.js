const Sheet = {

    api: CONFIG.WEB_APP_URL,

    async request(action, data = {}) {

        try {

            const response = await fetch(this.api, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    action,

                    ...data

                })

            });

            return await response.json();

        } catch (error) {

            console.error(error);

            return {
                success: false,
                message: error.message
            };

        }

    },

    // مشتری جدید
    addCustomer(customer){

        return this.request("addCustomer", customer);

    },

    // دریافت مشتری‌ها
    getCustomers(){

        return this.request("getCustomers");

    },

    // ثبت سفارش
    addOrder(order){

        return this.request("addOrder", order);

    },

    // ثبت پرداخت
    addPayment(payment){

        return this.request("addPayment", payment);

    },

    // دریافت اطلاعات مشتری
    getCustomer(code){

        return this.request("getCustomer",{

            code

        });

    }

};
