document.addEventListener("DOMContentLoaded", () => {

    const machines =
        window.SHEET_METAL_PRODUCTS || [];


    const slug =
        window.location.pathname
            .split("/")
            .filter(Boolean)
            .pop();


    const machine =
        machines.find(
            (item) => item.slug === slug
        );


    if (!machine) {

        document.querySelector("main").innerHTML = `
            <section
                class="mx-auto max-w-4xl
                       px-6 py-32 text-center"
            >

                <h1
                    class="text-4xl font-bold
                           text-evroskop-dark"
                >
                    Machine not found.
                </h1>

                <p
                    class="mt-4 text-gray-600"
                >
                    The requested machine could not be found.
                </p>

                <a
                    href="/sheet-metal"
                    class="mt-8 inline-flex rounded-lg
                           bg-evroskop-dark px-6 py-3
                           font-semibold text-white"
                >
                    Back to Sheet Metal
                </a>

            </section>
        `;

        return;
    }


    document.title =
        `${machine.model} | DURMA | Evroskop Group`;


    // =====================================================
    // MAIN INFORMATION
    // =====================================================

    document.getElementById(
        "breadcrumb-model"
    ).textContent = machine.model;


    document.getElementById(
        "machine-category"
    ).textContent = machine.categoryLabel;


    document.getElementById(
        "machine-model"
    ).textContent = machine.model;


    document.getElementById(
        "machine-short-description"
    ).textContent = machine.shortDescription;


    const description =
        machine.description ||
        `${machine.model} is part of the DURMA ${machine.categoryLabel} range. Detailed machine configuration and technical information will be added as the catalogue is completed.`;

    document.getElementById(
        "machine-description"
    ).textContent = description;


    document.getElementById(
        "machine-overview"
    ).textContent = description;


    // =====================================================
    // QUOTE LINKS
    // =====================================================

    const subject =
        encodeURIComponent(
            `DURMA ${machine.model} Inquiry`
        );


    document.getElementById(
        "machine-quote"
    ).href =
        `mailto:evroskop@evroskop.com?subject=${subject}`;


    document.getElementById(
        "machine-contact"
    ).href =
        `mailto:evroskop@evroskop.com?subject=${subject}`;


    // =====================================================
    // DATASHEET
    // =====================================================

    const datasheet =
        document.getElementById(
            "machine-datasheet"
        );


    if (machine.datasheet) {

        datasheet.href =
            machine.datasheet;

        datasheet.classList.remove(
            "hidden"
        );

        datasheet.classList.add(
            "inline-flex"
        );
    }


    // =====================================================
    // IMAGE GALLERY
    // =====================================================

    const images =
        machine.images || [];


    const mainImage =
        document.getElementById(
            "machine-main-image"
        );


    const thumbnails =
        document.getElementById(
            "machine-thumbnails"
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

        if (!images.length) {
            return;
        }


        currentImage =
            (index + images.length) %
            images.length;


        mainImage.src =
            images[currentImage];


        mainImage.alt =
            `${machine.model} image ${currentImage + 1}`;


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


            button.innerHTML = `
                <img
                    src="${image}"
                    alt="${machine.model} thumbnail ${index + 1}"
                    class="h-full w-full object-contain p-1"
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


    if (images.length <= 1) {

        previous?.classList.add(
            "hidden"
        );

        next?.classList.add(
            "hidden"
        );
    }


    // =====================================================
    // KEY SPECS
    // =====================================================

    const keySpecs =
        document.getElementById(
            "machine-key-specs"
        );


    Object.entries(
        machine.keySpecs || {}
    )
        .slice(0, 3)
        .forEach(
            ([label, value]) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "px-3";


                item.innerHTML = `

                    <p
                        class="text-lg font-bold
                               text-evroskop-dark"
                    >
                        ${
                            value ??
                            "—"
                        }
                    </p>

                    <p
                        class="mt-1 text-[10px]
                               uppercase tracking-wide
                               text-gray-500"
                    >
                        ${label}
                    </p>
                `;


                keySpecs.appendChild(
                    item
                );
            }
        );


    // =====================================================
    // SPECIFICATIONS TABLE
    // =====================================================

    const specifications =
        document.getElementById(
            "machine-specifications"
        );


    Object.entries(
        machine.specifications || {}
    ).forEach(
        ([label, value]) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className = `
                grid grid-cols-[0.9fr_1.1fr]
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
                        "To be added"
                    }
                </div>
            `;


            specifications.appendChild(
                row
            );
        }
    );


    // =====================================================
    // APPLICATIONS
    // =====================================================

    const applications =
        document.getElementById(
            "machine-applications"
        );


    (machine.applications || [])
        .forEach(
            (application) => {

                const item =
                    document.createElement(
                        "span"
                    );


                item.className = `
                    rounded-full
                    border border-gray-200
                    bg-gray-50
                    px-4 py-2
                    text-sm font-medium
                    text-gray-700
                `;


                item.textContent =
                    application;


                applications.appendChild(
                    item
                );
            }
        );

});