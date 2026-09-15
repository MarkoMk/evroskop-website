document.addEventListener("DOMContentLoaded", () => {

    const robots = window.ROBOT_PRODUCTS || [];


    // =====================================================
    // OFFICIAL ESTUN INFORMATION SHEETS
    //
    // These are ONLY used on the opened product page.
    // They DO NOT affect catalogue preview images.
    // =====================================================

    const INFO_SHEET_BY_MODEL = {

        "ER7-910-MI-PI-C":
            "/images/ESTUN/ER7-910-MI-PI-C.jpg",

        "ER7-910-MI":
            "/images/ESTUN/ER7-910-MI.jpg",

        "ER8-720-MI":
            "/images/ESTUN/ER8-720-MI.jpg",

        "ER3-400-SR":
            "/images/ESTUN/ER3-400-SR.jpg",

        "ER10-600-SR":
            "/images/ESTUN/ER10-600-SR.jpg",

        "ER10-700-SR":
            "/images/ESTUN/ER10-700-SR.jpg",


        "ER20/10-2000-HI":
            "/images/ESTUN/ER20-10-2000-HI.jpg",

        "ER20-2300-HI":
            "/images/ESTUN/ER20-2300-HI.jpg",


        "ER270-2850":
            "/images/ESTUN/ER270-2850.jpg",

        "ER280-3200":
            "/images/ESTUN/ER280-3200.jpg",


        "ER350-3300":
            "/images/ESTUN/ER350-3300.jpg",

        "ER350-3300-5":
            "/images/ESTUN/ER350-3300-5.jpg",

        "ER500-2800":
            "/images/ESTUN/ER500-2800.jpg",


        "UNO-220-3100-HR":
            "/images/ESTUN/UNO-220-3100-HR.jpg",


        "S3-60 Eco":
            "/images/ESTUN/S3-60 Eco.png",

        "S3-60 Pro":
            "/images/ESTUN/S3-60 Pro.png",

        "S5-90 Pro":
            "/images/ESTUN/S5-90 Pro.png",


        "ER50B-2100-F":
            "/images/ESTUN/ER50B-2100-F.jpg",


        "ER45-2200-BD":
            "/images/ESTUN/ER45-2200-BD.jpg",

        "ER80B-2565-BD":
            "/images/ESTUN/ER80B-2565-BD.jpg",

        "ER130-2865-BD":
            "/images/ESTUN/ER130-2865-BD.jpg",


        "ER60-2000-PL":
            "/images/ESTUN/ER60-2000-PL.jpg",

        "ER120-2400-PL":
            "/images/ESTUN/ER120-2400-PL.jpg",


        "ER15-1520-PR":
            "/images/ESTUN/ER15-1520-PR.jpg",


        "QE Arc Welding Cell":
            "/images/ESTUN/QE Arc Welding Cell.jpg",

        "QWAS Arc Welding Cell":
            "/images/ESTUN/QWAS Arc Welding Cell.jpg",

        "EWAS Arc Welding Cell":
            "/images/ESTUN/EWAS Arc Welding Cell.jpg"
    };


    // =====================================================
    // FIND PRODUCT
    // =====================================================

    const slug = window.location.pathname
        .split("/")
        .filter(Boolean)
        .pop();


    const robot = robots.find(
        (item) => item.slug === slug
    );


    if (!robot) {

        document.querySelector("main").innerHTML = `
            <section
                class="mx-auto max-w-4xl
                       px-6 py-32 text-center"
            >

                <p
                    class="text-sm font-bold uppercase
                           tracking-[0.2em]
                           text-evroskop-blue"
                >
                    Product Not Found
                </p>

                <h1
                    class="mt-4 text-4xl font-bold
                           text-evroskop-dark"
                >
                    Robot not found.
                </h1>

                <p class="mt-4 text-gray-600">
                    The requested ESTUN product could not be found.
                </p>

                <a
                    href="/robotics"
                    class="mt-8 inline-flex
                           rounded-lg
                           bg-evroskop-dark
                           px-6 py-3
                           font-semibold text-white
                           transition
                           hover:bg-evroskop-blue"
                >
                    Back to Robotics
                </a>

            </section>
        `;

        return;
    }


    // =====================================================
    // HELPERS
    // =====================================================

    function displayValue(value, unit = "") {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return unit
            ? `${value} ${unit}`
            : String(value);
    }


    function productCategory(product) {

        if (product.subseriesLabel) {
            return product.subseriesLabel;
        }

        if (product.seriesLabel) {
            return product.seriesLabel;
        }

        return product.familyLabel || "ESTUN Robotics";
    }


    // =====================================================
    // PAGE INFORMATION
    // =====================================================

    document.title =
        `${robot.model} | ESTUN Robotics | Evroskop Group`;


    const breadcrumb =
        document.getElementById("breadcrumb-model");

    const category =
        document.getElementById("robot-category");

    const model =
        document.getElementById("robot-model");

    const shortDescription =
        document.getElementById(
            "robot-short-description"
        );

    const description =
        document.getElementById(
            "robot-description"
        );

    const payload =
        document.getElementById("robot-payload");

    const reach =
        document.getElementById("robot-reach");

    const axes =
        document.getElementById("robot-axes");

    const overview =
        document.getElementById("robot-overview");

    const quote =
        document.getElementById("robot-quote");

    const datasheet =
        document.getElementById("robot-datasheet");


    if (breadcrumb) {
        breadcrumb.textContent = robot.model;
    }

    if (category) {
        category.textContent =
            productCategory(robot);
    }

    if (model) {
        model.textContent = robot.model;
    }

    if (shortDescription) {
        shortDescription.textContent =
            robot.shortDescription || "";
    }


    const generatedDescription =
        robot.description ||
        `${robot.model} is part of the ESTUN ${productCategory(
            robot
        )} range. Evroskop provides robot selection, application engineering, integration, programming, tooling, commissioning, and technical support.`;


    if (description) {
        description.textContent =
            generatedDescription;
    }

    if (overview) {
        overview.textContent =
            generatedDescription;
    }


    if (payload) {
        payload.textContent =
            displayValue(
                robot.payload,
                robot.payload !== null &&
                robot.payload !== undefined
                    ? "kg"
                    : ""
            );
    }


    if (reach) {
        reach.textContent =
            displayValue(
                robot.reach,
                robot.reach !== null &&
                robot.reach !== undefined
                    ? "mm"
                    : ""
            );
    }


    if (axes) {
        axes.textContent =
            displayValue(robot.axes);
    }


    // =====================================================
    // QUOTE
    // =====================================================

    if (quote) {

        quote.href =
            `mailto:marko.markovski@evroskop.com?subject=${encodeURIComponent(
                `${robot.model} Robot Inquiry`
            )}`;
    }


    // =====================================================
    // DATASHEET
    // =====================================================

    if (datasheet && robot.datasheet) {

        datasheet.href =
            robot.datasheet;

        datasheet.classList.remove(
            "hidden"
        );

        datasheet.classList.add(
            "inline-flex"
        );
    }


    // =====================================================
    // PREVIEW / PRODUCT GALLERY
    //
    // THIS USES robot.images.
    // Your ESTUN specification sheet is NOT used here.
    // =====================================================

    const images =
        robot.images || [];


    const mainImage =
        document.getElementById(
            "robot-main-image"
        );

    const thumbnails =
        document.getElementById(
            "robot-thumbnails"
        );

    const previous =
        document.getElementById(
            "gallery-previous"
        );

    const next =
        document.getElementById(
            "gallery-next"
        );


    let currentImage = 0;


    function showImage(index) {

        if (!images.length || !mainImage) {
            return;
        }


        currentImage =
            (index + images.length) %
            images.length;


        mainImage.src =
            images[currentImage];


        mainImage.alt =
            `${robot.model} product image ${currentImage + 1}`;


        if (thumbnails) {

            thumbnails
                .querySelectorAll("button")
                .forEach(
                    (button, buttonIndex) => {

                        button.classList.toggle(
                            "border-evroskop-blue",
                            buttonIndex === currentImage
                        );

                        button.classList.toggle(
                            "border-gray-200",
                            buttonIndex !== currentImage
                        );
                    }
                );
        }
    }


    if (thumbnails) {

        thumbnails.innerHTML = "";


        images.forEach(
            (image, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type = "button";


                button.className = `
                    aspect-square w-20
                    shrink-0 overflow-hidden
                    rounded-xl border-2
                    bg-gray-50 transition
                    ${
                        index === 0
                            ? "border-evroskop-blue"
                            : "border-gray-200"
                    }
                `;


                button.setAttribute(
                    "aria-label",
                    `Show ${robot.model} image ${index + 1}`
                );


                button.innerHTML = `
                    <img
                        src="${image}"
                        alt=""
                        class="h-full w-full
                               object-contain p-1"
                    >
                `;


                button.addEventListener(
                    "click",
                    () => {
                        showImage(index);
                    }
                );


                thumbnails.appendChild(
                    button
                );
            }
        );
    }


    previous?.addEventListener(
        "click",
        () => {
            showImage(
                currentImage - 1
            );
        }
    );


    next?.addEventListener(
        "click",
        () => {
            showImage(
                currentImage + 1
            );
        }
    );


    if (images.length) {
        showImage(0);
    }


    // Hide gallery arrows if there is only one image.
    if (images.length <= 1) {

        previous?.classList.add(
            "hidden"
        );

        next?.classList.add(
            "hidden"
        );
    }


    // =====================================================
    // OFFICIAL ESTUN INFORMATION SHEET
    //
    // THIS IS THE NEW PART.
    // =====================================================

    const infoSection =
        document.getElementById(
            "estun-info-section"
        );

    const infoImage =
        document.getElementById(
            "estun-info-image"
        );

    const infoModel =
        document.getElementById(
            "estun-info-model"
        );


    const infoSheet =
        robot.infoSheet ||
        INFO_SHEET_BY_MODEL[
            robot.model
        ] ||
        null;


    if (
        infoSheet &&
        infoSection &&
        infoImage
    ) {

        infoImage.src =
            infoSheet;


        infoImage.alt =
            `${robot.model} official ESTUN product information`;


        if (infoModel) {
            infoModel.textContent =
                robot.model;
        }


        infoSection.classList.remove(
            "hidden"
        );

    } else if (infoSection) {

        infoSection.classList.add(
            "hidden"
        );
    }


    // =====================================================
    // ADVANTAGES
    // =====================================================

    const advantages =
        document.getElementById(
            "robot-advantages"
        );


    if (advantages) {

        advantages.innerHTML = "";


        (robot.advantages || [])
            .forEach(
                (advantage) => {

                    const item =
                        document.createElement(
                            "li"
                        );


                    item.className =
                        "flex items-start gap-3 text-sm text-gray-600";


                    item.innerHTML = `
                        <span
                            class="mt-0.5 flex h-5 w-5
                                   shrink-0 items-center
                                   justify-center
                                   rounded-full
                                   bg-evroskop-blue/10
                                   text-xs font-bold
                                   text-evroskop-blue"
                            aria-hidden="true"
                        >
                            ✓
                        </span>

                        <span>
                            ${advantage}
                        </span>
                    `;


                    advantages.appendChild(
                        item
                    );
                }
            );
    }


    // =====================================================
    // TECHNICAL SPECIFICATIONS
    // =====================================================

    const specifications =
        document.getElementById(
            "robot-specifications"
        );


    if (specifications) {

        specifications.innerHTML = "";


        Object.entries(
            robot.specifications || {}
        ).forEach(
            ([label, value]) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className = `
                    grid
                    grid-cols-[0.9fr_1.1fr]
                    border-b border-gray-200
                    last:border-b-0
                `;


                row.innerHTML = `
                    <div
                        class="bg-gray-50
                               px-5 py-4
                               text-sm font-medium
                               text-gray-600"
                    >
                        ${label}
                    </div>

                    <div
                        class="px-5 py-4
                               text-sm font-semibold
                               text-evroskop-dark"
                    >
                        ${
                            value ??
                            "—"
                        }
                    </div>
                `;


                specifications.appendChild(
                    row
                );
            }
        );
    }


    // =====================================================
    // APPLICATIONS
    // =====================================================

    const applications =
        document.getElementById(
            "robot-applications"
        );


    if (applications) {

        applications.innerHTML = "";


        (robot.applications || [])
            .forEach(
                (application) => {

                    const element =
                        document.createElement(
                            "span"
                        );


                    element.className = `
                        rounded-full
                        border border-gray-200
                        bg-white
                        px-4 py-2
                        text-sm font-medium
                        text-gray-700
                    `;


                    element.textContent =
                        application;


                    applications.appendChild(
                        element
                    );
                }
            );
    }

});