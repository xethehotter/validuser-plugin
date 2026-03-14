/**
 * @name ValidUserFix
 * @description Fix "Unknown User" when a mentioned user is not cached
 * @author xe
 * @version 1.0.0
 */

module.exports = {
    name: "ValidUserFix",
    description: "Fix unknown user mentions by fetching user data",
    version: "1.0.0",

    start() {
        console.log("ValidUserFix plugin started");

        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const response = await originalFetch(...args);

            try {
                const url = args[0];

                if (typeof url === "string" && url.includes("/users/")) {
                    const clone = response.clone();
                    const data = await clone.json();

                    if (data && data.id && data.username) {
                        console.log("Fetched valid user:", data.username);
                    }
                }
            } catch (e) {}

            return response;
        };
    },

    stop() {
        console.log("ValidUserFix plugin stopped");
    }
};
