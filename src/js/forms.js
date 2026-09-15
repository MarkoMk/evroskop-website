document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");


    // Contact form does not exist on this page.
    if (!form || !status) {
        return;
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const submitButton =
            form.querySelector('button[type="submit"]');


        /*
         * -----------------------------------------------------
         * Browser validation
         * -----------------------------------------------------
         */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;
        }


        /*
         * -----------------------------------------------------
         * Convert form into JSON
         * -----------------------------------------------------
         */

        const formData = new FormData(form);

        const payload =
            Object.fromEntries(
                formData.entries()
            );


        /*
         * -----------------------------------------------------
         * Loading state
         * -----------------------------------------------------
         */

        status.className =
            "mt-5 rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700";

        status.textContent =
            "Sending your inquiry...";

        status.classList.remove("hidden");


        submitButton.disabled = true;

        submitButton.classList.add(
            "cursor-not-allowed",
            "opacity-60"
        );


        try {

            /*
             * -------------------------------------------------
             * Send inquiry to Express
             * -------------------------------------------------
             */

            const response =
                await fetch(
                    "/api/contact",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(payload)
                    }
                );


            /*
             * -------------------------------------------------
             * Read server response safely
             * -------------------------------------------------
             */

            let result = {};

            try {

                result =
                    await response.json();

            } catch {

                result = {};

            }


            /*
             * -------------------------------------------------
             * Server returned error
             * -------------------------------------------------
             */

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to send inquiry."
                );

            }


            /*
             * -------------------------------------------------
             * Success
             * -------------------------------------------------
             */

            status.className =
                "mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800";

            status.textContent =
                "Thank you. Your inquiry has been sent successfully.";


            form.reset();


        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );


            /*
             * -------------------------------------------------
             * Failure
             * -------------------------------------------------
             */

            status.className =
                "mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800";

            status.innerHTML =
                'We could not send your inquiry. ' +
                'Please contact us directly at ' +
                '<a href="mailto:evroskop@evroskop.com" ' +
                'class="font-bold underline">' +
                'evroskop@evroskop.com</a>.';


        } finally {

            /*
             * -------------------------------------------------
             * Restore button
             * -------------------------------------------------
             */

            submitButton.disabled = false;

            submitButton.classList.remove(
                "cursor-not-allowed",
                "opacity-60"
            );

        }

    });

});