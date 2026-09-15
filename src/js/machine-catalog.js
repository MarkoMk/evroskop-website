document.addEventListener("DOMContentLoaded", () => {

    const machines =
        window.SHEET_METAL_PRODUCTS || [];

    const grid =
        document.getElementById("machine-grid");

    const filterButtons =
        document.querySelectorAll(
            "[data-machine-category]"
        );

    const searchInput =
        document.getElementById("machine-search");


    if (!grid) {
        return;
    }


    let activeCategory = "all";
    let searchTerm = "";


    function displayValue(value) {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return value;
    }


    function createMachineCard(machine) {

        const article =
            document.createElement("article");


        article.className = `
            group overflow-hidden rounded-2xl
            border border-gray-200
            bg-white shadow-sm
            transition duration-300
            hover:-translate-y-1
            hover:shadow-lg
        `;


        const images =
            machine.images || [];

        const firstImage =
            images[0] ||
            "/images/hero-durma-robot.png";


        const keySpecs =
            Object.entries(
                machine.keySpecs || {}
            ).slice(0, 3);


        article.innerHTML = `

            <div
                class="relative aspect-[4/3]
                       overflow-hidden bg-gray-50"
            >

                <img
                    src="${firstImage}"
                    alt="${machine.model}"
                    class="machine-preview-image
                           h-full w-full
                           object-contain p-6
                           transition duration-500
                           group-hover:scale-[1.03]"
                >


                ${
                    images.length > 1
                        ? `
                        <button
                            type="button"
                            class="machine-preview-prev
                                   absolute left-4 top-1/2
                                   z-10 -translate-y-1/2
                                   text-4xl font-bold
                                   text-evroskop-dark
                                   opacity-0
                                   drop-shadow-md
                                   transition-opacity
                                   duration-300
                                   group-hover:opacity-60
                                   hover:!opacity-100"
                            aria-label="Previous ${machine.model} image"
                        >
                            ‹
                        </button>


                        <button
                            type="button"
                            class="machine-preview-next
                                   absolute right-4 top-1/2
                                   z-10 -translate-y-1/2
                                   text-4xl font-bold
                                   text-evroskop-dark
                                   opacity-0
                                   drop-shadow-md
                                   transition-opacity
                                   duration-300
                                   group-hover:opacity-60
                                   hover:!opacity-100"
                            aria-label="Next ${machine.model} image"
                        >
                            ›
                        </button>
                        `
                        : ""
                }


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
                    DURMA
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

                    ${keySpecs.map(([label, value]) => `
                        <div class="px-2">

                            <p
                                class="font-bold
                                       text-evroskop-dark"
                            >
                                ${displayValue(value)}
                            </p>

                            <p
                                class="mt-1 text-[10px]
                                       uppercase tracking-wide
                                       text-gray-500"
                            >
                                ${label}
                            </p>

                        </div>
                    `).join("")}

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


        // =============================================
        // CARD GALLERY
        // =============================================

        const image =
            article.querySelector(
                ".machine-preview-image"
            );

        const previous =
            article.querySelector(
                ".machine-preview-prev"
            );

        const next =
            article.querySelector(
                ".machine-preview-next"
            );


        let currentImage = 0;


        function showImage(index) {

            if (!images.length) {
                return;
            }

            currentImage =
                (index + images.length) %
                images.length;

            image.src =
                images[currentImage];
        }


        previous?.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                showImage(
                    currentImage - 1
                );
            }
        );


        next?.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                showImage(
                    currentImage + 1
                );
            }
        );


        return article;
    }


    function renderMachines() {

        grid.innerHTML = "";


        const normalizedSearch =
            searchTerm.toLowerCase();


        const filtered =
            machines.filter((machine) => {

                const categoryMatches =
                    activeCategory === "all" ||
                    machine.category ===
                        activeCategory;


                const searchableText = `
                    ${machine.model}
                    ${machine.categoryLabel}
                    ${machine.shortDescription}
                    ${machine.brand}
                `.toLowerCase();


                const searchMatches =
                    searchableText.includes(
                        normalizedSearch
                    );


                return (
                    categoryMatches &&
                    searchMatches
                );
            });


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
                        Try another machine category
                        or search term.
                    </p>

                </div>
            `;

            return;
        }


        filtered.forEach(
            (machine) => {

                grid.appendChild(
                    createMachineCard(machine)
                );
            }
        );
    }


    function updateFilterStyles(
        selectedButton
    ) {

        filterButtons.forEach(
            (button) => {

                const active =
                    button ===
                    selectedButton;


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
            }
        );
    }


    filterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    activeCategory =
                        button.dataset.machineCategory;

                    updateFilterStyles(
                        button
                    );

                    renderMachines();
                }
            );
        }
    );


    searchInput?.addEventListener(
        "input",
        () => {

            searchTerm =
                searchInput.value.trim();

            renderMachines();
        }
    );


    renderMachines();

});