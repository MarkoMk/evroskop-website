/*
 * ============================================================
 * CONTACT FORM CONTROLLER
 * ============================================================
 *
 * At the moment this validates and accepts the contact request.
 *
 * Actual email delivery will be connected later.
 * ============================================================
 */


const submitContactForm = async (req, res) => {

    try {

        const {
            inquiryType,
            name,
            company,
            email,
            phone,
            subject,
            message
        } = req.body;


        /*
         * ----------------------------------------------------
         * Required fields
         * ----------------------------------------------------
         */

        if (
            !inquiryType ||
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please complete all required fields."

            });

        }


        /*
         * ----------------------------------------------------
         * Basic email validation
         * ----------------------------------------------------
         */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email address."

            });

        }


        /*
         * ----------------------------------------------------
         * Log inquiry during development
         * ----------------------------------------------------
         */

        console.log("");
        console.log("======================================");
        console.log("NEW EVROSKOP WEBSITE INQUIRY");
        console.log("======================================");

        console.log("Inquiry type:", inquiryType);
        console.log("Name:", name);
        console.log("Company:", company || "-");
        console.log("Email:", email);
        console.log("Phone:", phone || "-");
        console.log("Subject:", subject);

        console.log("--------------------------------------");

        console.log("Message:");
        console.log(message);

        console.log("======================================");
        console.log("");


        /*
         * ----------------------------------------------------
         * Success
         * ----------------------------------------------------
         */

        return res.status(200).json({

            success: true,

            message:
                "Your inquiry has been received."

        });


    } catch (error) {

        console.error(
            "Contact form controller error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "An unexpected server error occurred."

        });

    }

};


module.exports = {
    submitContactForm
};