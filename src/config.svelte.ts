class SaveableConfig {
    configVersion: number;
    tabTitle: string;
    theme: string;
}

export class Config {
    // config version (incrementing forces a config rewrite)
    public configVersion: number = $state(3);
    public tabTitle: string = $state("");
    public theme: string = $state("");
}

export function saveConfig(cfg: Config): void {
    localStorage.setItem("config", JSON.stringify({
        configVersion: cfg.configVersion,
        tabTitle: cfg.tabTitle,
        theme: cfg.theme,
    }));
}

function loadConfig(): Config {
    const ret = new Config();
    let str = localStorage.getItem("config");
    if (str == null) {
        return ret;
    }
    try {
        let tmp = JSON.parse(str) as SaveableConfig;
        // overwrite old configs if version changed significantly
        if (
            tmp.configVersion == undefined ||
            tmp.configVersion < ret.configVersion
        ) {
            return ret;
        }
        if (tmp.tabTitle !== undefined) ret.tabTitle = tmp.tabTitle;
        if (tmp.theme !== undefined) ret.theme = tmp.theme;
    } catch (e) {
        console.error("Failed to load config", e);
    }
    return ret;
}

const config = $state(loadConfig());
export default config;