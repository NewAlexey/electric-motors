import checker from 'vite-plugin-checker';

export default ({
    base: '/',
    plugins: [
        checker({
            typescript: true,
        }),
    ],
})