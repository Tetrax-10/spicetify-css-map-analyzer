const Shared = {
    args: {}, // program arguments
    path: {
        spicetifyPath: "", // spicetify path
        spicetifyUserDataPath: "", // spicetify path userdata
        xpuiPath: "", // xpui folder
        cssMap: "", // css-map.json
    },
    spicetifyConfig: {}, // config-xpui.ini
    xpui: {
        contents: "", // all contents inside xpui folder
        jsContents: "", // all .js contents inside xpui folder
        cssContents: "", // all .css contents inside xpui folder
    },
    theme: {
        css: "",
        hashClasses: [],
        filteredCssMap: {},
    },
    originalCssMap: {
        data: {}, // css-map.json as object
    },
    latestCssMap: {
        data: {}, // latest css-map.json { hash: class, ... }
        reversedData: {}, // latest css-map.json but reversed { class: hash, ... }
        classes: {
            all: [], // all latest [ class-1, class-2, ... ]
            mapped: [], // latest mapped [ class-1, class-2, ... ]
            unmapped: [], // latest unmapped [ class-1, class-2, ... ]
            deprecated: [], // mappable classes that are deprecated (removed from Spotify) deprecated-css-map.json
            reimplemented: [], // if Spotify reverts that deprecated class
            maybeDeprecated: [], // mappable classes that may be deprecated (removed from Spotify) may-be-deprecated-css-map.json
            notDeprecated: [], // if Spotify reverts that deprecated class
        },
    },
    regex: {
        extractHashClass: /(?<=\.)(?![^{]*\})[a-zA-Z0-9_]{20}(?<!-)\b/g, // detects hash classes eg: RbsCNNM9a0WkFCM2UzBA
    },
}

export default Shared
