const Shared = {
    args: {}, // program arguments
    path: {
        spicetifyPath: "", // spicetify cli path
        spicetifyUserDataPath: "", // spicetify userdata path
        xpuiPath: "", // xpui folder
        cssMap: "", // css-map.json
    },
    spicetifyConfig: {}, // config-xpui.ini
    xpui: {
        contents: "", // all contents inside xpui folder
        jsContents: "", // all .js contents inside xpui folder
        cssContents: "", // all .css contents inside xpui folder
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
}

export default Shared
