import { capitalize } from './format-camel-case';
export const getSDKandVersion = (tasks) => {
    let sdk = '';
    let version = '';
    if (!(tasks === null || tasks === void 0 ? void 0 : tasks.length))
        return { sdk, version };
    tasks.forEach((event) => {
        var _a;
        const sdkMetadata = (_a = event === null || event === void 0 ? void 0 : event.attributes) === null || _a === void 0 ? void 0 : _a.sdkMetadata;
        if (sdkMetadata) {
            const sdkName = sdkMetadata === null || sdkMetadata === void 0 ? void 0 : sdkMetadata.sdkName;
            const sdkVersion = sdkMetadata === null || sdkMetadata === void 0 ? void 0 : sdkMetadata.sdkVersion;
            if (sdkName) {
                sdk = capitalize(sdkName.split('-')[1]);
                if (sdk === 'Dotnet') {
                    sdk = '.NET';
                }
            }
            if (sdkVersion) {
                version = sdkVersion;
            }
        }
    });
    return { sdk, version };
};
