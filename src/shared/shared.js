const Shared = {
    args: {}, // program arguments
    path: {
        spicetifyPath: "",
        spicetifyUserDataPath: "",
        xpuiPath: "",
        cssMap: "",
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
        data: {}, // latest { hash: class, ... }
        reversedData: {}, // latest { class: hash, ... }
        classes: {
            all: [], // all latest [ class-1, class-2, ... ]
            mapped: [], // latest mapped [ class-1, class-2, ... ]
            unmapped: [], // latest unmapped [ class-1, class-2, ... ]
        },
    },
    regex: {
        // detects hash classes eg: RbsCNNM9a0WkFCM2UzBA
        extractHashClass: /(?<=\.)(?![^\{]*\})[a-zA-Z0-9_]{20}(?<!-)\b/g,
        // detects mapped classes eg: main-addButton-button
        extractMappedClass:
            /(?<=\.)\b(album|artist|collection|concert|desktopmodals|desktoproutes|folder|lyrics|main|playback|playlist|profile|progress|queue|search|show|view|x)\b([a-zA-Z0-9_-]+)(?![^\{]*\})/g,
        // detects class name
        extractClass: /(?<=\.)([a-zA-Z0-9_-]+)(?![^\{]*\})/g,
    },
    remap: {
        version: {
            old: "",
            new: "",
        },
    },
}

export default Shared
