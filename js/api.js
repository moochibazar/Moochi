async function apiRequest(action, data = {}) {

    const response = await fetch(CONFIG.WEB_APP_URL, {

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

}
