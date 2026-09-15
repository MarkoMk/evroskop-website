document.addEventListener("DOMContentLoaded", () => {
    const products = window.ROBOT_PRODUCTS || [];

    const grid = document.getElementById("robot-grid");
    const filterButtons = document.querySelectorAll("[data-robot-filter]");
    const searchInput = document.getElementById("robot-search");

    if (!grid) {
        return;
    }

    let activeFilter = "all";
    let searchTerm = "";


    // =====================================================
    // CREATE PRODUCT CARD
    // =====================================================

    function createRobotCard(robot) {
        const article = document.createElement("article");

        article.className = `
            group overflow-hidden rounded-2xl
            border border-gray-200 bg-white
            shadow-sm transition duration-300
            hover:-translate-y-1 hover:shadow-lg
        `;


        // =================================================
        // CATALOGUE THUMBNAIL
        // =================================================
        //
        // robot.thumbnail = /robotics catalogue image
        // robot.images    = individual product-page images
        //
        // If no dedicated thumbnail exists, use the
        // original ESTUN placeholder.
        // =================================================

        const previewImage =
            robot.thumbnail ||
            "/images/hero-estun-robotics.jpeg";


        const categoryLabel =
            robot.subseriesLabel ||
            robot.seriesLabel ||
            robot.familyLabel ||
            "ESTUN";


        article.innerHTML = `
            <div
                class="relative aspect-[4/3]
                       overflow-hidden bg-gray-50"
            >

                <img
                    src="${previewImage}"
                    alt="${robot.model}"
                    class="robot-preview-image
                           h-full w-full
                           object-contain p-6
                           transition duration-500
                           group-hover:scale-[1.03]"
                >


                <span
                    class="absolute bottom-4 left-4
                           rounded-full
                           border border-evroskop-blue/20
                           bg-white/95
                           px-3 py-1.5
                           text-xs font-bold uppercase
                           tracking-[0.12em]
                           text-evroskop-blue"
                >
                    ${categoryLabel}
                </span>

            </div>


            <div class="p-6">

                <p
                    class="text-xs font-bold uppercase
                           tracking-[0.16em]
                           text-evroskop-blue"
                >
                    ${robot.brand}
                </p>


                <h3
                    class="mt-2 text-2xl font-bold
                           text-evroskop-dark"
                >
                    ${robot.model}
                </h3>


                <p
                    class="mt-3 min-h-[48px]
                           text-sm leading-6
                           text-gray-600"
                >
                    ${robot.shortDescription}
                </p>


                <div
                    class="mt-6 grid grid-cols-3
                           divide-x divide-gray-200
                           border-y border-gray-200
                           py-4 text-center"
                >

                    <div>

                        <p
                            class="font-bold
                                   text-evroskop-dark"
                        >
                            ${
                                robot.payload !== null &&
                                robot.payload !== undefined
                                    ? `${robot.payload} ${robot.payloadUnit || "kg"}`
                                    : "—"
                            }
                        </p>

                        <p
                            class="mt-1 text-[11px]
                                   uppercase tracking-wide
                                   text-gray-500"
                        >
                            Payload
                        </p>

                    </div>


                    <div>

                        <p
                            class="font-bold
                                   text-evroskop-dark"
                        >
                            ${
                                robot.reach !== null &&
                                robot.reach !== undefined
                                    ? `${robot.reach} ${robot.reachUnit || "mm"}`
                                    : "—"
                            }
                        </p>

                        <p
                            class="mt-1 text-[11px]
                                   uppercase tracking-wide
                                   text-gray-500"
                        >
                            Reach
                        </p>

                    </div>


                    <div>

                        <p
                            class="font-bold
                                   text-evroskop-dark"
                        >
                            ${
                                robot.axes !== null &&
                                robot.axes !== undefined
                                    ? robot.axes
                                    : "—"
                            }
                        </p>

                        <p
                            class="mt-1 text-[11px]
                                   uppercase tracking-wide
                                   text-gray-500"
                        >
                            Axes
                        </p>

                    </div>

                </div>


                <a
                    href="/robotics/${robot.slug}"
                    class="mt-6 inline-flex
                           items-center gap-2
                           font-semibold
                           text-evroskop-dark
                           transition
                           group-hover:text-evroskop-blue"
                >
                    ${
                        robot.productType === "robot"
                            ? "View Robot"
                            : "View Product"
                    }

                    <span aria-hidden="true">
                        →
                    </span>
                </a>

            </div>
        `;


        // =================================================
        // IMAGE ERROR FALLBACK
        // =================================================
        //
        // If one of the thumbnail filenames ever becomes
        // invalid, fall back to the ESTUN placeholder
        // instead of showing a broken-image icon.
        // =================================================

        const preview =
            article.querySelector(".robot-preview-image");


        preview.addEventListener("error", () => {

            if (
                preview.src.endsWith(
                    "/images/hero-estun-robotics.jpeg"
                )
            ) {
                return;
            }

            console.warn(
                `Thumbnail failed for ${robot.model}:`,
                preview.src
            );

            preview.src =
                "/images/hero-estun-robotics.jpeg";
        });


        return article;
    }


    // =====================================================
    // RENDER PRODUCTS
    // =====================================================

    function renderRobots() {
        grid.innerHTML = "";

        const normalizedSearch =
            searchTerm.toLowerCase();


        const filtered = products.filter((robot) => {

            const matchesFilter =
                activeFilter === "all" ||
                robot.family === activeFilter ||
                robot.category === activeFilter;


            const searchableText = [
                robot.model,
                robot.brand,
                robot.familyLabel,
                robot.seriesLabel,
                robot.subseriesLabel,
                robot.shortDescription
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                searchableText.includes(
                    normalizedSearch
                );


            return (
                matchesFilter &&
                matchesSearch
            );
        });


        // =================================================
        // NO RESULTS
        // =================================================

        if (!filtered.length) {

            grid.innerHTML = `
                <div
                    class="col-span-full
                           rounded-2xl
                           border border-gray-200
                           bg-white
                           p-12 text-center"
                >

                    <h3
                        class="text-xl font-bold
                               text-evroskop-dark"
                    >
                        No products found.
                    </h3>

                    <p class="mt-2 text-gray-500">
                        Try another category or search term.
                    </p>

                </div>
            `;

            return;
        }


        // =================================================
        // CREATE CARDS
        // =================================================

        filtered.forEach((robot) => {

            grid.appendChild(
                createRobotCard(robot)
            );

        });
    }


    // =====================================================
    // FILTER BUTTON STYLING
    // =====================================================

    function updateFilterStyles(
        selectedButton
    ) {

        filterButtons.forEach((button) => {

            const active =
                button === selectedButton;


            button.classList.toggle(
                "bg-evroskop-dark",
                active
            );

            button.classList.toggle(
                "text-white",
                active
            );


            button.classList.toggle(
                "bg-white",
                !active
            );

            button.classList.toggle(
                "text-gray-600",
                !active
            );

            button.classList.toggle(
                "border",
                !active
            );

            button.classList.toggle(
                "border-gray-300",
                !active
            );

        });
    }


    // =====================================================
    // FILTER BUTTON EVENTS
    // =====================================================

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                activeFilter =
                    button.dataset.robotFilter ||
                    button.dataset.family ||
                    "all";


                updateFilterStyles(
                    button
                );


                renderRobots();

            }
        );

    });


    // =====================================================
    // SEARCH
    // =====================================================

    searchInput?.addEventListener(
        "input",
        () => {

            searchTerm =
                searchInput.value.trim();


            renderRobots();

        }
    );


    // =====================================================
    // INITIAL RENDER
    // =====================================================

    renderRobots();
});