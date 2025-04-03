export const palette = {
    blue: {
        50: '#EFF5FF',
        100: '#DBE8FE',
        200: '#BFD7FE',
        300: '#93BBFD',
        400: '#609AFA',
        500: '#3B82F6',
        600: '#2570EB',
        700: '#1D64D8',
        800: '#1E55AF',
        900: '#1E478A',
        950: '#0F172A',
        DEFAULT: '#3B82F6',
    },
    cyan: {
        50: '#ECFCFF',
        100: '#CFF7FE',
        200: '#A5EFFC',
        300: '#67E4F9',
        400: '#22D0EE',
        500: '#06B6D4',
        600: '#0899B2',
        700: '#0E7D90',
        800: '#156775',
        900: '#165863',
        950: '#083B44',
        DEFAULT: '#06B6D4',
    },
    green: {
        50: '#EDFFF6',
        200: '#AEFFD8',
        100: '#D5FFEB',
        300: '#70FFBC',
        400: '#2BFD98',
        500: '#00F37E',
        600: '#00C05F',
        700: '#00964E',
        800: '#067541',
        900: '#076037',
        950: '#00371D',
        DEFAULT: '#00F37E',
    },
    indigo: {
        50: '#EEF4FF',
        100: '#E0EAFF',
        200: '#C6D8FF',
        300: '#A4BCFD',
        400: '#8098F9',
        500: '#6173F3',
        600: '#444CE7',
        700: '#363BCC',
        800: '#2F34A4',
        900: '#2D3382',
        950: '#1A1C4C',
        DEFAULT: '#6173F3',
    },
    orange: {
        50: '#FFF4ED',
        100: '#FFE6D5',
        200: '#FECCAA',
        300: '#FDAC74',
        400: '#FB8A3C',
        500: '#F97316',
        600: '#EA670C',
        700: '#C2570C',
        800: '#9A4A12',
        900: '#7C3D12',
        950: '#432007',
        DEFAULT: '#F97316',
    },
    pink: {
        50: '#FFF2FF',
        100: '#FEE4FF',
        200: '#FEC7FF',
        300: '#FF9CFD',
        400: '#FF61FA',
        500: '#FF26FF',
        600: '#EA05F4',
        700: '#D300D8',
        800: '#A403A5',
        900: '#860985',
        950: '#5C005B',
        DEFAULT: '#FF26FF',
    },
    purple: {
        50: '#F7F3FF',
        100: '#EFE9FE',
        200: '#E2D6FE',
        300: '#CBB5FD',
        400: '#AD8BFA',
        500: '#8B5CF6',
        600: '#713AED',
        700: '#5E28D9',
        800: '#4E21B6',
        900: '#421D95',
        950: '#2A1065',
        DEFAULT: '#8B5CF6',
    },
    red: {
        50: '#FFF3ED',
        100: '#FFE4D4',
        200: '#FFC4A8',
        300: '#FF9B70',
        400: '#FF6637',
        500: '#FF4518',
        600: '#F02406',
        700: '#C71607',
        800: '#9E130E',
        900: '#7F140F',
        950: '#450505',
        DEFAULT: '#FF4518',
    },
    slate: {
        50: '#E8EFFF',
        100: '#C9D9F0',
        200: '#AEBED9',
        300: '#92A4C3',
        400: '#7C8FB1',
        500: '#667CA1',
        600: '#576E8F',
        700: '#465A78',
        800: '#273860',
        900: '#1E293B',
        950: '#0F172A',
        DEFAULT: '#667CA1',
    },
    yellow: {
        50: '#FFFBEB',
        100: '#FFF4C6',
        200: '#FEE989',
        300: '#FED64B',
        400: '#FEC321',
        500: '#F8A208',
        600: '#DC7A03',
        700: '#B65507',
        800: '#94420C',
        900: '#79360E',
        950: '#461B02',
        DEFAULT: '#F8A208',
    },
};
export const colors = {
    white: '#FFFFFF',
    'off-white': '#F8FAFC',
    black: '#000000',
    'space-black': '#141414',
    'off-black': palette['slate'][950],
    'code-black': '#292D3E',
    current: 'currentColor',
    transparent: 'transparent',
    mint: '#59FDA0',
    ...palette,
};
