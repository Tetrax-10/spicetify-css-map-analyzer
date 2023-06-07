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
        hashClasses: {
            all: [], // all hash classes present in user.css
            outDated: [], // hash classes that got removed or updated to another hash
            stillAvailable: [], // hash classes that is still present in current xpui files
        },
        classes: {
            deprecated: [], // mappable classes that are deprecated and present in user.css (removed from Spotify) deprecated-css-map.json
            maybeDeprecated: [], // mappable classes that may be deprecated and present in user.css (removed from Spotify) may-be-deprecated-css-map.json
        },
        filteredCssMap: {}, // mappable hash classes { hash: class, ... }
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
            maybeDeprecated: [], // mappable classes that may be deprecated (removed from Spotify) may-be-deprecated-css-map.json
            notDeprecated: {
                all: [],
                reimplemented: [], // if Spotify reverts that deprecated class
                reimplementedMayBeDeprecated: [], // if Spotify reverts that class which is probably considered as deprecated
            },
        },
    },
    regex: {
        extractHashClass: /(?<=\.)(?![^{]*\})[a-zA-Z0-9_]{20}(?<!-)\b/g, // detects hash classes eg: RbsCNNM9a0WkFCM2UzBA
    },
}

export default Shared
