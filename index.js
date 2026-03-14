export default {
    name: "ValidUserFix",

    start() {
        console.log("ValidUserFix started");

        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const res = await originalFetch(...args);

            try {
                const url = args[0];

                if (typeof url === "string" && url.includes("/users/")) {
                    const clone = res.clone();
                    const data = await clone.json();

                    if (data?.id && data?.username) {
                        console.log("Fetched user:", data.username);
                    }
                }
            } catch (e) {}

            return res;
        };
    },

    stop() {
        console.log("ValidUserFix stopped");
    }
};
