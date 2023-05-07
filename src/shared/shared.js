const Shared = {
    args: {}, // program arguments
    xpui: {
        contents: "", // all contents inside xpui folder
        jsContents: "", // all .js contents inside xpui folder
        cssContents: "", // all .css contents inside xpui folder
    },
    originalCssMap: {
        data: {}, // css-map.json as object
    },
    latestCssMap: {
        data: {}, // latest { hash: class, ... }
        reversedData: {}, // latest { class: hash, ... }
        classes: {
            all: [], // all latest [ class-1, class-2, ... ]
            mapped: [], // latest mapped [ class-1, class-2, ... ]
            unmapped: [], // latest unmapped [ class-1, class-2, ... ]
        },
    },
}

export default Shared
