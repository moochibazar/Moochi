async function apiRequest(action, data = {}) {

    try {

        const response = await fetch(CONFIG.WEB_APP_URL, {

            method: "POST",

            body: JSON.stringify({

                action: action,

                ...data

            })

        });


        const result = await response.json();

        return result;


    } catch (error) {

        console.error("API Error:", error);

        return {

            success:false,

            message:error.message

        };

    }

}
