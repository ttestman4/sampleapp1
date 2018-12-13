export interface RootStoreConfig {
    debugStore: boolean;
}

export class StoreConfig {
    static config: RootStoreConfig = {
        debugStore: false,
    };
}
