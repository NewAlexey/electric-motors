import checker from 'vite-plugin-checker';

export default ({
    base: 'electric-motors',
    plugins: [
        checker({
            typescript: true,
        }),
    ],
})