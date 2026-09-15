document.addEventListener("DOMContentLoaded", () => {

    const products =
        window.SHEET_METAL_PRODUCTS || [];


    const grid =
        document.getElementById("machine-grid");


    const filters =
        document.querySelectorAll(
            "[data-machine-category]"
        );


    const searchInput =
        document.getElementById(
            "machine-search"
        );


    if (!grid) {
        return;
    }


    let activeCategory = "all";
    let searchTerm = "";


    // =====================================================
    // SAFE DISPLAY VALUE
    // =====================================================

    function safeValue(value) {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return value;
    }


    // =====================================================
    // CREATE MACHINE CARD
    // =====================================================

    function createCard(machine) {

        const article =
            document.createElement("article");


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
        // machine.thumbnail
        //     = image shown on /sheet-metal
        //
        // machine.images
        //     = images shown on individual machine page
        //
        // These are intentionally separate.
        // =================================================

        const previewImage =
            machine.thumbnail ||
            "/images/hero-durma-robot.png";


        const specs =
            Object.entries(
                machine.keySpecs || {}
            ).slice(0, 3);


        article.innerHTML = `

            <div
                class="relative aspect-[4/3]
                       overflow-hidden bg-gray-50"
            >

                <img
                    src="${previewImage}"
                    alt="${machine.model}"
                    class="machine-preview-image
                           h-full w-full
                           object-contain p-6
                           transition duration-500
                           group-hover:scale-[1.04]"
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
                    ${machine.categoryLabel}
                </span>

            </div>


            <div class="p-6">

                <p
                    class="text-xs font-bold uppercase
                           tracking-[0.16em]
                           text-evroskop-blue"
                >
                    ${machine.brand || "DURMA"}
                </p>


                <h3
                    class="mt-2 text-2xl font-bold
                           text-evroskop-dark"
                >
                    ${machine.model}
                </h3>


                <p
                    class="mt-3 min-h-[48px]
                           text-sm leading-6
                           text-gray-600"
                >
                    ${machine.shortDescription}
                </p>


                <div
                    class="mt-6 grid grid-cols-3
                           divide-x divide-gray-200
                           border-y border-gray-200
                           py-4 text-center"
                >

                    ${specs.map(
                        ([label, value]) => `
                            <div class="px-2">

                                <p
                                    class="font-bold
                                           text-evroskop-dark"
                                >
                                    ${safeValue(value)}
                                </p>

                                <p
                                    class="mt-1
                                           text-[10px]
                                           uppercase
                                           tracking-wide
                                           text-gray-500"
                                >
                                    ${label}
                                </p>

                            </div>
                        `
                    ).join("")}

                </div>


                <a
                    href="/sheet-metal/${machine.slug}"
                    class="mt-6 inline-flex
                           items-center gap-2
                           font-semibold
                           text-evroskop-dark
                           transition
                           group-hover:text-evroskop-blue"
                >
                    View Machine

                    <span aria-hidden="true">
                        →
                    </span>
                </a>

            </div>
        `;


        // =================================================
        // BROKEN THUMBNAIL FALLBACK
        // =================================================

        const image =
            article.querySelector(
                ".machine-preview-image"
            );


        image?.addEventListener(
            "error",
            () => {

                const fallback =
                    "/images/hero-durma-robot.png";


                if (
                    image.getAttribute("src") ===
                    fallback
                ) {
                    return;
                }


                console.warn(
                    `Thumbnail failed for ${machine.model}:`,
                    image.getAttribute("src")
                );


                image.src = fallback;

            }
        );


        return article;
    }


    // =====================================================
    // RENDER PRODUCTS
    // =====================================================

    function renderProducts() {

        grid.innerHTML = "";


        const search =
            searchTerm.toLowerCase();


        const filtered =
            products.filter((machine) => {

                const categoryMatch =
                    activeCategory === "all" ||
                    machine.category ===
                        activeCategory;


                const searchable = `
                    ${machine.model || ""}
                    ${machine.brand || ""}
                    ${machine.categoryLabel || ""}
                    ${machine.shortDescription || ""}
                `.toLowerCase();


                const searchMatch =
                    searchable.includes(search);


                return (
                    categoryMatch &&
                    searchMatch
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
                           bg-white p-12
                           text-center"
                >

                    <h3
                        class="text-xl font-bold
                               text-evroskop-dark"
                    >
                        No machines found.
                    </h3>


                    <p
                        class="mt-2 text-gray-500"
                    >
                        Try another category
                        or search term.
                    </p>

                </div>
            `;


            return;
        }


        // =================================================
        // CREATE CARDS
        // =================================================

        filtered.forEach((machine) => {

            grid.appendChild(
                createCard(machine)
            );

        });

    }


    // =====================================================
    // FILTER STYLING
    // =====================================================

    function updateFilters(
        selectedButton
    ) {

        filters.forEach((button) => {

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
    // FILTER EVENTS
    // =====================================================

    filters.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                activeCategory =
                    button.dataset.machineCategory;


                updateFilters(button);


                renderProducts();

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


            renderProducts();

        }
    );


    // =====================================================
    // INITIAL RENDER
    // =====================================================

    renderProducts();

});